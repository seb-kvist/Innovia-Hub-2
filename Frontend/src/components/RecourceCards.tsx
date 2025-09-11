import React from "react";
import { Link } from "react-router-dom"; 
import "../styles/ResourceCards.css";
import resourceData from "../data/resourceData";

//Prop för resourcecards om man är inloggad eller ej
interface ResourceCardsProps {
    isLoggedIn: boolean;
}

const ResourceCards: React.FC<ResourceCardsProps> = ({ isLoggedIn }) => {

    return (
        <section className="resourcecards">
            {resourceData.map((res) => (
                <div key={res.id} className="resource-card-section">
                <img src={res.imageUrl} alt={res.name} />

                <div className="overlay">
                    <h3>{res.name}</h3>
                    <p className="resource-desc">{res.description}</p>
                    {isLoggedIn ? (
                    <Link to={res.path} className="btn-reserve">
                        Reservera
                    </Link>
                    ) : (
                    <Link to="/login" className="btn-reserve">
                        Logga in för att reservera
                    </Link>
                    )}
                   </div>
                </div>  
            ))}
        </section>
    );
};

export default ResourceCards