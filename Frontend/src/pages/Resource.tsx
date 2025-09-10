import { useParams } from "react-router-dom";
import resourceData from "../data/resourceData";
import "../styles/Resource.css";
import Calendar from "../components/Calendar";
import { useState } from "react";
import FreeSlots from "../components/FreeSlots";
const Resource = () => {
  const [selectedDate, setSelectedDate]=useState<Date|null>(new Date())
  const {resourceId}= useParams<{resourceId:string}>();
  const id= resourceId? parseInt(resourceId,10):null

  //Hitta resursen i vår data baserat på id
 const resource = resourceData.find(r=>r.id===id)
  return (
    <div className="resourcePage">
      <h2>
        {resource?.name}
      </h2>
      <div className="recourceImgAndDate">
        <img src={resource?.imageUrl} alt={resource?.name}/>
        <div className="selectedDate">{selectedDate?.toLocaleDateString()}</div>
        <div className="calendar"><Calendar selectedDate={selectedDate} onDateChange={setSelectedDate}/></div>
      </div>
      <div>
        <h3>Välj en tid för att boka</h3>
        {id && selectedDate && (<FreeSlots resourceId={id} date={selectedDate?.toLocaleDateString()}/>)}

      </div>
    </div>
  );
};
export default Resource;
