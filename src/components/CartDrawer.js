import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartDrawer = ({ isOpen, closeCart }) => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleIncrease = (item) => updateQuantity(item.id, item.qty + 1);
  const handleDecrease = (item) => {
    if (item.qty > 1) updateQuantity(item.id, item.qty - 1);
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: isOpen ? "rgba(0,0,0,0.4)" : "transparent",
          opacity: isOpen ? 1 : 0,
          transition: "0.3s",
          pointerEvents: isOpen ? "auto" : "none",
          zIndex: 1500,
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          width: isOpen ? "30%" : "0",
          height: "100%",
          background: "white",
          boxShadow: "-2px 0 10px rgba(0,0,0,0.2)",
          overflowX: "hidden",
          transition: "0.3s",
          zIndex: 2000,
          padding: isOpen ? "20px" : "0px",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <h2>Your Cart</h2>
          <button onClick={closeCart} style={{ fontSize: "20px", cursor: "pointer" }}>✕</button>
        </div>

        {/* Cart Items */}
        {cart.length === 0 ? (
          <p>
            Your cart is empty.{" "}
            <Link to="/shop" style={{ color: "#d4af37" }} onClick={closeCart}>
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
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0.75rem",
                  border: "1px solid #eee",
                  borderRadius: "6px"
                }}
              >
                <div>
                  <p style={{ margin: 0, fontWeight: "500" }}>{item.name}</p>
                  <p style={{ margin: 0 }}>R{item.price} each</p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {/* Quantity controls */}
                  <button onClick={() => handleDecrease(item)} style={qtyButtonStyle}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => handleIncrease(item)} style={qtyButtonStyle}>+</button>

                  <p style={{ margin: "0 10px" }}>R{item.price * item.qty}</p>

                  <button onClick={() => removeFromCart(item.id)} style={removeButtonStyle}>
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Total & Checkout */}
            <h2 style={{ marginTop: "1.5rem" }}>Total: R{total}</h2>
            <Link
              to="/checkout"
              onClick={closeCart} // <-- close drawer on checkout
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#000",
                color: "#ffd700",
                fontWeight: 600,
                textDecoration: "none",
                borderRadius: "6px",
                display: "inline-block",
                marginTop: "1rem",
                textAlign: "center"
              }}
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

const qtyButtonStyle = {
  padding: "0.25rem 0.6rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  background: "#f5f5f5",
  cursor: "pointer",
  fontWeight: "bold"
};

const removeButtonStyle = {
  padding: "0.3rem 0.6rem",
  borderRadius: "4px",
  border: "none",
  background: "#ff4d4d",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "500"
};

export default CartDrawer;