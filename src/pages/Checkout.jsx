import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { supabase } from "../supabaseClient";

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const [delivery, setDelivery] = useState({
    firstName: "",
    lastName: "",
    address: "",
    apartment: "",
    phone: "",
  });

  const [payment, setPayment] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleDeliveryChange = (e) => {
    setDelivery({ ...delivery, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => setPayment(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!payment) {
      alert("Please select a payment method");
      return;
    }

    try {
      // Insert order into Supabase
      const { error } = await supabase.from("orders").insert([
        {
          user_id: supabase.auth.getUser().data.user?.id || null,
          items: cart, // saved as 'items' column
          total,
          delivery_details: delivery,
          payment_method: payment,
        },
      ]);

      if (error) throw error;

      setShowSuccess(true);
      clearCart();
    } catch (err) {
      console.error("Failed to place order:", err.message);
      setErrorMsg("Failed to place order. Please try again.");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "40px",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        {/* LEFT COLUMN */}
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
          <div style={cardStyle}>
            <h3>Delivery Details</h3>
            {["firstName", "lastName", "address", "apartment", "phone"].map(
              (field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={
                    field === "apartment"
                      ? "Apartment, Suite, or Unit"
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  value={delivery[field]}
                  onChange={handleDeliveryChange}
                  required={field !== "apartment"}
                  style={inputStyle}
                />
              )
            )}
          </div>

          {/* PAYMENT */}
          <div style={cardStyle}>
            <h3>Payment</h3>
            <label style={radioLabel}>
              <input
                type="radio"
                name="payment"
                value="bank"
                checked={payment === "bank"}
                onChange={handlePaymentChange}
              />
              Bank Deposit / Transfer
            </label>
            {payment === "bank" && (
              <div style={bankBox}>
                <p>
                  <strong>LaMilage Cosmetics (Hlengiwe Mahlalela)</strong>
                </p>
                <p>Bank: Capitec</p>
                <p>Account Number: 2477631345</p>
                <p>Branch Code: 470010</p>
                <p>Swift: CABLZAJJ</p>
                <p>
                  <em>
                    Please email proof of payment to{" "}
                    <a
                      href="mailto:frankmuzim@gmail.com"
                      style={{ color: "#d4af37" }}
                    >
                      frankmuzim@gmail.com
                    </a>
                  </em>
                </p>
              </div>
            )}
          </div>

          {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}

          <button type="submit" style={submitButtonStyle}>
            Place Order
          </button>
        </form>

        {/* RIGHT COLUMN */}
        <div style={summaryBox}>
          <h3>Cart Summary</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
              {cart.map((item) => (
                <div
                  key={item._id}
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>
                    {item.name} x {item.qty}
                  </span>
                  <span>R{item.price * item.qty}</span>
                </div>
              ))}

              <hr />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                <span>Total:</span>
                <span>R{total}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div style={popupOverlay}>
          <div style={popupBox}>
            <div style={tick}>✓</div>
            <h2>Your order has been placed successfully</h2>
            <button style={closeButton} onClick={() => setShowSuccess(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

/* STYLES */

const cardStyle = {
  border: "1px solid #eee",
  padding: "20px",
  borderRadius: "8px",
};

const summaryBox = {
  flex: "1 1 300px",
  border: "1px solid #eee",
  padding: "20px",
  borderRadius: "8px",
  minWidth: "300px",
  height: "fit-content",
};

const bankBox = {
  marginTop: "10px",
  padding: "10px",
  backgroundColor: "#f5f5f5",
  borderRadius: "6px",
  fontSize: "14px",
  lineHeight: "1.5",
};

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

const popupOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const popupBox = {
  background: "#fff",
  padding: "40px",
  borderRadius: "12px",
  textAlign: "center",
  width: "90%",
  maxWidth: "400px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const tick = {
  fontSize: "60px",
  color: "green",
  marginBottom: "15px",
};

const closeButton = {
  marginTop: "20px",
  padding: "10px 20px",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#000",
  color: "#fff",
  cursor: "pointer",
};

export default Checkout;