import React, { useEffect, useState, useContext } from "react";
import { fetchProducts } from "../supabaseClient";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const [addedIds, setAddedIds] = useState([]);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      if (data) setProducts(data.slice(0, 12)); // Featured products
    };

    loadProducts();

    const calculateNavbarHeight = () => {
      const navbar = document.querySelector(".navbar");
      if (navbar) setNavbarHeight(navbar.offsetHeight);
    };

    calculateNavbarHeight();
    window.addEventListener("resize", calculateNavbarHeight);

    return () => window.removeEventListener("resize", calculateNavbarHeight);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);

    if (!addedIds.includes(product.id)) {
      setAddedIds((prev) => [...prev, product.id]);
    }

    setTimeout(() => {
      setAddedIds((prev) => prev.filter((id) => id !== product.id));
    }, 1000);
  };

  return (
    <div style={{ background: "#fff", margin: 0, padding: 0 }}>
      
      {/* HERO SECTION */}
      <section
        style={{
          display: "flex",
          width: "100%",
          minHeight: "40vh",
          background: "#444343",
          color: "#d4af37",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem",
          boxSizing: "border-box",
          paddingTop: `${navbarHeight}px`,
          margin: 0,
        }}
      >
        <div style={{ maxWidth: "600px" }}>
          <h1
            style={{
              fontSize: "clamp(1.5rem, 6vw, 3rem)",
              marginBottom: "1rem",
              lineHeight: "1.2",
            }}
          >
            LaMilage Cosmetics
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem, 4vw, 1.5rem)",
              marginBottom: "1.5rem",
            }}
          >
            A Scent That Speaks Before You Do
          </p>

          <Link
            to="/shop"
            style={{
              display: "inline-block",
              padding: "clamp(0.5rem, 1.5vw, 1rem) clamp(1rem, 3vw, 2rem)",
              background: "#f7be03",
              color: "#000",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "clamp(0.9rem, 2vw, 1.2rem)",
              borderRadius: "4px",
            }}
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section style={{ padding: "2rem 1rem", marginTop: "0" }}>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            fontSize: "clamp(1.2rem, 4vw, 2rem)",
          }}
        >
          Featured Products
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
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
                padding: "0.75rem",
                borderRadius: "6px",
                width: "100%",
                maxWidth: "220px",
                boxSizing: "border-box",
              }}
            >
              <img
                src={product.image_url}
                alt={product.name}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "contain",
                }}
              />

              <h4
                style={{
                  fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
                  marginTop: "0.5rem",
                }}
              >
                {product.name}
              </h4>

              <p
                style={{
                  color: "red",
                  fontWeight: "bold",
                  fontSize: "clamp(0.9rem, 2vw, 1rem)",
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
                  flexWrap: "wrap",
                }}
              >
                {/* VIEW BUTTON */}
                <Link
                  to={`/product/${product.id}`}
                  state={{ product }}
                  style={{
                    padding: "0.5rem 0.75rem",
                    background: "#000",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
                    borderRadius: "4px",
                  }}
                >
                  View
                </Link>

                {/* ADD TO CART */}
                <button
                  onClick={() => handleAddToCart(product)}
                  style={{
                    padding: "0.5rem 0.75rem",
                    background: "#d4af37",
                    border: "none",
                    fontSize: "clamp(0.75rem, 2vw, 0.9rem)",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  {addedIds.includes(product.id)
                    ? "Added!"
                    : "Add to Cart"}
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