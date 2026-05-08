import React from "react";
import "./Order.css";


function Order() {
  return (
    <div className="order-page">
      <h2 className="order-title">🛒 Your Order</h2>

      <div className="order-container">

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>

          <div className="order-item">
            <span>Ariel Power Gel</span>
            <span>₹899</span>
          </div>

          <div className="order-item">
            <span>Almonds</span>
            <span>₹1599</span>
          </div>

          <hr />

          <div className="order-total">
            <strong>Total:</strong>
            <strong>₹2498</strong>
          </div>
        </div>

        {/* Customer Form */}
        <div className="order-form">
          <h3>Customer Details</h3>

          <input type="text" placeholder="Full Name" />
          <input type="text" placeholder="Mobile Number" />
          <textarea placeholder="Delivery Address"></textarea>

          <button className="order-btn">Place Order</button>
        </div>

      </div>
      
    </div>
  );
}




export default Order;
