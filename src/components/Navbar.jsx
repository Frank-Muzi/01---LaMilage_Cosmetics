import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

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

  const toggleMobileMenu = () => {
    setMobileMenu(!mobileMenu);
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
      <nav style={navStyle}>
        <h2 style={logoStyle}>Lamilage</h2>

        {/* Hamburger Menu */}
        <div style={hamburger} onClick={toggleMobileMenu}>
          ☰
        </div>

        <div
          style={{
            ...navLinks,
            ...(mobileMenu ? mobileMenuOpen : {}),
          }}
        >
          <Link to="/" style={linkStyle} onClick={() => setMobileMenu(false)}>
            Home
          </Link>

          {/* CART */}
          <div
            onClick={() => {
              setIsCartOpen(true);
              setMobileMenu(false);
            }}
            style={{ ...linkStyle, position: "relative", cursor: "pointer" }}
          >
            Cart
            {cart.length > 0 && <span style={badgeStyle}>{cart.length}</span>}
          </div>

          <Link
            to="/contact"
            style={linkStyle}
            onClick={() => setMobileMenu(false)}
          >
            Contact
          </Link>

          {/* USER */}
          <div
            style={{ position: "relative", display: "flex", alignItems: "center" }}
            ref={dropdownRef}
          >
            <span
              onClick={toggleDropdown}
              style={{
                cursor: "pointer",
                fontSize: "1.2rem",
                marginRight: "6px",
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
              <div style={dropdownStyle}>
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      style={dropdownLink}
                      onClick={() => setShowDropdown(false)}
                    >
                      View Profile
                    </Link>

                    <Link
                      to="/"
                      onClick={handleSignOut}
                      style={dropdownLink}
                    >
                      Sign Out
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      style={dropdownLink}
                      onClick={() => setShowDropdown(false)}
                    >
                      Login
                    </Link>

                    <Link
                      to="/register"
                      style={dropdownLink}
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

      <CartDrawer isOpen={isCartOpen} closeCart={() => setIsCartOpen(false)} />
    </>
  );
};

const navStyle = {
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
};

const logoStyle = {
  fontSize: "1.2rem",
};

const navLinks = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
};

const mobileMenuOpen = {
  position: "absolute",
  top: "70px",
  left: 0,
  right: 0,
  backgroundColor: "#000",
  flexDirection: "column",
  padding: "20px",
};

const hamburger = {
  display: "none",
  fontSize: "1.8rem",
  cursor: "pointer",
};

const linkStyle = {
  color: "#e3dc03",
  textDecoration: "none",
  fontWeight: "500",
};

const dropdownStyle = {
  position: "absolute",
  top: "120%",
  right: 0,
  backgroundColor: "#090909",
  border: "1px solid #ccc",
  borderRadius: "4px",
  minWidth: "140px",
};

const dropdownLink = {
  display: "block",
  padding: "10px",
  color: "#e3dc03",
  textDecoration: "none",
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