import React from "react";

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: "#060606",
      color: "#ffd000",
      padding: "2rem",
      textAlign: "center",
      marginTop: "40px"
    }}>
      <h3>Lamilage Cosmetics</h3>

      <p>Luxury skincare & beauty products</p>

      <p style={{ marginTop: "10px", fontSize: "14px" }}>
        © {new Date().getFullYear()} Lamilage Cosmetics. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;