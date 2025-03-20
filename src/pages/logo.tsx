import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/karunya logo.png"; // Ensure the path is correct

const Logo: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to login after 3 seconds
        const timer = setTimeout(() => {
            navigate("/login");
        }, 3000);

        return () => clearTimeout(timer); // Cleanup timeout on unmount
    }, [navigate]);

    return (
        <div style={styles.container}>
            <img src={logo} alt="Logo" style={styles.logo} />
        </div>
    );
};

// CSS Styles
const styles = {
    container: {
        display: "flex",
        justifyContent: "center",  // Center horizontally
        alignItems: "center",       // Center vertically
        height: "100vh",            // Full viewport height
        width: "100vw",             // Full viewport width
        backgroundColor: "#fff",     // White background
    },
    logo: {
        width: "250px",   // Set a specific width for consistency
        height: "auto",   // Maintain aspect ratio
    },
};

export default Logo;
