import { useState } from "react";
import { loginUser } from "../api/api";
import "../styles/LoginAndRegisterForms.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();

    if (!email || !password) {
      setErrorMessage("Fyll i både email och lösenord");
      return;
    }
    try {
      const { token, role } = await loginUser(email, password);

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      setErrorMessage("");
      if (role.toLowerCase() === "admin") {
        navigate("/admin");
      } else {
        navigate("/"); // 
      }
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErrorMessage("Felaktigt användarnamn eller lösenord");
      } else {
        setErrorMessage("Något gick fel, försök igen senare");
      }
    }
  };
  return (
    <div className="formBox">
      <h2 className="formHeading">Logga in</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder={"Email"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          placeholder={"Lösenord"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        {errorMessage && <p className="errorMessage">{errorMessage}</p>}
        <p>Har du glömt ditt lösenord?</p>
        <button type="submit" className="formBtn">
          Logga in
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
