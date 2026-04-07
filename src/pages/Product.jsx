import React, { useEffect, useState, useContext } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { fetchProducts } from "../supabaseClient";
import { CartContext } from "../context/CartContext";

const ProductPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(location.state?.product || null);
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);

      if (!product) {
        const selected = data.find((p) => String(p.id) === String(id));
        setProduct(selected);
      }
    };

    loadProducts();
  }, [id, product]);

  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  if (!product) {
    return (
      <div style={{ paddingTop: "120px", textAlign: "center" }}>
        Loading product...
      </div>
    );
  }

  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div
      style={{
        paddingTop: "120px",
        maxWidth: "1100px",
        margin: "auto",
        padding: "120px 1rem 2rem 1rem",
      }}
    >
      {/* PRODUCT SECTION */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
          alignItems: "center",
        }}
      >
        {/* IMAGE */}
        <div style={{ textAlign: "center" }}>
          <img
            src={product.image_url}
            alt={product.name}
            style={{
              width: "100%",
              maxWidth: "420px",
              objectFit: "contain",
            }}
          />
        </div>

        {/* INFO */}
        <div>
          <h1 style={{ marginBottom: "1rem" }}>{product.name}</h1>

          <p
            style={{
              color: "red",
              fontSize: "1.6rem",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}
          >
            R {product.price}
          </p>

          <p style={{ marginBottom: "2rem", lineHeight: "1.6" }}>
            {product.description ||
              "Premium LaMilage fragrance crafted to leave a lasting impression."}
          </p>

          {/* QUANTITY CONTROLS */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "1.5rem",
            }}
          >
            <button
              onClick={decreaseQty}
              style={{
                width: "35px",
                height: "35px",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              −
            </button>

            <span style={{ fontSize: "18px", fontWeight: "bold" }}>
              {quantity}
            </span>

            <button
              onClick={increaseQty}
              style={{
                width: "35px",
                height: "35px",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              +
            </button>
          </div>

          {/* ADD TO CART */}
          <button
            onClick={handleAddToCart}
            style={{
              padding: "0.8rem 1.6rem",
              background: "#d4af37",
              border: "none",
              fontSize: "1rem",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {added ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;