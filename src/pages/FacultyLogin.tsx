import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyLogin.css";
import karunyaLogo from "../assets/karunya logo.png"; // ✅ Corrected asset import

const FacultyLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = () => {
    if (email.toLowerCase() === "ronnie@karunya.edu.in" && password === "12341234") {
      navigate("/faculty-dashboard"); // ✅ Redirect to faculty dashboard
    } else {
      alert("Invalid Credentials! Please try again.");
    }
  };

  return (
    <div className="login-container">
      {/* Logo */}
      <div className="logo-container">
        <img src={karunyaLogo} alt="Karunya Logo" className="logo" />
      </div>

      {/* Login Form */}
      <div className="login-form">
        <h1 className="login-title">Login to Staff & Others portal</h1>

        <input
          type="email"
          className="input-box"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="input-box"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="submit-button" onClick={handleLogin}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default FacultyLogin;
