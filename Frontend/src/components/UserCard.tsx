import React, { useState } from "react";
import type { User, Booking } from "../components/types";
import { getUserBookings, deleteUserById, deleteBooking } from "../api/api";

interface UserCardProps {
  user: User;
  onDelete: (id: string, token: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  const [userBookings, setUserBookings] = useState<Booking[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showBookings, setShowBookings] = useState(false);

  const handleFetchBookings = async () => {
    // Toggle off if already shown
    if (showBookings) {
      setShowBookings(false);
      return;
    }

    // If bookings already fetched, just show them
    if (userBookings) {
      setShowBookings(true);
      return;
    }

    // Otherwise fetch bookings
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("token")!;
      const bookings = await getUserBookings(user.id, token);
      setUserBookings(bookings);
      setShowBookings(true);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const handelDeleteUser = () => {
    try {
      const token = localStorage.getItem("token")!;
      deleteUserById(user.id, token).then(() => onDelete(user.id, token));
      alert("User deleted successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to delete user");
    }
  };

  const handelDeleteBooking = (id: number, booking: Booking) => {
    try {
      () => {
        const token = localStorage.getItem("token")!;
        deleteBooking(booking.bookingId, token);
        alert(`Booking ${booking.resourceName} deleted Successfully!`);
        setUserBookings(userBookings!.filter((b) => b.bookingId != id));
      };
    } catch (error) {}
  };

  return (
    <>
      <div
        onClick={handleFetchBookings}
        className={`user-card ${showBookings ? "activeShowBookings" : ""}`}>
        <img src="/img/profile.png" />
        <p>{user.name}</p>
        <button
          onClick={() => {
            handelDeleteUser();
          }}
          className="delete-btn">
          Ta bort
        </button>
      </div>
      {showBookings && (
        <div className="userBookings">
          <div>
            <h3>Bookings:</h3>
            <p>{user.email}</p>
          </div>
          {loading ? (
            <p>Loading bookings...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : userBookings && userBookings.length > 0 ? (
            <ul>
              {userBookings.map((booking) => (
                <li key={booking.bookingId}>
                  {booking.resourceName} — {booking.date}
                  <button
                    className="deleteBookingBtn"
                    onClick={() => {
                      handelDeleteBooking(booking.bookingId, booking);
                    }}>
                    🗑
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="noBookings">No bookings</p>
          )}
        </div>
      )}
    </>
  );
};

export default UserCard;
