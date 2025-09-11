import React, { useEffect, useState } from "react";
import "../styles/admin.css";
import {
  getAllBookings,
  deleteBooking,
  getAllUsers,
  changeResourceStatus,
  getAllResources,
} from "../api/api";

export interface Booking {
  id: number;
  userName: string;
  resourceName: string;
  date: string;
  timeSlot: string;
  status: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Resource {
  id: number;
  resourceName: string;
  resourceTypeId: string;
  isBookable: boolean;
  updating?: boolean;
}

interface AdminDashboardProps {
  token: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ token }) => {
  const [activeTab, setActiveTab] = useState<
    "bookings" | "users" | "resources"
  >("bookings");

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState("");

  const [users, setUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState("");

  const [resources, setResources] = useState<Resource[]>([]);
  const [resourcesLoading, setResourcesLoading] = useState(false);
  const [resourcesError, setResourcesError] = useState("");

  // Load bookings
  useEffect(() => {
    if (activeTab !== "bookings") return;

    const loadBookings = async () => {
      try {
        setBookingsLoading(true);
        const data = await getAllBookings(token);
        setBookings(data);
      } catch (err) {
        console.error(err);
        setBookingsError("Kunde inte ladda bokningar");
      } finally {
        setBookingsLoading(false);
      }
    };
    loadBookings();
  }, [activeTab, token]);

  // Load users
  useEffect(() => {
    if (activeTab !== "users") return;

    const loadUsers = async () => {
      try {
        setUsersLoading(true);
        const data = await getAllUsers(token);
        setUsers(data);
      } catch (err) {
        console.error(err);
        setUsersError("Kunde inte ladda användare");
      } finally {
        setUsersLoading(false);
      }
    };
    loadUsers();
  }, [activeTab, token]);

  // Load resources
  useEffect(() => {
    if (activeTab !== "resources") return;

    const loadResources = async () => {
      try {
        setResourcesLoading(true);
        const data = await getAllResources(token);
        setResources(data);
      } catch (err) {
        console.error(err);
        setResourcesError("Kunde inte ladda resurser");
      } finally {
        setResourcesLoading(false);
      }
    };
    loadResources();
  }, [activeTab, token]);

  // Delete booking
  const handleDeleteBooking = async (id: number) => {
    if (confirm("Är du säker på att du vill ta bort denna bokning?")) {
      try {
        await deleteBooking(id, token);
        setBookings((prev) => prev.filter((b) => b.id !== id));
        alert("Bokningen har tagits bort!");
      } catch (err) {
        console.error(err);
        alert("Kunde inte ta bort bokningen. Försök igen senare.");
      }
    }
  };

  // Toggle resource bookable status
  const toggleResourceStatus = async (resourceId: number) => {
    try {
      // Optionally show loading state for this resource
      setResources((prev) =>
        prev.map((r) => (r.id === resourceId ? { ...r, updating: true } : r))
      );

      await changeResourceStatus(resourceId, token);

      // Update local state after backend success
      setResources((prev) =>
        prev.map((r) =>
          r.id === resourceId
            ? { ...r, bookable: !r.isBookable, updating: false }
            : r
        )
      );
    } catch (err) {
      console.error(err);
      alert("Kunde inte ändra resursstatus");
      // Reset updating state on error
      setResources((prev) =>
        prev.map((r) => (r.id === resourceId ? { ...r, updating: false } : r))
      );
    }
  };

  return (
    <div className="dashboard">
      <header className="header">
        <h1>Admin Dashboard</h1>
        <span className="user-label">Admin användare</span>
      </header>

      <nav className="tabs">
        <button
          className={`tab ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveTab("bookings")}>
          BOKNINGAR
        </button>
        <button
          className={`tab ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}>
          ANVÄNDARE
        </button>
        <button
          className={`tab ${activeTab === "resources" ? "active" : ""}`}
          onClick={() => setActiveTab("resources")}>
          RESURSER
        </button>
      </nav>

      <main className="content">
        {/* Bookings */}
        {activeTab === "bookings" && (
          <div className="bookings">
            {bookingsLoading && <p>Laddar bokningar...</p>}
            {bookingsError && <p className="error">{bookingsError}</p>}
            {!bookingsLoading && bookings.length === 0 && (
              <p>Inga bokningar hittades</p>
            )}
            {!bookingsLoading &&
              bookings.map((b) => (
                <div key={b.id} className="booking-card">
                  <div className="booking-info">
                    <p className="resource">{b.resourceName}</p>
                    <p>{b.timeSlot}</p>
                    <p>{b.userName}</p>
                  </div>
                  <div className="booking-actions">
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteBooking(b.id)}>
                      TA BORT
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Users */}
        {activeTab === "users" && (
          <div className="users">
            {usersLoading && <p>Laddar användare...</p>}
            {usersError && <p className="error">{usersError}</p>}
            {!usersLoading && users.length === 0 && (
              <p>Inga användare hittades</p>
            )}
            {!usersLoading &&
              users.map((u) => (
                <div key={u.id} className="user-card">
                  <p>{u.name}</p>
                  <p>{u.email}</p>
                </div>
              ))}
          </div>
        )}

        {/* Resources */}
        {activeTab === "resources" && (
          <div className="resources">
            {resourcesLoading && <p>Laddar resurser...</p>}
            {resourcesError && <p className="error">{resourcesError}</p>}
            {!resourcesLoading && resources.length === 0 && (
              <p>Inga resurser hittades</p>
            )}
            {!resourcesLoading &&
              resources.map((r) => (
                <div key={r.id} className="resource-card">
                  <p>{r.resourceName}</p>

                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={r.isBookable}
                      disabled={r.updating}
                      onChange={async () => {
                        try {
                          setResources((prev) =>
                            prev.map((res) =>
                              res.id === r.id ? { ...res, updating: true } : res
                            )
                          );
                          toggleResourceStatus(r.id);

                          await changeResourceStatus(r.id, token); // call backend

                          // Toggle bookable locally after success
                          setResources((prev) =>
                            prev.map((res) =>
                              res.id === r.id
                                ? {
                                    ...res,
                                    isBookable: !res.isBookable,
                                    updating: false,
                                  }
                                : res
                            )
                          );
                        } catch (err) {
                          console.error(err);
                          alert("Kunde inte ändra resursstatus");
                          setResources((prev) =>
                            prev.map((res) =>
                              res.id === r.id
                                ? { ...res, updating: false }
                                : res
                            )
                          );
                        }
                      }}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
