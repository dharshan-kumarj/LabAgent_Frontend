import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LabsAssigned.css";
import karunyaLogo from "../assets/karunya logo.png";
import sysImage from "../assets/sys.png";

const labsData = [
  { name: "Data Science & Ecosystem", code: "23DC2004", batch: "Batch-2" },
  { name: "Data Structure & Algorithm", code: "23DC2021", batch: "Batch-2" },
  { name: "Python for Programming", code: "23DC2024", batch: "Batch-1" },
  { name: "Machine Learning", code: "23DC2011", batch: "Batch-2" },
];

const FacultyDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="labs-container">
      <img src={karunyaLogo} alt="Karunya Logo" className="logo" />

      <div className="container">
        <div className="left-section">
          <h1 className="title">No of Labs Assigned for You</h1>

          <div className="labs-list">
            {labsData.map((lab) => (
              <div key={lab.code} className="lab-card">
                <div
                  className="lab-info"
                  onClick={() =>
                    navigate(`/experiment-upload/${lab.code}`, {
                      state: { labName: lab.name }, // ✅ Pass lab name in state
                    })
                  }
                  style={{ cursor: "pointer" }}
                >
                  <span className="lab-name">{lab.name}</span>
                  <div className="lab-details">
                    <span className="lab-code">{lab.code}</span>
                    <span className="lab-batch">{lab.batch}</span>
                  </div>
                </div>

                {/* Progress Button */}
                <button
                  className="progress-button"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the lab card click
                    navigate(`/progress/${lab.code}`);
                  }}
                >
                  Progress
                </button>
              </div>
            ))}
          </div>
        </div>

        <img src={sysImage} alt="University Illustration" className="logo-2" />
      </div>
    </div>
  );
};

export default FacultyDashboard;
