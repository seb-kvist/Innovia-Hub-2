import { useCallback, useEffect, useState } from "react";
import type { FreeSlotsProps } from "../Interfaces/Props";
import { getFreeSlots } from "../api/api";
import { useNavigate } from "react-router-dom";
import * as signalR from "@microsoft/signalr";


const FreeSlots = ({ resourceId, date }: FreeSlotsProps) => {
  const allSlots = ["08-10", "10-12", "12-14", "14-16", "16-18", "18-20"];
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
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
      if (!token) return;
  
      const connection = new signalR.HubConnectionBuilder()
        .withUrl("http://localhost:5022/bookingHub", {
          accessTokenFactory: () => token
        })
        .withAutomaticReconnect()
        .build();
  
      const handler = (update: any) => {
        // Optimistisk uppdatering: om samma datum → ta bort sloten direkt
        try {
          const updateDate = typeof update?.date === "string" ? update.date : "";
          const updateSlot = update?.timeSlot as string | undefined;

          if (updateDate === normalizedDate && updateSlot) {
            setAvailableSlots(prev => prev.filter(s => s !== updateSlot));
          }
        } catch {}
        // Säkerställ konsistens med ett refetch
          setTimeout(fetchSlots, 1000);
      };
  
      connection.on("ReceiveBookingUpdate", handler);
      connection.start().catch(err => console.error("SignalR error", err));
  
      return () => {
        connection.off("ReceiveBookingUpdate", handler);
        connection.stop();
      };
    }, [fetchSlots]);

  return (
    <div className="slotsHolder">
      {allSlots.map((slot) => {
        const isAvailable = availableSlots.includes(slot);
        return (
          <div
            key={slot}
            className={isAvailable ? "isAvailable" : "notAvailable"}
            onClick={() =>
              isAvailable &&
              navigate(`/booking/${resourceId}/${normalizedDate}/${slot}`)
            }
          >
            {slot}
          </div>
        );
      })}
    </div>
  );
};

export default FreeSlots;
