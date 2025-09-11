import { useEffect, useState } from "react";
import type { FreeSlotsProps } from "../Interfaces/Props";
import { getFreeSlots } from "../api/api";
import { useNavigate } from "react-router-dom";

const FreeSlots = ({ resourceId, date }: FreeSlotsProps) => {
  const allSlots = ["08-10", "10-12", "12-14", "14-16", "16-18", "18-20"];
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const navigate = useNavigate();

  // 🔹 Normalize date to YYYY-MM-DD once
  const normalizedDate =
    date instanceof Date
      ? date.toISOString().split("T")[0]
      : new Date(date).toISOString().split("T")[0];

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchSlots = async () => {
      try {
        const slots = await getFreeSlots(normalizedDate, resourceId, token);
        console.log("fetched slots ", slots);
        setAvailableSlots(slots);
      } catch (error) {
        console.error("Kunde inte hämta slots", error);
      }
    };

    fetchSlots();
  }, [resourceId, normalizedDate]);

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
            }>
            {slot}
          </div>
        );
      })}
    </div>
  );
};

export default FreeSlots;
