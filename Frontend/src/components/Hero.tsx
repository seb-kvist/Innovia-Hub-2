import React from "react";
import "../styles/Hero.css";

interface HeroProps {
    isLoggedIn: boolean;
}

const Hero: React.FC<HeroProps> = ({ isLoggedIn }) => {
    return (
        <section className="hero">
            <img src="/img/innovialogo.png" alt="Innovia logo" className="hero-logo" style={{width: 106, height: 106, marginBottom: 12}} />
            <h2>Välkommen till</h2>
            <h1>Innovia Hub</h1>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam non sapien
                mollis, interdum justo a, iaculis magna.
            </p>

            {!isLoggedIn && (
                // Om användaren inte är inloggad → visa call to action knapp
                <button className="btn-cta">BLI MEDLEM IDAG!</button>
            )}
        </section>
    );
};

export default Hero;