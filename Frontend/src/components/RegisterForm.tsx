import { useState } from "react";
import { registerUser } from "../api/api";

const RegisterForm=()=>{
    const [userName,setUsername]=useState("");
    const [email, setEmail]=useState("");
    const [password,setPassword]=useState("");
    const handleSubmit=async (event:React.FormEvent)=>{
        event?.preventDefault();
        if(userName && email && password){
            await registerUser(email, password, userName);
        }else{
            console.log("gick inte")
        }

    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Användarnamn</label>
                <input
                type="username"
                placeholder={userName}
                onChange={(e)=>setUsername(e.target.value)}
                value={userName}
                />
                <label>Email</label>
                <input
                  type="email"
                  placeholder={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  value={email}
                  />
                <label>Lösenord</label>
                <input
                  type="password"
                  placeholder={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  value={password}
                  />
                <button type="submit">Registrera dig</button>
            </form>
        </div>
    )
}
export default RegisterForm;