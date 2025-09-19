import { useCallback, useEffect, useState } from "react";
import type { FreeSlotsProps } from "../Interfaces/Props";
import { getFreeSlots } from "../api/api";
import { useNavigate } from "react-router-dom";
import { connection } from "../signalRConnection";

const FreeSlots = ({ resourceId, date }: FreeSlotsProps) => {
  const allSlots = ["08-10", "10-12", "12-14", "14-16", "16-18", "18-20"];
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isBookable, setIsBookable] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // 🔹 Normalize date to YYYY-MM-DD once
  const normalizedDate =
    date instanceof Date
      ? date.toISOString().split("T")[0]
      : new Date(date).toISOString().split("T")[0];

  const fetchSlots = useCallback(async () => {
    if (!token) return;
    try {
      const slots = await getFreeSlots(normalizedDate, resourceId, token);
      setAvailableSlots(slots);
    } catch (error) {
      console.error("Kunde inte hämta slots", error);
    }
  }, [normalizedDate, resourceId]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  // Lyssna på SignalR-uppdateringar och refetcha
  useEffect(() => {
    const handler = (update: { resourceId: number; isBookable: boolean }) => {
      setIsBookable(update.isBookable);
      console.log(update.isBookable);
    };
    connection.on("ReceiveResourceStatusUpdate", handler);
    return () => {
      connection.off("ReceiveResourceStatusUpdate", handler);
    };
  }, [isBookable]);

  useEffect(() => {
    const handler = (update: any) => {
      // Optimistisk uppdatering: om samma datum → ta bort sloten direkt
      try {
        const updateDate = typeof update?.date === "string" ? update.date : "";
        const updateSlot = update?.timeSlot as string | undefined;

        if (updateDate === normalizedDate && updateSlot) {
          setAvailableSlots((prev) => prev.filter((s) => s !== updateSlot));
        }
      } catch (err) {
        console.log(err);
      }
      fetchSlots();
    };

    connection.on("ReceiveBookingUpdate", handler);

    return () => {
      connection.off("ReceiveBookingUpdate", handler);
    };
  }, [fetchSlots, normalizedDate]);
  const isFutureSlot = (slot: string) => {
    const [startHour, endHour] = slot.split("-").map(Number);
    const now = new Date();
    const today = new Date().toISOString().split("T")[0];
    if (normalizedDate !== today) return true;

    // om datumet är idag jämför sluttiden
    return now.getHours() < endHour;
  };

  return (
    <div className="slotsHolder">
      {allSlots.map((slot) => {
        const isAvailable = availableSlots.includes(slot);
        const isFuture = isFutureSlot(slot);
        const canBook = isAvailable && isFuture && isBookable;
        return (
          <div
            key={slot}
            className={canBook ? "isAvailable" : "notAvailable"}
            onClick={() =>
              canBook &&
              navigate(`/booking/${resourceId}/${normalizedDate}/${slot}`)
            }>
            {slot}
          </div>
        );
      })}
    </div>
  );
};

export default FreeSlots;
