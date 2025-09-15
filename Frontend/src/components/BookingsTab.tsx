import React, { useEffect, useState } from "react";
import { getAllBookings, deleteBooking } from "../api/api";
import Calendar from "./Calendar";
import { getFilteredBookings } from "../api/api";

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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFilteredBookings = async () => {
      try {
        setLoading(true);
        const res = await getFilteredBookings(token, selectedDate);
        const bookings = res;
        setFilteredBookings(bookings);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredBookings();
  }, [selectedDate, token]);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        const data = await getAllBookings(token);
        setBookings(data);
      } catch {
        setError("Kunde inte ladda bokningar");
      } finally {
        setLoading(false);
      }
    };
    loadBookings();
  }, [token]);

  const handleDeleteBooking = async (id: number) => {
    if (!confirm("Är du säker på att du vill ta bort denna bokning?")) return;
    try {
      await deleteBooking(id, token);
      setBookings((prev) => prev.filter((b) => b.bookingId !== id));
    } catch {
      alert("Kunde inte ta bort bokningen. Försök igen senare.");
    }
  };

  if (loading) return <p>Laddar bokningar...</p>;
  if (error) return <p className="error">{error}</p>;
  if (bookings.length === 0) return <p>Inga bokningar hittades</p>;

  return (
    <div className="bookings">
      <div className="calendar">
        {/* Popup version */}
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
