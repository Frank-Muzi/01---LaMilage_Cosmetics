import React, { useEffect, useState, useContext } from "react";
import { fetchProducts } from "../supabaseClient";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [addedIds, setAddedIds] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      if (data) setProducts(data.slice(0, 12));
    };
    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedIds((prev) => [...prev, product.id]);
    setTimeout(() => setAddedIds((prev) => prev.filter((id) => id !== product.id)), 1000);
  };

  return (
    <div style={{ background: "#fff", padding: "0 1rem" }}>
      {/* Hero Section */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#444343",
          color: "#d4af37",
          textAlign: "center",
          padding: "3rem 1rem",
          borderRadius: "8px",
          marginBottom: "2rem",
        }}
      >
        <Link
          to="/shop"
          style={{
            padding: "0.75rem 1.5rem",
            background: "#f7be03",
            color: "#000",
            textDecoration: "none",
            fontWeight: "bold",
            borderRadius: "6px",
            fontSize: "1.2rem",
          }}
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Products */}
      <section>
        <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Featured Products</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
            gap: "1rem",
            justifyItems: "center",
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{
                textAlign: "center",
                border: "1px solid #eee",
                padding: "1rem",
                borderRadius: "8px",
                width: "100%",
                maxWidth: "200px",
              }}
            >
              <img
                src={product.image_url}
                alt={product.name}
                style={{ width: "100%", height: "150px", objectFit: "contain" }}
              />
              <h4 style={{ fontSize: "1rem", marginTop: "0.5rem" }}>{product.name}</h4>
              <p style={{ color: "red", fontWeight: "bold" }}>R {product.price}</p>

              <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", flexWrap: "wrap", marginTop: "0.5rem" }}>
                <Link
                  to={`/product/${product.id}`}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#000",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    borderRadius: "4px",
                  }}
                >
                  View
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  style={{
                    padding: "0.5rem 1rem",
                    background: "#d4af37",
                    border: "none",
                    fontSize: "0.9rem",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {addedIds.includes(product.id) ? "Added!" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;