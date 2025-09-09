import Hero from "../components/Hero";
import ResourceCards from "../components/RecourceCards";

const LandingPage: React.FC = () => {
  return (
    <>
      <Hero isLoggedIn={false} /> {/* tills auth är kopplat */}
      <ResourceCards isLoggedIn={false} />
    </>
  );
};

export default LandingPage;