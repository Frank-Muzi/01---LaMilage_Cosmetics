import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/"); // redirect after login
    } catch (err) {
      alert(err.message); // show Supabase error
    }
  };

  return (
    <div style={{ padding: "2rem", color: "#000", backgroundColor: "#fff" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        <button type="submit" style={{ padding: "0.5rem", backgroundColor: "#000", color: "#fff", border: "none", cursor: "pointer" }}>Login</button>
      </form>
    </div>
  );
};

export default Login;