import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // ✅ Eye Icons for Password Toggle
import "../styles/FacultyLogin.css"; // ✅ Login Styles

const FacultyLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ Password Toggle State
  const navigate = useNavigate(); // Hook for Navigation

  // ✅ Login Handler
  const handleLogin = () => {
    if (email.toLowerCase() === "ronnie@karunya.edu.in" && password === "12341234") {
      navigate("/facultydashboard"); // ✅ Redirect to Dashboard
    } else {
      alert("Invalid Credentials! Please try again.");
    }
  };

  return (
    <div className="login-container">
      {/* ✅ Background Overlay */}
      <div className="background-overlay"></div>

      {/* ✅ Login Card */}
      <div className="login-card">
        <h1 className="login-title">Faculty Portal</h1>

        {/* Email Input */}
        <input
          type="email"
          className="input-box"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input with Toggle */}
        <div className="password-container">
          <input
            type={showPassword ? "text" : "password"}
            className="input-box password-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* ✅ Password Toggle Button */}
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* Submit Button */}
        <button className="submit-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default FacultyLogin;
