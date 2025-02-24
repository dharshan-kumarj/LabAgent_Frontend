import React from 'react';

const LoginPage: React.FC = () => {
  const handleRoleSelection = (role: string) => {
    console.log(`Selected Role: ${role}`);
    // Handle role selection logic (navigate to the respective page, etc.)
  };

  return (
    <body>
        <div style={containerStyle}>
      <div style={logoContainerStyle}>
        <img src="\src\assets\images\karunya logo.png" alt="Karunya Logo" style={logoStyle}/>
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
    </body>
   
  );
};

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  minWidth:'100vw',
  backgroundColor: 'white',
  fontFamily: 'Arial, sans-serif',
};

const logoContainerStyle: React.CSSProperties = {
  marginBottom: '20px',
};

const logoStyle: React.CSSProperties = {
  width: '150px', // Adjust size as needed
};

const titleStyle: React.CSSProperties = {
  margin: '20px 0',
  fontSize: '24px',
  color:'black',
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const roleButtonStyle: React.CSSProperties = {
  backgroundColor: '#4CAF50', // Green color
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
