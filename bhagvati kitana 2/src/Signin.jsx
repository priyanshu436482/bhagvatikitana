import React, { useState } from "react";
import "./Signin.css";

function Signin() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="signin-page">
      <div className="signin-card">
        <h2>🔐 Sign In</h2>

        <form>
          <input
            type="email"
            placeholder="Email Address"
            required
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button type="submit" className="signin-btn">
            Login
          </button>
        </form>

        <p className="signup-text">
          Don't have an account? <span>Register</span>
        </p>
      </div>
    </div>
  );
}

export default Signin;

