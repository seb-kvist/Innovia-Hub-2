import Hero from "../components/Hero";
import ResourceCards from "../components/RecourceCards";
import { useEffect, useState } from "react";

const LandingPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <>
      <Hero isLoggedIn={isLoggedIn} />
      <ResourceCards isLoggedIn={isLoggedIn} />
    </>
  );
};

export default LandingPage;