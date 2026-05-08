import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";




function Navbar({ searchTerm, setSearchTerm, cartCount }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark  px-3">
      <div className="container-fluid">

        {/* Logo */}
        <Link className="navbar-brand fw-bold text-white wh-75" to="/">
          <img src="./image/logo.png" alt="Logo" />
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navbarContent">

          {/* Search */}
          <form className="d-flex mx-lg-auto my-3 my-lg-0 navbar-search" onSubmit={(e) => e.preventDefault()}>
            <input
              className="form-control"
              type="search"
              placeholder="Search in our Store"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>

          {/* Right buttons */}
          <div className="d-flex align-items-center gap-3 text-white navbar-actions">
            <Link to="/cart" className="btn btn-light position-relative cart-btn">
              <i className="fa-solid fa-cart-shopping"></i>
              {cartCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link to="/signin" className="btn btn-outline-light">
              Sign In
            </Link>
            
            <Link to="/admin/login" className="btn btn-warning">
              Admin Login
            </Link>
          </div>


        </div>
      </div>
    </nav>
  );
}

export default Navbar;
