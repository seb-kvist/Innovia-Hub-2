import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Admin from "./pages/Admin";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Resource from "./pages/Resource";
import Layout from "./pages/Layout"; // "ram" med Header + Footer
import Login from "./pages/Login";

function App() {
  return (
      <Routes>
        <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/resource/:resourceId" element={<Resource />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
  );
}

export default App;
