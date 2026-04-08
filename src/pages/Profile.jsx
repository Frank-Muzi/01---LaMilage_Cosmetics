import React, { useContext, useState, useEffect, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import { supabase } from "../supabaseClient";

const Profile = () => {
  const { user } = useContext(UserContext);

  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchOrders = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (!error) setOrders(data);
  }, [user]);

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setFirstName(user.user_metadata?.first_name || "");
      setSurname(user.user_metadata?.surname || "");
      setPhone(user.user_metadata?.phone || "");

      fetchOrders();
    }
  }, [user, fetchOrders]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { first_name: firstName, surname, phone },
      });

      if (error) throw error;

      setMessage("Profile updated successfully!");
    } catch (err) {
      setMessage(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <h2>Please login to view your profile</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8f8f8",
        padding: isMobile ? "20px" : "40px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1000px",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "30px",
        }}
      >
        {/* PERSONAL DETAILS */}
        <div style={cardStyle}>
          <h2 style={titleStyle}>Personal Details</h2>

          <form
            onSubmit={handleUpdate}
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              style={inputStyle}
            />

            <input
              type="email"
              value={email}
              disabled
              style={{ ...inputStyle, backgroundColor: "#eee" }}
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={inputStyle}
            />

            <button type="submit" disabled={loading} style={buttonStyle}>
              {loading ? "Updating..." : "Update Profile"}
            </button>

            {message && <p style={{ color: "green" }}>{message}</p>}
          </form>
        </div>

        {/* ORDER HISTORY */}
        <div style={cardStyle}>
          <h2 style={titleStyle}>Order History</h2>

          {orders.length === 0 ? (
            <p style={{ textAlign: "center", color: "#777" }}>No orders yet</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} style={orderCard}>
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Total:</strong> R{order.total}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// STYLES
const cardStyle = {
  background: "#fff",
  padding: "30px",
  borderRadius: "16px",
  boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
};

const titleStyle = {
  marginBottom: "20px",
  fontSize: "1.8rem",
  textAlign: "center",
};

const orderCard = {
  border: "1px solid #eee",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "10px",
};

const inputStyle = {
  padding: "0.95rem 1rem",
  borderRadius: "999px",
  border: "1px solid #dde2e8",
  backgroundColor: "#fafafa",
  fontSize: "1rem",
};

const buttonStyle = {
  marginTop: "10px",
  padding: "0.95rem",
  borderRadius: "999px",
  border: "none",
  backgroundColor: "#000",
  color: "#ffdd00",
  fontWeight: 700,
  fontSize: "1rem",
  cursor: "pointer",
};

export default Profile;