import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Header.css"; 

interface HeaderProps {
    isLoggedIn: boolean; // Kollar med boolean om vi är inloggade eller inte
    onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isAdminRoute = location.pathname.startsWith("/admin");
    const showBackButton = location.pathname !== "/" && !isAdminRoute; // don’t show on LandingPage or Admin

    return (
        <header className="header"> 
            <nav className="header-nav">
    {/* Back button (absolute left) */}
    {showBackButton && (
      <button
        className="btn-back"
        onClick={() => {
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            navigate("/");
          }
        }}
      >
        ← Tillbaka
      </button>
    )}

    {/* Logo (absolute center) */}
    <div className="header-logo">
      <Link to="/">
        <img
          src="/img/innovialogo.png"
          alt="Innovia Hub logo"
          className="logo-img"
        />
      </Link>
    </div>

    {/* Right-side buttons (existing flex stays the same) */}
    <div className="header-buttons">
      {!isLoggedIn ? (
        <>
          <Link to="/login" state={{ mode: "login" }} className="btn-login">Logga in</Link>
          <Link to="/login" state={{ mode: "register" }} className="btn-register">Registrera</Link>
        </>
      ) : (
        <>
          <Link to="/profile" className="btn-profile">Min profil</Link>
          <button className="btn-logout" onClick={onLogout}>Logga ut</button>
        </>
      )}
    </div>
  </nav>
        </header>
    );
};

export default Header;