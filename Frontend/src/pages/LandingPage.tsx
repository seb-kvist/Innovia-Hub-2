import Hero from "../components/Hero";
import ResourceCards from "../components/RecourceCards";
import { useEffect, useState } from "react";
import "../styles/LandingPage.css";

const LandingPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className="landing-page">
      <Hero isLoggedIn={isLoggedIn} />
      <ResourceCards isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default LandingPage;