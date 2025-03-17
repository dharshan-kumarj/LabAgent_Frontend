import React from 'react';
import logo from '../assets/karunya logo.png'; // Replace with the correct path to your logo

const Logo: React.FC = () => {
    return (
        <body>
        <div style={styles.container}>
            <img src={logo} alt="Logo" style={styles.logo} />
        </div>
        </body>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#fff', // White background
        width:'100%',
    },
    logo: {
        maxWidth: '100%',
        height: 'auto',
    },
};

export default Logo;
