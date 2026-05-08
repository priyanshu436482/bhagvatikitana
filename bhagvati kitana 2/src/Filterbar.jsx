import React from "react";
import { Link } from "react-router-dom";
import "./Filterbar.css";

function Filterbar() {
  return (
    <div className="filter-container">
      <div className="filter-bar">

        <Link to="/" className="filter-btn">🏠 Home</Link>

        <Link to="/location" className="filter-btn">📍 Location</Link>

        <Link to="/service" className="filter-btn">Service</Link>

        <Link to="/about" className="filter-btn">About </Link>

      </div>
    </div>
  );
}

export default Filterbar;
