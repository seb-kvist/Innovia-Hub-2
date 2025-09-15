import React, { useState } from "react";
import type { User, Booking } from "../components/types";
import { getUserBookings } from "../api/api";

interface UserCardProps {
  user: User;
  onDelete: (id: string) => void;
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

  return (
    <div className="user-card border rounded-2xl shadow-md p-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{user.name}</h2>
        <div className="flex gap-2">
          <button
            onClick={handleFetchBookings}
            className="text-blue-500 hover:text-blue-700">
            {showBookings ? "Hide Bookings" : "Show Bookings"}
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="text-red-500 hover:text-red-700">
            🗑 Delete
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-600">{user.email}</p>

      {showBookings && (
        <div className="mt-3">
          <h3 className="font-medium">Bookings:</h3>
          {loading ? (
            <p>Loading bookings...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : userBookings && userBookings.length > 0 ? (
            <ul className="list-disc list-inside text-sm text-gray-700">
              {userBookings.map((booking) => (
                <li key={booking.bookingId}>
                  {booking.resourceName} — {booking.date}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">No bookings</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserCard;
