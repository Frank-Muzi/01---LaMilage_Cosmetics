import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleIncrease = (item) => updateQuantity(item.id, item.qty + 1);
  const handleDecrease = (item) => {
    if (item.qty > 1) updateQuantity(item.id, item.qty - 1);
  };

  return (
    <div
      style={{
        padding: isMobile ? "1.2rem" : "2rem",
        color: "#000",
        backgroundColor: "#fff",
        minHeight: "80vh",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Your Cart</h1>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          Your cart is empty.{" "}
          <Link to="/shop" style={{ color: "#d4af37" }}>
            Shop Now
          </Link>
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "space-between",
                alignItems: isMobile ? "flex-start" : "center",
                padding: "1rem",
                border: "1px solid #eee",
                borderRadius: "8px",
                gap: "10px",
              }}
            >
              {/* Product info */}
              <div>
                <p style={{ margin: 0, fontWeight: "600" }}>{item.name}</p>
                <p style={{ margin: 0 }}>R{item.price} each</p>
              </div>

              {/* Controls */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <button onClick={() => handleDecrease(item)} style={qtyButtonStyle}>
                  -
                </button>

                <span style={{ fontSize: "1rem", fontWeight: "500" }}>
                  {item.qty}
                </span>

                <button onClick={() => handleIncrease(item)} style={qtyButtonStyle}>
                  +
                </button>

                <p style={{ margin: "0 10px", fontWeight: "500" }}>
                  R{item.price * item.qty}
                </p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={removeButtonStyle}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Total Section */}
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              marginTop: "1.5rem",
              gap: "1rem",
            }}
          >
            <h2>Total: R{total}</h2>

            <button onClick={clearCart} style={clearButton}>
              Clear Cart
            </button>
          </div>

          {/* Checkout */}
          <Link
            to="/checkout"
            style={{
              padding: "14px",
              backgroundColor: "#000",
              color: "#ffd700",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "6px",
              display: "block",
              marginTop: "1rem",
              textAlign: "center",
              width: isMobile ? "100%" : "250px",
              marginLeft: isMobile ? "0" : "auto",
            }}
          >
            Proceed to Checkout
          </Link>
        </div>
      )}
    </div>
  );
};

const qtyButtonStyle = {
  padding: "8px 12px",
  borderRadius: "4px",
  border: "1px solid #ccc",
  background: "#f5f5f5",
  cursor: "pointer",
  fontWeight: "bold",
};

const removeButtonStyle = {
  padding: "6px 10px",
  borderRadius: "4px",
  border: "none",
  background: "#ff4d4d",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "500",
};

const clearButton = {
  padding: "8px 14px",
  backgroundColor: "#ff4d4d",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
};

export default Cart;