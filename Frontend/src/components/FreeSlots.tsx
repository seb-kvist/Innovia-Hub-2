import { useEffect, useState } from "react";
import type { FreeSlotsProps } from "../Interfaces/FreeSlotsProps";
import { getFreeSlots } from "../api/api";

const FreeSlots = ({ resourceId, date }: FreeSlotsProps) => {
  const allSlots = ["08-10", "10-12", "12-14", "14-16", "16-18", "18-20"];
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);


  const handleSelectSlot = (slot: string) => {
    console.log("Selected slot ", slot);
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) return;
    const fetchSlots=async()=>{
        try{
            const slots=await getFreeSlots(date, resourceId, token);
            console.log("fetched slots ", slots);
            
            setAvailableSlots(slots)
            console.log(availableSlots);
            
        }catch(error){
            console.error("Kunde inte hämta slots", error);
        }
    }
    fetchSlots()
  }, [resourceId, date,]);

  return (
    <div className="slotsHolder">
      {allSlots.map((slot) => {
        const isAvailable = availableSlots.includes(slot);
        return (
          <div
            key={slot}
            className={isAvailable ? "isAvailable" : "notAvailable"}
            onClick={() => isAvailable && handleSelectSlot(slot)}
          >
            {slot}
          </div>
        );
      })}
    </div>
  );
};
export default FreeSlots;
