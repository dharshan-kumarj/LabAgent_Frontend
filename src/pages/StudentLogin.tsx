import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FacultyLogin.css";

const StudentLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "thirupathis@karunya.edu.in" && password === "04052004") {
      navigate("/labs-assigned"); // Redirect to LabsAssigned on success
    } else {
      alert("Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="login-container">
      {/* Logo */}
      <div className="logo-container">
        <img src="/src/assets/karunya logo.png" alt="Karunya Logo" className="logo" />
      </div>

      {/* Login Form */}
      <div className="login-form">
        <h1 className="login-title">Login to Student & Others Portal</h1>

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

export default StudentLogin;
