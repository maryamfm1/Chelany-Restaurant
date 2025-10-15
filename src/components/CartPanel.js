import React from "react";
import { useCart } from "../CartContext.js"; // cart context se data le rahe hain
import { useNavigate } from "react-router-dom";
import "./CartPanel.css"; // optional CSS file styling ke liye (next step me bana sakte hain)

const CartPanel = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    totalPrice,
    totalQuantity,
  } = useCart();

  const navigate = useNavigate();

  return (
    <div className="cart-panel">
      <h2 className="cart-title">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-items">
            {cart.map((item, index) => (
              <li key={index} className="cart-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-price">€{item.price.toFixed(2)}</span>
                </div>

                <div className="item-actions">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.price, item.quantity - 1)
                    }
                    className="qty-btn"
                  >
                    –
                  </button>
                  <span className="item-qty">{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.price, item.quantity + 1)
                    }
                    className="qty-btn"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id, item.price)}
                    className="remove-btn"
                  >
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p>
              <strong>Total Items:</strong> {totalQuantity}
            </p>
            <p>
              <strong>Total Price:</strong> €{totalPrice.toFixed(2)}
            </p>
          </div>

          <button
            className="checkout-btn"
            onClick={() => navigate("/order")} // checkout click -> order page
          >
            Checkout →
          </button>
        </>
      )}
    </div>
  );
};

export default CartPanel;
