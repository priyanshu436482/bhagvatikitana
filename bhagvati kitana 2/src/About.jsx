import React from "react";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <h2 className="about-title">🏪 About Bhagvati Kirana</h2>

      <div className="about-container">

        <div className="about-card">
          <h3>Who We Are</h3>
          <p>
            Bhagvati Kirana is a trusted local grocery store located in Kadi.
            We provide daily household essentials, groceries, and premium dry fruits
            at affordable prices.
          </p>
        </div>

        <div className="about-card">
          <h3>Our Mission</h3>
          <p>
            Our mission is to deliver quality products with honesty,
            fast service, and customer satisfaction.
          </p>
        </div>

        <div className="about-card">
          <h3>Why Choose Us?</h3>
          <ul>
            <li>✔ Quality Products</li>
            <li>✔ Best Prices</li>
            <li>✔ Friendly Service</li>
            <li>✔ Fast Delivery</li>
          </ul>
        </div>

        <div className="about-card">
          <h3>Serving Area</h3>
          <p>
            We proudly serve customers in Kadi and nearby areas
            with quick home delivery services.
          </p>
        </div>

      </div>
    </div>
  );
}

export default About;
