import React from "react";
import "./Service.css";

function Service() {
  return (
    <div className="service-page">
      <h2 className="service-title">🛠️ Our Services</h2>

      <div className="service-container">

        <div className="service-card">
          <h3>🏠 Home Delivery</h3>
          <p>Fast and reliable home delivery in Kadi area.</p>
        </div>

        <div className="service-card">
          <h3>📦 Bulk Orders</h3>
          <p>Special rates on bulk and monthly grocery orders.</p>
        </div>

        <div className="service-card">
          <h3>📱 Phone / WhatsApp Orders</h3>
          <p>Order easily by calling or messaging us anytime.</p>
        </div>

        <div className="service-card">
          <h3>💳 Online Payment</h3>
          <p>We accept UPI, cash, and digital payments.</p>
        </div>

        <div className="service-card">
          <h3>🥜 Fresh Dry Fruits</h3>
          <p>Premium quality dry fruits at best prices.</p>
        </div>

        <div className="service-card">
          <h3>🕒 Same-Day Delivery</h3>
          <p>Get your groceries delivered on the same day.</p>
        </div>

      </div>
    </div>
  );
}

export default Service;
