import React, { useState, useEffect } from "react";
import "../styles/Admin.css";
import BookingsTab from "../components/BookingsTab";
import UsersTab from "../components/UsersTab";
import ResourcesTab from "../components/ResourcesTab";


interface AdminProps {
  token: string;
}


const Admin: React.FC<AdminProps> = ({ token }) => {
  const [activeTab, setActiveTab] = useState<
    "bookings" | "users" | "resources"
  >("bookings");

  useEffect(() => {
    document.body.classList.add("adminBg");
    return () => {
      document.body.classList.remove("adminBg");
    };
  }, []);

  return (
    <div className="dashboard">
      <div className="adminHeaderHolder">
      <header className="header">
        <div>
          <h1>Välkommen</h1>
          <span className="user-label">Admin</span>
        </div>
      </header>
      </div>

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

      <div className="content">
        {activeTab === "bookings" && <BookingsTab token={token} />}
        {activeTab === "users" && <UsersTab token={token} />}
        {activeTab === "resources" && <ResourcesTab token={token} />}
      </div>
    </div>
  );
};

export default Admin;
