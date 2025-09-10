import React from "react";
import "../styles/Hero.css";
import { Link } from "react-router-dom";

interface HeroProps {
    isLoggedIn: boolean;
}

const Hero: React.FC<HeroProps> = ({ isLoggedIn }) => {
    return (
        <section className="hero">
            <h2>Välkommen till</h2>
            <h1>Innovia Hub</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non sapien
                mollis, interdum justo a, iaculis magna.
            </p>

            {!isLoggedIn && (
                // Om användaren inte är inloggad → visa call to action knapp
                <Link to="/login" className="btn-cta">BLI MEDLEM IDAG!</Link>
            )}
        </section>
    );
};

export default Hero;