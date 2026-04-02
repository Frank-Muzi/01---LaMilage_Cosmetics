import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f8f8f8",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#fff",
          borderRadius: "16px",
          padding: "2rem",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h2 style={{ margin: "0 0 1rem", fontSize: "2rem", color: "#1a1a1a" }}>
          Sign In
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Signing in..." : "Login"}
          </button>

          {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}

          {/* Forgot Password */}
          <p style={{ marginTop: "10px", fontSize: "14px" }}>
            Forgotten your password?{" "}
            <Link to="/forgot-password" style={linkStyle}>
              Reset it now
            </Link>
          </p>

          {/* Register */}
          <p style={{ marginTop: "0", fontSize: "14px" }}>
            Don't have an account?{" "}
            <Link to="/register" style={linkStyle}>
              Register now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "0.95rem 1rem",
  borderRadius: "999px",
  border: "1px solid #dde2e8",
  backgroundColor: "#fafafa",
  fontSize: "1rem",
  outline: "none",
};

const buttonStyle = {
  marginTop: "0.5rem",
  padding: "0.95rem",
  borderRadius: "999px",
  border: "none",
  backgroundColor: "#000000",
  color: "#eea907",
  fontWeight: 700,
  fontSize: "1.1rem",
  cursor: "pointer",
};

const linkStyle = {
  color: "#d4af37",
  textDecoration: "none",
  fontWeight: "500",
};

export default Login;