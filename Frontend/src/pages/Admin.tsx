import React, { useState, useEffect } from "react";
import "../styles/Admin.css";
import BookingsTab from "../components/BookingsTab";
import UsersTab from "../components/UsersTab";
import ResourcesTab from "../components/ResourcesTab";

interface AdminProps {
  token: string;
}

const Admin: React.FC<AdminProps> = ({ token }) => {
  const [activeTab, setActiveTab] = useState("bookings");

  useEffect(() => {
    const page = localStorage.getItem("activePage");
    if (page) {
      setActiveTab(page);
    }
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
            <h1>Adminpanel</h1>
          </div>
        </header>
      </div>

      <nav className="tabs">
        <button
          className={`tab ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("bookings");
            localStorage.setItem("activePage", "bookings");
          }}>
          BOKNINGAR
        </button>
        <button
          className={`tab ${activeTab === "users" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("users");
            localStorage.setItem("activePage", "users");
          }}>
          ANVÄNDARE
        </button>
        <button
          className={`tab ${activeTab === "resources" ? "active" : ""}`}
          onClick={() => {
            setActiveTab("resources");
            localStorage.setItem("activePage", "resources");
          }}>
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
