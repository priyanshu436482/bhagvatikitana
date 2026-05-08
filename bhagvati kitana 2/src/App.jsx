import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./Navbar";
import Filterbar from "./Filterbar";
import ProductsSection from "./ProductsSection";
import ContactUs from "./ContactUs";
import Location from "./Location";
import Order from "./Order";
import Service from "./Service";
import About from "./About";
import Signin from "./Signin";
import Cart from "./Cart";
import ProductDetails from "./ProductDetails";

// Admin Imports
import AdminLogin from "./admin/Login";
import AdminDashboard from "./admin/Dashboard";
import AdminProducts from "./admin/Products";
import AdminOrders from "./admin/Orders";
import AdminCustomers from "./admin/Customers";
import AdminLayout from "./admin/Layout";
import ProtectedRoute from "./admin/ProtectedRoute";
import { AuthProvider } from "./admin/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./app.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ToastContainer position="top-right" autoClose={3000} />
        
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
          </Route>

          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <>
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} cartCount={cartCount} />
                <Filterbar />
                <Routes>
        <Route
          path="/"
          element={<ProductsSection searchTerm={searchTerm} addToCart={addToCart} />}
        />
        <Route path="/order" element={<Order />} />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          }
        />
        <Route
          path="/product/:id"
          element={<ProductDetails addToCart={addToCart} />}
        />
        <Route path="/location" element={<Location />} />
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/signin" element={<Signin />} />
                </Routes>
                <ContactUs />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
