import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import "./CartDrawer.css"; // import the new CSS

const CartDrawer = ({ isOpen, closeCart }) => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleIncrease = (item) => updateQuantity(item.id, item.qty + 1);
  const handleDecrease = (item) => {
    if (item.qty > 1) updateQuantity(item.id, item.qty - 1);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`cart-overlay ${isOpen ? "open" : ""}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className={`cart-drawer ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="cart-close" onClick={closeCart}>
            ✕
          </button>
        </div>

        {/* Cart Items */}
        {cart.length === 0 ? (
          <p className="cart-empty">
            Your cart is empty.{" "}
            <Link to="/shop" onClick={closeCart}>
              Shop Now
            </Link>
          </p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className={`cart-item ${isMobile ? "mobile" : ""}`}
                >
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">R{item.price} each</p>
                  </div>

                  <div className="cart-item-controls">
                    <button onClick={() => handleDecrease(item)} className="qty-btn">
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => handleIncrease(item)} className="qty-btn">
                      +
                    </button>
                    <p className="cart-item-total">R{item.price * item.qty}</p>
                    <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <h2 className="cart-total">Total: R{total}</h2>

            {/* Checkout */}
            <Link to="/checkout" onClick={closeCart} className="checkout-btn">
              Proceed to Checkout
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default CartDrawer;