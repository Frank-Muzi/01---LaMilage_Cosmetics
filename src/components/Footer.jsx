import React from "react";
import { FaFacebook, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#060606",
        color: "#ffd000",
        padding: "40px 20px",
        marginTop: "40px"
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "40px"
        }}
      >
        {/* LEFT SIDE - BIO */}
        <div style={{ flex: "1 1 500px" }}>
          <h3 style={{ marginBottom: "15px" }}>LaMilage Cosmetics</h3>

          <p style={{ lineHeight: "1.7", fontSize: "14px", color: "#e6c200" }}>
            Founded in 2019, Lamilage Cosmetics is a beauty brand offering elegant perfumes and targeted skincare designed to enhance confidence and natural glow.
            We create luxurious, thoughtfully crafted products that help you look good, feel good, and show up with confidence.
            <br /><br />
            Lamilage Cosmetics — the scent that matches your glow.
          </p>
        </div>

        {/* RIGHT SIDE - SOCIAL MEDIA */}
        <div style={{ flex: "1 1 250px" }}>
          <h3 style={{ marginBottom: "15px" }}>Social Media Handles</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            
            <a
              href="https://www.facebook.com/profile.php?id=100063801109490"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#ffd000",
                textDecoration: "underline",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "15px"
              }}
            >
              <FaFacebook size={20} />
              Lamilage
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#ffd000",
                textDecoration: "underline",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                fontSize: "15px"
              }}
            >
              <FaTiktok size={20} />
              Lamilage Cosmetics
            </a>

          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <p
        style={{
          marginTop: "30px",
          fontSize: "13px",
          textAlign: "center",
          color: "#bfa300"
        }}
      >
        © {new Date().getFullYear()} Lamilage Cosmetics. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;