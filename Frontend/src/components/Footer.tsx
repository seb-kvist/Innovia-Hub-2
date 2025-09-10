import React from "react";
import "../styles/Footer.css";

const Footer: React.FC = () => {
    return (
        <footer className="footer">
            <div className="footer-links">
                <div>
                    <h4>INNOVIA HUB</h4>
                    <ul>
                        <li>Om oss</li>
                        <li>Tjänster</li>
                        <li>Kontakt</li>
                        <li>FAQ</li>
                    </ul>
                    </div>

                    <div>
                    <h4>Resursers</h4>
                    <ul>
                        <li>Karriär</li>
                        <li>Partners</li>
                        <li>Integritet</li>
                        <li>Användarvillkor</li>
                    </ul>
                </div>    
            </div>

            <div className="footer-socials">
                <span>© Innovia Hub</span>
            </div>
        </footer>
    );
};


export default Footer;