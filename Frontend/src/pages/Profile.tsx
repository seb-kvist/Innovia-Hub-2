import React, { useState, useEffect } from "react";
import { getUserBookings } from "../api/api";

interface Booking {
  id: string;
  resourceName: string;
  date: string;
  timeSlot: string;
}

const Profile = () => {
  const [userName, setUserName] = useState<string>("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName") || "Gäst";
    if (storedName) {
      setUserName(storedName);
    }

    // Hämta bokningar för user
    const fetchBookings = async () => {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
    
      if (userId && token) {
        try {
          const userBookings = await getUserBookings(userId, token);
          setBookings(userBookings);
        } catch (err: any) {
          if (err.response && err.response.status === 404) {
            console.warn("Inga bokningar hittades för användaren.");
            setBookings([]); 
          } else {
            console.error("Fel vid hämtning av bokningar:", err);
            setError("Kunde inte hämta bokningar. Försök igen senare.");
          }
        }
      } else {
        setError("Användaren är inte inloggad.");
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Välkommen till din profil, {userName || "Gäst"}!</h2>
      <p>Vi är glada att ha dig här.</p>

      <h3>Dina bokningar:</h3>
      {error && <p className="error">{error}</p>}
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <p>
                <strong>Resurs:</strong> {booking.resourceName}
              </p>
              <p>
                <strong>Datum:</strong> {booking.date}
              </p>
              <p>
                <strong>Tidslucka:</strong> {booking.timeSlot}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>Du har inga bokningar ännu.</p>
      )}
    </div>
  );
};

export default Profile;