import React, { useEffect, useState, useContext } from "react";
import { fetchProducts } from "../supabaseClient";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom"; // <-- import Link

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
    <div style={{ background: "#fff" }}>
      <section style={{ display: "flex", width: "100%", height: "400px", marginBottom: "60px" }}>
        <div
          style={{
            flex: 1,
            background: "#444343",
            color: "#d4af37",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            padding: "40px"
          }}
        >
          <h1 style={{ fontSize: "40px", marginBottom: "15px" }}>LaMilage Cosmetics</h1>
          <p style={{ fontSize: "18px", marginBottom: "25px" }}>A Scent That Speaks Before You Do</p>
          <Link
            to="/shop"
            style={{
              padding: "12px 28px",
              background: "#f7be03",
              color: "#000",
              textDecoration: "none",
              fontWeight: "bold",
              borderRadius: "4px"
            }}
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: "25px", textAlign: "center" }}>Featured Products</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, 200px)",
            justifyContent: "center",
            gap: "25px"
          }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              style={{ textAlign: "center", border: "1px solid #eee", padding: "15px", borderRadius: "6px" }}
            >
              <img
                src={product.image_url}
                alt={product.name}
                style={{ width: "180px", height: "180px", objectFit: "contain" }}
              />
              <h4 style={{ fontSize: "16px", marginTop: "10px" }}>{product.name}</h4>
              <p style={{ color: "red", fontWeight: "bold", fontSize: "15px" }}>R {product.price}</p>

              <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "10px" }}>
                {/* Use Link instead of <a> */}
                <Link
                  to={`/product/${product.id}`}
                  style={{
                    padding: "6px 12px",
                    background: "#000",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "14px",
                    borderRadius: "4px"
                  }}
                >
                  View
                </Link>

                <button
                  onClick={() => handleAddToCart(product)}
                  style={{
                    padding: "6px 12px",
                    background: "#d4af37",
                    border: "none",
                    fontSize: "14px",
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
      </section>
    </div>
  );
};

export default Home;