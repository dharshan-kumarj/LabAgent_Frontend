import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import karunyaLogo from "../assets/karunya logo.png"; // Fixed filename
import sysImage from "../assets/sys.png";

const labsData = [
  { name: "Data Science & Ecosystem", code: "23DC2004", batch: "Batch-2" },
  { name: "Data Structure & Algorithm", code: "23DC2021", batch: "Batch-2" },
  { name: "Python for Programming", code: "23DC2024", batch: "Batch-1" },
  { name: "Machine Learning", code: "23DC2011", batch: "Batch-2" },
];

const LabsAssigned: React.FC = () => {
  const navigate = useNavigate();

  const handleLabClick = (lab: { name: string; code: string }) => {
    navigate(`/experiment-upload/${lab.code}`, { state: { labName: lab.name } }); // ✅ Always go to experiment-upload
  };

  return (
    <div className="labs-container">
      <img src={karunyaLogo} alt="Karunya Logo" className="logo" />
      <div className="container">
        <div className="left-section">
          <h1 className="title">Labs Assigned to You</h1>

          <div className="labs-list">
            {labsData.map((lab) => (
              <div
                key={lab.code}
                className="lab-card"
                onClick={() => handleLabClick(lab)} // ✅ Single & Double tap go to experiment-upload
              >
                <div className="lab-info">
                  <span className="lab-name">{lab.name}</span>
                  <div className="lab-details">
                    <span className="lab-code">{lab.code}</span>
                    <span className="lab-batch">{lab.batch}</span>
                  </div>
                </div>

                {/* ✅ Only Clicking the Progress Button Navigates to Student List */}
                <button
                  className="progress-button"
                  onClick={(e) => {
                    e.stopPropagation(); // ✅ Prevents triggering experiment-upload
                    navigate(`/students/${lab.code}`, { state: { labName: lab.name } });
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

export default LabsAssigned;
