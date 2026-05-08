import React from "react";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart({ cart, removeFromCart, updateQuantity }) {
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="cart-empty text-center py-5">
        <i className="fa-solid fa-cart-shopping fa-5x mb-3 text-muted"></i>
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="btn btn-success mt-3">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-container container py-5">
      <h2 className="mb-4">Shopping Cart</h2>
      
      <div className="row">
        <div className="col-lg-8">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-card d-flex align-items-center mb-3">
                <div className="item-image">
                  <img src={item.img} alt={item.name} />
                </div>
                
                <div className="item-details ms-3 flex-grow-1">
                  <h4 className="mb-1">{item.name}</h4>
                  <p className="text-muted small mb-1">{item.category}</p>
                  <div className="price-info">
                    <span className="current-price">₹{item.price}</span>
                    <span className="ms-2 text-muted text-decoration-line-through small">₹{item.oldPrice}</span>
                  </div>
                </div>

                <div className="item-quantity d-flex align-items-center me-4">
                  <button 
                    className="qty-btn" 
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <span className="mx-3 fw-bold">{item.quantity}</span>
                  <button 
                    className="qty-btn" 
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>

                <div className="item-total me-4">
                  <span className="fw-bold">₹{item.price * item.quantity}</span>
                </div>

                <button 
                  className="remove-btn text-danger" 
                  onClick={() => removeFromCart(item.id)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="order-summary-card p-4">
            <h4 className="mb-4">Order Summary</h4>
            
            <div className="summary-row d-flex justify-content-between mb-2">
              <span>Subtotal ({cart.length} items)</span>
              <span>₹{totalPrice}</span>
            </div>
            
            <div className="summary-row d-flex justify-content-between mb-2">
              <span>Delivery Charges</span>
              <span className="text-success">FREE</span>
            </div>
            
            <hr />
            
            <div className="summary-row d-flex justify-content-between mb-4 fw-bold fs-5">
              <span>Total Amount</span>
              <span>₹{totalPrice}</span>
            </div>

            <Link to="/order" className="btn btn-success w-100 py-2 fw-bold">
              PROCEED TO CHECKOUT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
