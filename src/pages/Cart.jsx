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
    <div style={{ padding: "2rem", color: "#000", backgroundColor: "#fff", minHeight: "80vh" }}>
      <h1 style={{ marginBottom: "1.5rem", textAlign: "center" }}>Your Cart</h1>

      {cart.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          Your cart is empty. <Link to="/shop" style={{ color: "#d4af37" }}>Shop Now</Link>
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "0.75rem",
                border: "1px solid #eee",
                borderRadius: "6px",
                gap: "0.5rem",
                width: "100%",
                maxWidth: "400px",
                margin: "0 auto",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
                <p style={{ margin: 0, fontWeight: "500", textAlign: "center" }}>{item.name}</p>
                <p style={{ margin: 0 }}>R{item.price} each</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap", justifyContent: "center" }}>
                <button onClick={() => handleDecrease(item)} style={qtyButtonStyle}>-</button>
                <span style={{ fontSize: "1rem" }}>{item.qty}</span>
                <button onClick={() => handleIncrease(item)} style={qtyButtonStyle}>+</button>

                <p style={{ margin: "0 10px" }}>R{item.price * item.qty}</p>

                <button onClick={() => removeFromCart(item.id)} style={removeButtonStyle}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", marginTop: "1.5rem", maxWidth: "400px", marginLeft: "auto", marginRight: "auto", gap: "1rem" }}>
            <h2>Total: R{total}</h2>
            <button
              onClick={clearCart}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#ff4d4d",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Clear Cart
            </button>
          </div>

          <Link
            to="/checkout"
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#000",
              color: "#ffd700",
              fontWeight: 600,
              textDecoration: "none",
              borderRadius: "6px",
              display: "inline-block",
              marginTop: "1rem",
              textAlign: "center",
              maxWidth: "200px",
              marginLeft: "auto",
              marginRight: "auto",
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
  padding: "0.4rem 0.7rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
  background: "#f5f5f5",
  cursor: "pointer",
  fontWeight: "bold",
};

const removeButtonStyle = {
  padding: "0.3rem 0.6rem",
  borderRadius: "4px",
  border: "none",
  background: "#ff4d4d",
  color: "#fff",
  cursor: "pointer",
  fontWeight: "500",
};

export default Cart;