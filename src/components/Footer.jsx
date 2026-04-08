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
            Established in 2019, Lamilage Cosmetics is a beauty and fragrance brand dedicated to enhancing both your scent and your glow.
            Guided by our belief that beauty is deeply personal, we create luxurious perfumes and targeted skincare products designed to complement your individuality.
            Our fragrances are crafted to leave a lasting impression, while our skincare range focuses on addressing minor skin concerns — helping you feel confident, radiant, and refined.
            <br /><br />
            At Lamilage Cosmetics, we do more than create products — we create experiences. From our signature black and gold aesthetic to the carefully selected ingredients and scents, every detail is designed to reflect elegance, quality, and intention.
            <br /><br />
            We understand that how you smell and how your skin feels both play a powerful role in how you show up in the world. That is why our mission is simple: to help you align your outer beauty with your inner glow.
          </p>
        </div>

        {/* RIGHT SIDE - SOCIAL MEDIA */}
        <div style={{ flex: "1 1 250px" }}>
          <h3 style={{ marginBottom: "15px" }}>Social Media Handles</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#ffd000",
                textDecoration: "none",
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
                textDecoration: "none",
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