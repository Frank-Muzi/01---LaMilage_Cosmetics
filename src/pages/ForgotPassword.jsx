import React, { useState } from "react";
import { supabase } from "../supabaseClient";
import { Link } from "react-router-dom";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "http://localhost:3000/update-password"
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Password reset email sent. Please check your email.");
    }

    setLoading(false);
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
          Reset Password
        </h2>

        <p style={{ fontSize: "14px", marginBottom: "20px", color: "#555" }}>
          Enter your email and we will send you a link to reset your password.
        </p>

        <form
          onSubmit={handleReset}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Sending..." : "Send Reset Email"}
          </button>

          {error && <p style={{ color: "red" }}>{error}</p>}
          {message && <p style={{ color: "green" }}>{message}</p>}

          {/* Back to login */}
          <p style={{ fontSize: "14px", marginTop: "10px" }}>
            Remember your password?{" "}
            <Link to="/login" style={linkStyle}>
              Login
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
  color: "#ffdd00",
  fontWeight: 700,
  fontSize: "1.1rem",
  cursor: "pointer",
};

const linkStyle = {
  color: "#d4af37",
  textDecoration: "none",
  fontWeight: "500",
};

export default ForgotPassword;