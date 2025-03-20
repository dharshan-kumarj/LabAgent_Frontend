import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LabsAssigned.css";

// Importing assets
import karunyaLogo from "../assets/karunya logo.png";
import sysImage from "../assets/download.png";

// Lab Data
const labsData = [
  { name: "Data Science & Ecosystem", code: "23DC2004", batch: "Batch-2" },
  { name: "Data Structure & Algorithm", code: "23DC2021", batch: "Batch-2" },
  { name: "Python for Programming", code: "23DC2024", batch: "Batch-1" },
  { name: "Machine Learning", code: "23DC2011", batch: "Batch-2" },
];

const FacultyDashboard: React.FC = () => {
  const navigate = useNavigate(); // React Router navigation hook

  const handleLabSelect = (labCode: string, labName: string) => {
    navigate(`/student-lab/${labCode}`, { state: { labName } }); // ✅ Passing labName in state
  };

  return (
    <div className="labs-container">
      {/* Logo (Top Left) */}
      <img src={karunyaLogo} alt="Karunya Logo" className="logo" />

      <div className="container">
        {/* Left Section */}
        <div className="left-section">
          <h1 className="title">No of Labs Assigned for You</h1>

          {/* Lab List */}
          <div className="labs-list">
            {labsData.map((lab) => (
              <div
                key={lab.code}
                className="lab-card"
                onClick={() => handleLabSelect(lab.code, lab.name)}
                role="button"
                tabIndex={0}
                onKeyPress={(e) => e.key === "Enter" && handleLabSelect(lab.code, lab.name)}
              >
                <span className="lab-name">{lab.name}</span>
                <div className="lab-details">
                  <span className="lab-code">{lab.code}</span>
                  <span className="lab-batch">{lab.batch}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section - Illustration */}
        <img src={sysImage} alt="University Illustration" className="logo-2" />
      </div>
    </div>
  );
};

export default FacultyDashboard;
