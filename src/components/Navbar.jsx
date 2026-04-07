import React, { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";
import CartDrawer from "../components/CartDrawer";
import "./Navbar.css";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const { user, logout } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  const toggleMobileMenu = () => setMobileMenu(!mobileMenu);

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
      <nav className="navbar">
        {/* Logo (always visible on desktop, hidden on mobile) */}
        <h2 className="navbar-logo">Lamilage</h2>

        {/* Hamburger Menu (mobile only) */}
        <div className="navbar-hamburger" onClick={toggleMobileMenu}>
          ☰
        </div>

        {/* Navigation Links */}
        <div className={`nav-links ${mobileMenu ? "open" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setMobileMenu(false)}>
            Home
          </Link>

          <div
            className="nav-link cart-link"
            onClick={() => {
              setIsCartOpen(true);
              setMobileMenu(false);
            }}
          >
            Cart
            {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
          </div>

          <Link to="/contact" className="nav-link" onClick={() => setMobileMenu(false)}>
            Contact
          </Link>

          {/* User Dropdown */}
          <div className="user-dropdown" ref={dropdownRef}>
            <span className="user-icon" onClick={toggleDropdown}>
              👤
            </span>
            {user && (
              <span className="user-name">
                {user.user_metadata?.first_name || user.email}
              </span>
            )}

            {showDropdown && (
              <div className="dropdown-menu">
                {user ? (
                  <>
                    <Link
                      to="/profile"
                      className="dropdown-link"
                      onClick={() => setShowDropdown(false)}
                    >
                      View Profile
                    </Link>
                    <Link to="/" className="dropdown-link" onClick={handleSignOut}>
                      Sign Out
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="dropdown-link"
                      onClick={() => setShowDropdown(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="dropdown-link"
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

export default Navbar;