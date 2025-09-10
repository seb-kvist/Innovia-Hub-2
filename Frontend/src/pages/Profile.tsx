import React, { useState, useEffect } from "react";
import { getUserBookings, updateUserById, deleteBooking } from "../api/api";
import "../styles/Profile.css";

interface Booking {
  id: string;
  resourceName: string;
  date: string;
  timeSlot: string;
}

const Profile = () => {
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const storedName = localStorage.getItem("userName") || "Gäst";
    const storedEmail = localStorage.getItem("email") || "";
    if (storedName) {
      setUserName(storedName);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }

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

  const handleCancelBooking = async (bookingId: string) => {
    try {
      console.log("Avbokar bokning med ID:", bookingId);
      const token = localStorage.getItem("token");
  
      if (!token) {
        alert("Du är inte inloggad.");
        return;
      }
  
      await deleteBooking(bookingId, token);
      alert("Bokningen har avbokats!");
  
      // Uppdatera bokningslistan efter avbokning
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
    } catch (error) {
      console.error("Fel vid avbokning:", error);
      alert("Kunde inte avboka bokningen. Försök igen senare.");
    }
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
  
      if (!token || !userId) {
        alert("Du är inte inloggad.");
        return;
      }
  
      await updateUserById(userId, token, userName, email);
      alert("Profilen har uppdaterats!");
      localStorage.setItem("userName", userName);
      localStorage.setItem("email", email);
    } catch (error) {
      console.error("Fel vid uppdatering av profil:", error);
      alert("Kunde inte uppdatera profil. Försök igen senare.");
    }
  };

  return (
    <div className="profileContainer">
      <h2>Välkommen {userName || "Gäst"}!</h2>
      <div className="profileSections">
        {/* Bokningar */}
        <div className="bookingsSection">
          <h3>Dina bokningar</h3>
          {error && <p className="error">{error}</p>}
          {bookings.length > 0 ? (
            <ul>
              {bookings.map((booking, index) => (
                <li key={booking.id || `${booking.date}-${booking.timeSlot}-${index}`}>
                  <p>
                    <strong>{booking.resourceName}</strong>
                  </p>
                  <p>{booking.timeSlot}:00</p>
                  <p>{booking.date}</p>
                  <button className="cancelButton"
                  onClick={() => handleCancelBooking(booking.id)}
                  >AVBOKA</button>
                </li>
              ))}
            </ul>
          ) : (
            !error && <p>Du har inga bokningar ännu.</p>
          )}
        </div>

        {/* Redigera profil */}
        <div className="editProfileSection">
          <h3>Redigera din profil</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Namn:
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button className="updateButton" onClick={handleUpdateProfile}>
              LÄGG TILL
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;