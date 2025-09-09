import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css"; 

interface HeaderProps {
    isLoggedIn: boolean; // Kollar med boolean om vi är inloggade eller inte
    onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogout}) => {
    return (
        <header className="header">
            <div className="header-logo">Innovia Hub</div>

            <nav className="header-nav">
                {!isLoggedIn ? (

                    //EJ INLOGGAD ANVÄNDARE
                    <>
                        <Link to="/login" className="btn-login">Logga in</Link>
                        <Link to="/register" className="btn-register">Registrera</Link>
                    </>
                ) : (

                    //INLOGGAD ANVÄNDARE
                    <>
                        <Link to="/profile" className="btn-profile">Min profil</Link>
                        <button className="btn-logout" onClick={onLogout}>Logga ut</button>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;