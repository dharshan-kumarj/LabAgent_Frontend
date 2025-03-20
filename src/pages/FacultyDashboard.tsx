import React from "react";
import { useNavigate } from "react-router-dom";
import karunyaLogo from "../assets/karunya logo.png"; // Ensure correct path
import sysImage from "../assets/sys.png"; // Ensure correct path

const labsData = [
  { name: "Data Science & Ecosystem", code: "23DC2004", batch: "Batch-2" },
  { name: "Data Structure & Algorithm", code: "23DC2021", batch: "Batch-2" },
  { name: "Python for Programming", code: "23DC2024", batch: "Batch-1" },
  { name: "Machine Learning", code: "23DC2011", batch: "Batch-2" },
];

const LabsAssigned: React.FC = () => {
  const navigate = useNavigate();

  // ✅ Handles Single and Double Click (Navigates to `experiment-upload`)
  const handleLabClick = (lab: { name: string; code: string }) => {
    navigate(`/experiment-upload/${lab.code}`, { state: { labName: lab.name } });
  };

  return (
    <div className="labs-container">
      {/* ✅ Karunya Logo */}
      <img src={karunyaLogo} alt="Karunya Logo" className="logo" />

      <div className="container">
        <div className="left-section">
          <h1 className="title">Labs Assigned to You</h1>

          <div className="labs-list">
            {labsData.map((lab) => (
              <div
                key={lab.code}
                className="lab-card"
                onClick={() => handleLabClick(lab)} // ✅ Single & Double Click → `experiment-upload`
              >
                <div className="lab-info">
                  <span className="lab-name">{lab.name}</span>
                  <div className="lab-details">
                    <span className="lab-code">{lab.code}</span>
                    <span className="lab-batch">{lab.batch}</span>
                  </div>
                </div>

                {/* ✅ Clicking "Progress" Button Navigates to `students` */}
                <button
                  className="progress-button"
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ Prevents parent click (avoids `experiment-upload`)
                    navigate(`/students/${lab.code}`, { state: { labName: lab.name } });
                  }}
                >
                  Progress
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ System Illustration Image */}
        <img src={sysImage} alt="University Illustration" className="logo-2" />
      </div>
    </div>
  );
};

export default LabsAssigned;
