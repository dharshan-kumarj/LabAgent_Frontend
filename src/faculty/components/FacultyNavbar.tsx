import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // ✅ Import User Icon
import "bootstrap/dist/css/bootstrap.min.css";
import karunyaLogo from "../../../public/assets/image/logo.jpeg"; // ✅ Import logo
import "../styles/navbar.css";

const Navbar: React.FC = () => {
  const location = useLocation();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Fetch user data from localStorage (if available)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // ✅ Hide Navbar for Student Login Page
  const hiddenPaths = ["/StudentLogin", "/studentdashboard"];
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        {/* ✅ Logo on the Left */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img src={karunyaLogo} alt="Karunya Logo" className="logo me-2" />
          <span className="brand-name">LabAgent</span>
        </Link>

        {/* ✅ Mobile Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ✅ Navbar Items */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/facultydashboard">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/students">
                Students
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/experiments">
                Experiments
              </Link>
            </li>
            {/* ✅ User Authentication */}
            <li className="nav-item">
              {user ? (
                <span className="nav-link user-name">{user}</span>
              ) : (
                <Link className="nav-link login-icon" to="/login">
                  <FaUserCircle size={24} />
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
