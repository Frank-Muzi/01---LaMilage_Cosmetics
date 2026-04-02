import React, { useEffect, useState, useContext } from "react";
import { fetchProducts } from "../supabaseClient";
import { CartContext } from "../context/CartContext"; // import CartContext

const Shop = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext); // access cart functions

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      if (data) setProducts(data); // show all products
    };
    loadProducts();
  }, []);

  return (
    <div style={{ background: "#fff", padding: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Shop</h1>

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
            style={{
              textAlign: "center",
              border: "1px solid #eee",
              padding: "15px",
              borderRadius: "6px"
            }}
          >
            <img
              src={product.image_url}
              alt={product.name}
              style={{
                width: "180px",
                height: "180px",
                objectFit: "contain"
              }}
            />

            <h4 style={{ fontSize: "16px", marginTop: "10px" }}>
              {product.name}
            </h4>

            <p
              style={{
                color: "red",
                fontWeight: "bold",
                fontSize: "15px"
              }}
            >
              R {product.price}
            </p>

            {/* Action buttons */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "10px"
              }}
            >
              <a
                href={`/product/${product.id}`}
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
              </a>

              <button
                onClick={() => addToCart(product)}
                style={{
                  padding: "6px 12px",
                  background: "#d4af37",
                  border: "none",
                  fontSize: "14px",
                  borderRadius: "4px",
                  cursor: "pointer"
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;