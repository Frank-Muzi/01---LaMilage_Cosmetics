import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { register } = useContext(UserContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await register(firstName, surname, phone, email, password);
      setShowSuccess(true);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Navigate to login after closing popup
  const handleClosePopup = () => {
    setShowSuccess(false);
    navigate("/login");
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
          Create Account
        </h2>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={inputStyle}
          />

          <button type="submit" disabled={loading} style={buttonStyle}>
            {loading ? "Creating account..." : "Register"}
          </button>

          {error && <p style={{ color: "red", margin: 0 }}>{error}</p>}

          <p style={{ marginTop: "10px", fontSize: "14px" }}>
            Already have an account?{" "}
            <Link to="/login" style={linkStyle}>
              Login now
            </Link>
          </p>
        </form>
      </div>

      {/* Success Popup */}
      {showSuccess && (
        <div style={popupOverlayStyle}>
          <div style={popupStyle}>
            <p style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>
              ✅ Account registered!
            </p>
            <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>
              Please verify your email <span role="img" aria-label="email">📧</span>
            </p>
            <button onClick={handleClosePopup} style={popupButtonStyle}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles
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

const popupOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 3000,
};

const popupStyle = {
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "12px",
  textAlign: "center",
  maxWidth: "320px",
  width: "90%",
  boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
};

const popupButtonStyle = {
  marginTop: "1rem",
  padding: "0.75rem 1.5rem",
  backgroundColor: "#000",
  color: "#ffd700",
  fontWeight: "600",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Register;