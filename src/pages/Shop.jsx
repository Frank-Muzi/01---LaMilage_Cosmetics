import React, { useEffect, useState, useContext } from "react";
import { fetchProducts } from "../supabaseClient";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [addedIds, setAddedIds] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      if (data) setProducts(data);
    };
    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setAddedIds((prev) => [...prev, product.id]);

    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 1000);
  };

  return (
    <div style={{ background: "#fff", padding: "1rem" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "40px",
          fontSize: "clamp(1.5rem, 4vw, 2.5rem)"
        }}
      >
        Shop
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "1rem",
          justifyItems: "center"
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              textAlign: "center",
              border: "1px solid #eee",
              padding: "0.75rem",
              borderRadius: "6px",
              width: "100%",
              maxWidth: "220px",
              boxSizing: "border-box"
            }}
          >
            <img
              src={product.image_url}
              alt={product.name}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "contain"
              }}
            />

            <h4
              style={{
                fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
                marginTop: "0.5rem"
              }}
            >
              {product.name}
            </h4>

            <p
              style={{
                color: "red",
                fontWeight: "bold",
                fontSize: "clamp(0.9rem, 2vw, 1rem)"
              }}
            >
              R {product.price}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "0.5rem",
                marginTop: "0.5rem",
                flexWrap: "wrap"
              }}
            >
              <Link
                to={`/product/${product.id}`}
                style={{
                  padding: "0.5rem 0.75rem",
                  background: "#000",
                  color: "#fff",
                  textDecoration: "none",
                  fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
                  borderRadius: "4px"
                }}
              >
                View
              </Link>

              <button
                onClick={() => handleAddToCart(product)}
                style={{
                  padding: "0.5rem 0.75rem",
                  background: "#d4af37",
                  border: "none",
                  fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                {addedIds.includes(product.id) ? "Added!" : "Add to Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;