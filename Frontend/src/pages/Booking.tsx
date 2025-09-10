import { useParams } from "react-router-dom";
import ResourceImgAndDate from "../components/ResourceImgAndDate";
import resourceData from "../data/resourceData";
import "../styles/Booking.css";
import { useEffect } from "react";

const Booking = () => {
  const { resourceId, date, slot } = useParams();
  const resource = resourceData.find((r) => r.id === Number(resourceId));
  const userName=localStorage.getItem("userName")
  const completeReservation=()=>{
    try {
      //const reservation=
    } catch (error) {
      
    }

  }
  useEffect(()=>{
    document.body.classList.add("resourceBg");
    return()=>{
      document.body.classList.remove("resourceBg")
    }
  },[])
  if (!resource) return <p>Resurs hittades inte</p>;

  return (
    <>
      <h2 className="resourceName">Boka {resource.name}</h2>
      <div className="recourceImgAndDate">
        <ResourceImgAndDate
          imgUrl={resource.imageUrl}
          imgAlt={resource.name}
          selectedDate={date!}
        />
        <div className="bookingDescription">
          <p>{resource.description}</p>
          <div className="bookingInfo">
            <p>Datum: {date}</p>
            <p>Tid: {slot}</p>
            <p>Namn:{userName} </p>
          </div>
          <button className=" formBtn reserveBtn" onClick={completeReservation}>Reservera</button>
        </div>
      </div>
    </>
  );
};
export default Booking;
