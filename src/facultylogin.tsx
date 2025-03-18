import React, { useRef } from "react";
import "./facultylogin.css";

const FacultyLogin: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>, nextRef: React.RefObject<HTMLInputElement | HTMLButtonElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nextRef.current?.focus();
    }
  };

  return (
    <div className="login-container">
      {/* Logo */}
      <div className="logo-container">
        <img src="/images/karunya_logo.png" alt="Karunya Logo" className="logo" />
      </div>

      {/* Login Form */}
      <div className="login-form">
        <h1 className="login-title">Login to Staff & Others portal</h1>

        <input
          type="email"
          className="input-box"
          placeholder="Enter your Email"
          ref={emailRef}
          onKeyDown={(e) => handleKeyPress(e, passwordRef)}
        />
        
        <input
          type="password"
          className="input-box"
          placeholder="Password"
          ref={passwordRef}
          onKeyDown={(e) => handleKeyPress(e, submitRef)}
        />

        <button className="submit-button" ref={submitRef}>Submit</button>
      </div>
    </div>
  );
};

export default FacultyLogin;
