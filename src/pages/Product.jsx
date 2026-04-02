import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../supabaseClient";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1); // quantity state

  const { addToCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const loadProduct = async () => {
      const data = await fetchProductById(id);
      setProduct(data);
    };
    loadProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const handleIncrease = () => {
    setQty((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (user) {
      for (let i = 0; i < qty; i++) {
        addToCart(product);
      }
    } else {
      alert("Please login to add to cart");
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#fff", color: "#000", minHeight: "80vh" }}>
      <Link
        to="/shop"
        style={{
          textDecoration: "none",
          color: "#d4af37",
          fontWeight: "500",
          marginBottom: "1rem",
          display: "inline-block",
        }}
      >
        ← Back to Shop
      </Link>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2rem",
          flexWrap: "wrap",
          marginTop: "1rem",
        }}
      >
        <div style={{ flex: "1 1 400px", maxWidth: "500px" }}>
          <img
            src={product.image || product.image_url}
            alt={product.name}
            style={{
              width: "100%",
              height: "auto",
              border: "1px solid #ddd",
              borderRadius: "8px",
              objectFit: "contain",
            }}
          />
        </div>

        <div style={{ flex: "1 1 300px", minWidth: "300px" }}>
          <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{product.name}</h1>

          <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#d4af37" }}>
            R {product.price}
          </p>

          <p style={{ margin: "1rem 0", lineHeight: "1.6" }}>
            {product.description}
          </p>

          {/* Quantity selector */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "1rem",
            }}
          >
            <button onClick={handleDecrease} style={qtyButtonStyle}>-</button>
            <span style={{ fontSize: "18px", fontWeight: "600" }}>{qty}</span>
            <button onClick={handleIncrease} style={qtyButtonStyle}>+</button>
          </div>

          <button
            onClick={handleAddToCart}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: "#000",
              color: "#ffd700",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const qtyButtonStyle = {
  padding: "6px 12px",
  fontSize: "18px",
  border: "1px solid #ccc",
  background: "#f5f5f5",
  borderRadius: "4px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default Product;