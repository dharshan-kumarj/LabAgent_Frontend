import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  const handleRoleSelection = (role: string) => {
    if (role === 'students') {
      navigate('/student-login'); // Redirect to Student Login
    } else if (role === 'staff') {
      navigate('/faculty-login'); // Redirect to Faculty Login
    }
  };

  return (
    <div style={containerStyle}>
      <div style={logoContainerStyle}>
        <img src="\src\assets\karunya logo.png" alt="Karunya Logo" style={logoStyle} />
      </div>
      <h2 style={titleStyle}>Select the role to Login</h2>
      <div style={buttonContainerStyle}>
        <button style={roleButtonStyle} onClick={() => handleRoleSelection('students')}>
          <span style={iconStyle}>🎓</span> KITS Students
        </button>
        <button style={roleButtonStyle} onClick={() => handleRoleSelection('staff')}>
          <span style={iconStyle}>👔</span> Staff & Others
        </button>
      </div>
    </div>
  );
};

// Styles remain the same...
const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  minWidth: '100vw',
  backgroundColor: 'white',
  fontFamily: 'Arial, sans-serif',
};

const logoContainerStyle: React.CSSProperties = {
  marginBottom: '20px',
};

const logoStyle: React.CSSProperties = {
  width: '150px',
};

const titleStyle: React.CSSProperties = {
  margin: '20px 0',
  fontSize: '24px',
  color: 'black',
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const roleButtonStyle: React.CSSProperties = {
  backgroundColor: '#4CAF50',
  color: 'white',
  padding: '10px 20px',
  margin: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const iconStyle: React.CSSProperties = {
  marginRight: '8px',
};

export default LoginPage;
