import React, { useEffect, useState, useRef } from "react";
import { deleteBooking, getFilteredBookings } from "../api/api";
import Calendar from "./Calendar";
import { connection } from "../signalRConnection";

interface Booking {
  bookingId: number;
  userName: string;
  resourceName: string;
  date: string;
  timeSlot: string;
  status: boolean;
}

interface Props {
  token: string;
}

const BookingsTab: React.FC<Props> = ({ token }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const selectedDateRef = useRef(selectedDate);
  selectedDateRef.current = selectedDate;

  //  fetch bookings for selected date
  const fetchFilteredBookings = async () => {
    try {
      setLoading(true);
      const res = await getFilteredBookings(token, selectedDateRef.current);
      setFilteredBookings(res);
    } catch {
      setError("Kunde inte ladda bokningar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilteredBookings();
  }, [selectedDate, token]);

  //  setup SignalR once
  useEffect(() => {
    const startConnection = async () => {
      try {
        if (connection.state === "Disconnected") {
          await connection.start();
          console.log("Connected to BookingHub");
        }
      } catch (err) {
        console.error("SignalR error:", err);
      }
    };

    startConnection();

    const updateHandler = () => {
      getFilteredBookings(token, selectedDateRef.current).then(
        setFilteredBookings
      );
    };

    connection.on("ReceiveBookingUpdate", updateHandler);

    return () => {
      connection.off("ReceiveBookingUpdate", updateHandler);
    };
  }, [token]);

  const handleDeleteBooking = async (id: number) => {
    if (!confirm("Är du säker på att du vill ta bort denna bokning?")) return;
    try {
      await deleteBooking(id, token);
      setFilteredBookings((prev) => prev.filter((b) => b.bookingId !== id));
    } catch {
      alert("Kunde inte ta bort bokningen. Försök igen senare.");
    }
  };

  if (loading) return <p>Laddar bokningar...</p>;
  if (error) return <p className="error">{error}</p>;
  if (filteredBookings.length === 0) return <p>Inga bokningar hittades</p>;

  return (
    <div className="bookings">
      <div className="calendar">
        <Calendar
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
          variant="popup"
        />
      </div>

      {filteredBookings.map((b) => (
        <div key={b.bookingId} className="booking-card">
          <div className="booking-info">
            <p>{b.timeSlot}</p>
            <p className="resource">{b.resourceName}</p>
            <p>{b.userName}</p>
          </div>
          <div className="booking-actions">
            <button
              className="delete-btn"
              onClick={() => handleDeleteBooking(b.bookingId)}>
              TA BORT
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookingsTab;
