import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "./admin/api/axios";
import "./ProductsSection.css";

function ProductsSection({ searchTerm, addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("Fetching products from:", api.defaults.baseURL + 'products/');
        const response = await api.get('products/');
        console.log("Products received:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
        if (error.response) {
          console.error("Error status:", error.response.status);
          console.error("Error data:", error.response.data);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa-star ${i <= rating ? "fa-solid" : "fa-regular"}`}
          style={{ color: "#ffc107", fontSize: "14px" }}
        ></i>
      );
    }
    return stars;
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="section-title mb-0">Discover Our Products</h2>
        <span className="text-muted">{filteredProducts.length} items found</span>
      </div>

      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => {
            return (
              <div className="product-card" key={item.id}>
                <div className="badge-container">
                  <button className="wishlist-btn">
                    <i className="fa-regular fa-heart"></i>
                  </button>
                </div>
                
                <Link to={`/product/${item.id}`} className="product-image-wrapper">
                  <img src={item.image_url || "./image/logo.png"} alt={item.name} className="product-img" />
                </Link>

                <div className="product-info">
                  <span className="product-category">{item.category}</span>
                  <Link to={`/product/${item.id}`} className="text-decoration-none">
                    <h3 className="product-name">{item.name}</h3>
                  </Link>
                  
                  <div className="product-rating">
                    <div className="stars-wrapper">{renderStars(item.rating || 4)}</div>
                    <span className="rating-count">({item.reviews || 0})</span>
                  </div>

                  <div className="price-wrapper">
                    <span className="new-price">₹{item.price}</span>
                  </div>

                  <div className="card-actions">
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => addToCart(item)}
                    >
                      <i className="fa-solid fa-cart-plus me-2"></i> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-products text-center w-100 py-5">
            <i className="fa-solid fa-magnifying-glass fa-3x mb-3 text-muted"></i>
            <h3>No products found for "{searchTerm}"</h3>
            <p>Try searching for something else!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsSection;
