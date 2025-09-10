import React from "react";
import { Link } from "react-router-dom"; 
import "../styles/ResourceCards.css";

//Typ för en enskild resurs
interface ResourceCard {
    id: number;  // Ett unikt id för resursen. Används just nu som "key" i Reacts .map()
    name: string;
    img: string;
    path: string; // Routens URL dit användaren ska skickas om de klickar på "Reservera".
    description: string;
}

//Prop för resourcecards om man är inloggad eller ej
interface ResourceCardsProps {
    isLoggedIn: boolean;
}

const ResourceCards: React.FC<ResourceCardsProps> = ({ isLoggedIn }) => {
    const resourceCards: ResourceCard[] = [
        { id: 1, name: "Skrivbord", img: "/img/skrivbord.png", path: "/resource/1", description: "En modern arbetsstation med bekvämt skrivbord och stol."},
        { id: 2, name: "Mötesrum", img: "/img/motesrum.png", path: "/resource/2", description: "Ett fullt utrustat mötesrum med skärm och whiteboard." },
        { id: 3, name: "VR Headset", img: "/img/vrheadset.png", path: "/resource/3", description: "Testa framtidens teknik med vårt VR-headset." },
        { id: 4, name: "AI Server", img: "/img/aiserver.png", path: "/resource/4", description: "Kraftfull server för AI- och maskininlärningsprojekt." },
        ];

    return (
        <section className="resourcecards">
            {resourceCards.map((res) => (
                <div key={res.id} className="resource-card-section">
                <img src={res.img} alt={res.name} />

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