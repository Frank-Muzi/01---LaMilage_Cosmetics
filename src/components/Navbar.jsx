import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { user, logout } = useContext(UserContext);
  const { cart } = useContext(CartContext);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleSignOut = () => {
    logout();
    setShowDropdown(false);
    navigate("/");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        style={{
          backgroundColor: "#000",
          color: "#ebdc04",
          padding: "1rem 2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        }}
      >
        <h2>Welcome to Lamilage Cosmetics</h2>

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link to="/" style={linkStyle}>
            Home
          </Link>

          {/* CART BUTTON */}
          <div
            onClick={() => setIsCartOpen(true)}
            style={{ ...linkStyle, position: "relative", cursor: "pointer" }}
          >
            Cart
            {cart.length > 0 && <span style={badgeStyle}>{cart.length}</span>}
          </div>

          <Link to="/contact" style={linkStyle}>
            Contact
          </Link>

          {/* USER DROPDOWN */}
          <div
            style={{ position: "relative", display: "flex", alignItems: "center" }}
            ref={dropdownRef}
          >
            <span
              onClick={toggleDropdown}
              style={{
                cursor: "pointer",
                fontSize: "1rem",
                marginRight: "6px",
                filter: "sepia(1) saturate(10) hue-rotate(45deg)", // bright yellow
              }}
            >
              👤
            </span>

            {user && (
              <span
                style={{
                  color: "#FFD700",
                  fontWeight: 600,
                  marginRight: "12px",
                }}
              >
                {user.user_metadata?.first_name || user.email}
              </span>
            )}

            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "120%",
                  right: 0,
                  backgroundColor: "#090909",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                  zIndex: 1000,
                  minWidth: "140px",
                }}
              >
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      style={{ ...linkStyle, display: "block", padding: "0.5rem 1rem" }}
                      onClick={() => setShowDropdown(false)}
                    >
                      View Profile
                    </Link>

                    <Link
                      to="/"
                      onClick={handleSignOut}
                      style={{ ...linkStyle, display: "block", padding: "0.5rem 1rem" }}
                    >
                      Sign Out
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      style={{ ...linkStyle, display: "block", padding: "0.5rem 1rem" }}
                      onClick={() => setShowDropdown(false)}
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      style={{ ...linkStyle, display: "block", padding: "0.5rem 1rem" }}
                      onClick={() => setShowDropdown(false)}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* CART DRAWER */}
      <CartDrawer isOpen={isCartOpen} closeCart={() => setIsCartOpen(false)} />
    </>
  );
};

const linkStyle = {
  color: "#e3dc03",
  textDecoration: "none",
  fontWeight: "500",
};

const badgeStyle = {
  position: "absolute",
  top: "-8px",
  right: "-12px",
  background: "red",
  color: "white",
  borderRadius: "50%",
  padding: "2px 6px",
  fontSize: "12px",
  fontWeight: "bold",
};

export default Navbar;