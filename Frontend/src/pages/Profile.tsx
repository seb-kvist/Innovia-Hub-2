import React, { useState, useEffect } from "react";

interface Booking {
  id: string;
  userName: string;
  resourceName: string;
  date: string;
  timeSlot: string;
  status: "confirmed" | "pending" | "cancelled";
  userImage?: string;
}

const Admin = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "1",
      userName: "Anna Andersson",
      resourceName: "Konferensrum A",
      date: "2025-09-15",
      timeSlot: "10:00",
      status: "confirmed",
      userImage: "/api/placeholder/40/40",
    },
    {
      id: "2",
      userName: "Erik Svensson",
      resourceName: "Projektrum 2",
      date: "2025-09-15",
      timeSlot: "14:00",
      status: "pending",
      userImage: "/api/placeholder/40/40",
    },
    {
      id: "3",
      userName: "Maria Johansson",
      resourceName: "Studierum 1",
      date: "2025-09-16",
      timeSlot: "09:00",
      status: "confirmed",
      userImage: "/api/placeholder/40/40",
    },
    {
      id: "4",
      userName: "Lars Nilsson",
      resourceName: "Mötesrum B",
      date: "2025-09-16",
      timeSlot: "15:30",
      status: "confirmed",
      userImage: "/api/placeholder/40/40",
    },
  ]);

  const handleStatusChange = (
    bookingId: string,
    newStatus: "confirmed" | "pending" | "cancelled"
  ) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      )
    );
  };

  const handleDeleteBooking = (bookingId: string) => {
    if (confirm("Är du säker på att du vill ta bort denna bokning?")) {
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.id !== bookingId)
      );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-teal-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "BEKRÄFTAD";
      case "pending":
        return "VÄNTANDE";
      case "cancelled":
        return "AVBOKAD";
      default:
        return status.toUpperCase();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <h1 className="text-2xl font-light text-gray-900">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Admin användare</span>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span className="text-sm">Logga ut</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl p-8 mb-8 text-white overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-light mb-2">Välkommen</h2>
            <p className="text-teal-100">Hantera bokningar och resurser</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab("bookings")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
              activeTab === "bookings"
                ? "bg-teal-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}>
            BOKNINGAR
          </button>
          <button
            onClick={() => setActiveTab("resources")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
              activeTab === "resources"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}>
            RESURSER
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
              activeTab === "users"
                ? "bg-purple-500 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}>
            ANVÄNDARE
          </button>
        </div>

        {/* Content Area */}
        {activeTab === "bookings" && (
          <div className="bg-white rounded-xl shadow-sm">
            <div className="p-6 border-b">
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Bokningar
              </h3>
              <p className="text-sm text-gray-600">14/09/2025</p>
            </div>
            <div className="divide-y">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden">
                      <img
                        src={booking.userImage}
                        alt={booking.userName}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiNGM0Y0RjYiLz4KPHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4PSI4IiB5PSI4Ij4KPHBhdGggZD0iTTIwIDIxVjE5QTQgNCAwIDAgMCAxNiAxNUg4QTQgNCAwIDAgMCA0IDE5VjIxIiBzdHJva2U9IiM5Q0E3QUYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0IiBzdHJva2U9IiM5Q0E3QUYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cjwvc3ZnPgo=";
                        }}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {booking.resourceName}
                      </p>
                      <p className="text-sm text-gray-600">
                        {booking.timeSlot}
                      </p>
                      <p className="text-sm text-gray-600">
                        {booking.userName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        handleStatusChange(booking.id, e.target.value as any)
                      }
                      className={`px-3 py-1 rounded-full text-xs font-medium text-white border-none outline-none cursor-pointer ${getStatusColor(
                        booking.status
                      )}`}>
                      <option value="confirmed">BEKRÄFTAD</option>
                      <option value="pending">VÄNTANDE</option>
                      <option value="cancelled">AVBOKAD</option>
                    </select>
                    <button
                      onClick={() => handleDeleteBooking(booking.id)}
                      className="px-3 py-1 text-xs font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors">
                      TA BORT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "resources" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Hantera resurser
            </h3>
            <p className="text-gray-600">
              Här kan du lägga till, redigera och ta bort resurser som kan
              bokas.
            </p>
            <div className="mt-6">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                Lägg till ny resurs
              </button>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Hantera användare
            </h3>
            <p className="text-gray-600">
              Här kan du se och hantera alla registrerade användare.
            </p>
            <div className="mt-6">
              <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                Visa alla användare
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
