import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../public/assets/image/loginbg.jpeg"; // ✅ Import background image

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role: string) => {
    if (role === "students") {
      navigate("/StudentLogin");
    } else if (role === "staff") {
      navigate("/FacultyLogin");
    }
  };

  return (
    <div style={containerStyle}>
      {/* ✅ Login Box */}
      <div style={loginBoxStyle}>
        <h1 style={titleStyle}>Lab Agent</h1>
        <p style={subTitleStyle}>Select Your Role to Login</p>

        <button
          style={greenButtonStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
          onClick={() => handleRoleSelection("students")}
        >
          🎓 KITS Students
        </button>

        <button
          style={blueButtonStyle}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}
          onClick={() => handleRoleSelection("staff")}
        >
          👔 Staff & Others
        </button>
      </div>
    </div>
  );
};

// 🔹 Styles
const containerStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100%",
  width: "100%",
  background: `url(${backgroundImage}) center/cover no-repeat`, // ✅ Centered background image
  margin: 0,
  padding: 0,
};

const loginBoxStyle: React.CSSProperties = {
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  padding: "40px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minWidth: "320px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "30px",
  color: "#007BFF",
  marginBottom: "10px",
  fontWeight: "bold",
  letterSpacing: "1px",
};

const subTitleStyle: React.CSSProperties = {
  fontSize: "18px",
  color: "#333",
  marginBottom: "20px",
  fontWeight: "500",
};

const roleButtonStyle: React.CSSProperties = {
  color: "white",
  padding: "12px 20px",
  margin: "10px 0",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "18px",
  width: "260px",
  transition: "all 0.3s ease-in-out",
  fontWeight: "bold",
  boxShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
};

// ✅ Hover Effects
const greenButtonStyle: React.CSSProperties = {
  ...roleButtonStyle,
  backgroundColor: "#28a745",
};

const blueButtonStyle: React.CSSProperties = {
  ...roleButtonStyle,
  backgroundColor: "#007BFF",
};

export default LoginPage;
