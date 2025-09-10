import { useState } from "react";
import { loginUser } from "../api/api";
import "../styles/LoginAndRegisterForms.css";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event?.preventDefault();
    if (email && password) {
      const user= await loginUser(email, password);
      localStorage.setItem("userId", user.id)
      localStorage.setItem("token", user.token)
    } else {
      console.log("gick inte");
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
        <p>Har du glömt ditt lösenord?</p>
        <button type="submit" className="formBtn">
          Logga in
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
