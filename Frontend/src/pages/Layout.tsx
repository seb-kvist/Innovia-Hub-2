import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

/**
 * Layout-komponenten fungerar som en "ram" för hela applikationen.
 * - Header och Footer renderas alltid (oavsett vilken sida man är på).
 * - <Outlet /> är en plats där den aktuella route-sidan laddas in.
 */


const Layout: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location]); // Re-check when route changes

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <main>
        <Outlet /> {/* Här visas den route du går till */}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
