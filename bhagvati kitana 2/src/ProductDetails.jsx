import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "./admin/api/axios";
import "./ProductDetails.css";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="container py-5 text-center"><h2>Loading...</h2></div>;
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
        <Link to="/" className="btn btn-success mt-3">Back to Products</Link>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`fa-star ${i <= rating ? "fa-solid" : "fa-regular"}`}
          style={{ color: "#ffc107" }}
        ></i>
      );
    }
    return stars;
  };

  return (
    <div className="product-details-container container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/">{product.category}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="product-image-large p-4 text-center">
            <img src={product.image_url || "../image/logo.png"} alt={product.name} className="img-fluid" />
          </div>
        </div>

        <div className="col-md-6">
          <div className="product-info-detailed">
            <span className="badge bg-success mb-2">{product.category}</span>
            <h1 className="product-title mb-3">{product.name}</h1>
            
            <div className="rating-summary mb-3 d-flex align-items-center">
              <div className="stars me-2">{renderStars(product.rating || 4)}</div>
              <span className="text-muted">({product.reviews || 0} Customer Reviews)</span>
            </div>

            <div className="price-section mb-4">
              <span className="display-5 fw-bold text-success me-3">₹{product.price}</span>
            </div>

            <p className="product-description mb-4">
              {product.description}
            </p>

            <div className="stock-status mb-4">
              <span className={`fw-bold ${product.stock > 0 ? "text-success" : "text-danger"}`}>
                <i className={`fa-solid ${product.stock > 0 ? "fa-circle-check" : "fa-circle-xmark"} me-2`}></i>
                {product.stock > 0 ? `In Stock (${product.stock} units left)` : "Out of Stock"}
              </span>
            </div>

            <div className="purchase-actions d-flex align-items-center gap-3 mb-4">
              <div className="quantity-selector d-flex align-items-center border rounded">
                <button 
                  className="btn btn-link text-dark text-decoration-none px-3"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <i className="fa-solid fa-minus"></i>
                </button>
                <span className="px-3 fw-bold">{quantity}</span>
                <button 
                  className="btn btn-link text-dark text-decoration-none px-3"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <i className="fa-solid fa-plus"></i>
                </button>
              </div>

              <button 
                className="btn btn-success flex-grow-1 py-2 fw-bold"
                onClick={() => {
                  for(let i=0; i<quantity; i++) addToCart(product);
                }}
                disabled={product.stock === 0}
              >
                <i className="fa-solid fa-cart-plus me-2"></i> ADD TO CART
              </button>
              
              <button className="btn btn-outline-success p-2">
                <i className="fa-regular fa-heart fa-lg"></i>
              </button>
            </div>

            <div className="delivery-info border-top pt-4">
              <div className="d-flex align-items-center mb-2">
                <i className="fa-solid fa-truck-fast text-muted me-3"></i>
                <span>Free delivery on orders over ₹499</span>
              </div>
              <div className="d-flex align-items-center">
                <i className="fa-solid fa-rotate-left text-muted me-3"></i>
                <span>7 Days Replacement Policy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
