import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const Checkout = () => {
  const { cart } = useContext(CartContext);

  // Calculate total dynamically
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  // Delivery details state
  const [delivery, setDelivery] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    phone: "",
  });

  // Payment option state
  const [payment, setPayment] = useState("");

  const handleDeliveryChange = (e) => {
    setDelivery({ ...delivery, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => setPayment(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!payment) {
      alert("Please select a payment method");
      return;
    }
    console.log("Delivery Details:", delivery);
    console.log("Payment Method:", payment);
    console.log("Cart:", cart);
    alert("Order placed successfully!");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px",
        gap: "40px",
        flexWrap: "wrap",
      }}
    >
      {/* LEFT COLUMN: Delivery + Payment Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          flex: "1 1 350px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
        }}
      >
        {/* DELIVERY DETAILS */}
        <div style={{ border: "1px solid #eee", padding: "20px", borderRadius: "8px" }}>
          <h3>Delivery Details</h3>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={delivery.firstName}
            onChange={handleDeliveryChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={delivery.lastName}
            onChange={handleDeliveryChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={delivery.address}
            onChange={handleDeliveryChange}
            required
            style={inputStyle}
          />
          <input
            type="text"
            name="apartment"
            placeholder="Apartment, Suite, or Unit"
            value={delivery.apartment}
            onChange={handleDeliveryChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={delivery.phone}
            onChange={handleDeliveryChange}
            required
            style={inputStyle}
          />
        </div>

        {/* PAYMENT OPTIONS */}
        <div style={{ border: "1px solid #eee", padding: "20px", borderRadius: "8px" }}>
          <h3>Payment</h3>
          
          <label style={radioLabel}>
            <input
              type="radio"
              name="payment"
              value="bank"
              checked={payment === "bank"}
              onChange={handlePaymentChange}
            />{" "}
            Bank Deposit/Transfer
          </label>

          {/* Bank details dropdown */}
          {payment === "bank" && (
            <div
              style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: "#f5f5f5",
                borderRadius: "6px",
                fontSize: "14px",
                lineHeight: "1.5",
              }}
            >
              <p><strong>LaMilage Cosmetics(Hlengiwe Mahlalela)</strong></p>
              <p>Bank: Capitec</p>
              <p>Account Number: 2477631345</p>
              <p>Branch Code: 470010</p>
              <p>Swift: CABLZAJJ</p>
              <p>
                <em>
                  Please email proof of payment to{" "}
                  <a href="mailto:frankmuzim@gmail.com" style={{ color: "#d4af37" }}>
                    frankmuzim@gmail.com
                  </a>
                </em>
              </p>
            </div>
          )}
        </div>
        
        

        <button type="submit" style={submitButtonStyle}>
          Place Order
        </button>
      </form>

      {/* RIGHT COLUMN: Cart Summary */}
      <div
        style={{
          flex: "1 1 300px",
          border: "1px solid #eee",
          padding: "20px",
          borderRadius: "8px",
          minWidth: "300px",
          height: "fit-content",
        }}
      >
        <h3>Cart Summary</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {cart.map((item) => (
              <div key={item._id} style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{item.name} x {item.qty}</span>
                <span>R{item.price * item.qty}</span>
              </div>
            ))}
            <hr />
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold" }}>
              <span>Total:</span>
              <span>R{total}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// STYLES
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "14px",
  outline: "none",
};

const radioLabel = {
  display: "block",
  marginTop: "10px",
  fontSize: "14px",
  cursor: "pointer",
};

const submitButtonStyle = {
  padding: "12px 20px",
  backgroundColor: "#d4af37",
  border: "none",
  color: "#000",
  fontWeight: "bold",
  borderRadius: "6px",
  cursor: "pointer",
};

export default Checkout;