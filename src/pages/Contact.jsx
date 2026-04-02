import React, { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const phone = "27711155882"; // WhatsApp number
    const text = 
      `Name: ${name}\nEmail: ${email}\nProduct: ${product || "N/A"}\nMessage: ${message}`;
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    window.open(url, "_blank");

    // Reset form fields
    setName("");
    setEmail("");
    setProduct("");
    setMessage("");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f8f8f8",
      padding: "1rem"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "2rem 2.5rem 2rem 2rem",
        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        textAlign: "center"
      }}>
        <h2 style={{ margin: "0 0 1rem", fontSize: "2rem", color: "#1a1a1a" }}>Contact Us</h2>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
          <input
            type="text"
            placeholder="Product (Optional)"
            value={product}
            onChange={e => setProduct(e.target.value)}
            style={inputStyle}
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
            style={textareaStyle}
          />
          <button type="submit" style={buttonStyle}>Send Via WhatsApp</button>
        </form>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "0.95rem 1rem",
  borderRadius: "999px",
  border: "1px solid #dde2e8",
  backgroundColor: "#fafafa",
  fontSize: "1rem",
  outline: "none",
};

const textareaStyle = {
  ...inputStyle,
  borderRadius: "12px",
  minHeight: "120px",
  resize: "vertical",
};

const buttonStyle = {
  marginTop: "0.5rem",
  padding: "0.95rem",
  borderRadius: "999px",
  border: "none",
  backgroundColor: "#000000",
  color: "#FFD700",
  fontWeight: 700,
  fontSize: "1.1rem",
  cursor: "pointer",
};

export default Contact;