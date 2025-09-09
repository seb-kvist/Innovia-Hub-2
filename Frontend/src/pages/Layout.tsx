import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

/**
 * Layout-komponenten fungerar som en "ram" för hela applikationen.
 * - Header och Footer renderas alltid (oavsett vilken sida man är på).
 * - <Outlet /> är en plats där den aktuella route-sidan laddas in.
 */


const Layout: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
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
