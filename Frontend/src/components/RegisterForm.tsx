import { useState } from "react";
import { registerUser } from "../api/api";
import "../styles/LoginAndRegisterForms.css";

const RegisterForm = () => {
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();
    if (userName && email && password) {
      await registerUser(email, password, userName);
    } else {
      console.log("gick inte");
    }
  };
  return (
    <div className="formBox">
      <h2 className="formHeading">Skapa konto</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          placeholder={"Användarnamn"}
          onChange={(e) => setUsername(e.target.value)}
          value={userName}
        />
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
        <button type="submit" className="formBtn">
          Registrera dig
        </button>
      </form>
    </div>
  );
};
export default RegisterForm;
