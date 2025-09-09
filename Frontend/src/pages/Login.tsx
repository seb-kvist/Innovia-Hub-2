import { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const Login = () => {
  const [showRegister, setShowRegister] = useState(false);

  return (
    <div className={`loginContainer ${showRegister ? "showRegister" : ""}`}>
      <div className="formHolder">
        {showRegister ? (
          <RegisterForm onSwitch={() => setShowRegister(false)} />
        ) : (
          <LoginForm onSwitch={() => setShowRegister(true)} />
        )}
      </div>

      <div
        className={`secondaryView ${showRegister ? "secondaryViewLogin" : ""}`}
      >
        {showRegister ? (
          <>
            <h2>Har du redan ett konto?</h2>
            <button onClick={() => setShowRegister(false)}>Logga in här</button>
          </>
        ) : (
          <>
            <h2>Besöker du oss första gången?</h2>
            <button onClick={() => setShowRegister(true)}>Skapa konto</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
