import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleIncrease = (item) => updateQuantity(item.id, item.qty + 1);
  const handleDecrease = (item) => {
    if (item.qty > 1) updateQuantity(item.id, item.qty - 1);
  };

  return (
    <div style={pageStyle}>
      <h1 style={headingStyle}>Your Cart</h1>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          Your cart is empty.{" "}
          <Link to="/shop" style={{ color: "#d4af37" }}>
            Shop Now
          </Link>
        </p>
      ) : (
        <>
          <div style={cartListStyle}>
            {cart.map((item) => (
              <div key={item.id} style={cartItemStyle}>
                
                {/* Product Info */}
                <div style={productInfoStyle}>
                  <p style={productName}>{item.name}</p>
                  <p style={productPrice}>R{item.price} each</p>
                </div>

                {/* Controls */}
                <div style={controlsStyle}>
                  <div style={qtyControls}>
                    <button onClick={() => handleDecrease(item)} style={qtyButtonStyle}>
                      -
                    </button>

                    <span style={qtyText}>{item.qty}</span>

                    <button onClick={() => handleIncrease(item)} style={qtyButtonStyle}>
                      +
                    </button>
                  </div>

                  <p style={subtotalStyle}>
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
          </div>

          {/* Total Section */}
          <div style={totalSection}>
            <h2>Total: R{total}</h2>

            <button onClick={clearCart} style={clearButton}>
              Clear Cart
            </button>
          </div>

          {/* Checkout */}
          <Link to="/checkout" style={checkoutButton}>
            Proceed to Checkout
          </Link>
        </>
      )}
    </div>
  );
};

const pageStyle = {
  padding: "1rem",
  backgroundColor: "#fff",
  minHeight: "80vh",
  maxWidth: "900px",
  margin: "0 auto",
  overflowX: "hidden",
};

const headingStyle = {
  textAlign: "center",
  marginBottom: "1.5rem",
  fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
};

const cartListStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
};

const cartItemStyle = {
  border: "1px solid #eee",
  borderRadius: "8px",
  padding: "1rem",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const productInfoStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const productName = {
  margin: 0,
  fontWeight: "600",
  fontSize: "1rem",
};

const productPrice = {
  margin: 0,
  color: "#555",
};

const controlsStyle = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  gap: "10px",
};

const qtyControls = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const qtyText = {
  fontWeight: "500",
  minWidth: "20px",
  textAlign: "center",
};

const subtotalStyle = {
  margin: 0,
  fontWeight: "500",
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
  padding: "6px 12px",
  borderRadius: "4px",
  border: "none",
  background: "#ff4d4d",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "500",
};

const totalSection = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "1.5rem",
  flexWrap: "wrap",
  gap: "1rem",
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

const checkoutButton = {
  display: "block",
  marginTop: "1rem",
  padding: "14px",
  backgroundColor: "#000",
  color: "#ffd700",
  textDecoration: "none",
  textAlign: "center",
  borderRadius: "6px",
  fontWeight: "600",
  width: "100%",
  maxWidth: "300px",
  marginLeft: "auto",
  marginRight: "auto",
};

export default Cart;