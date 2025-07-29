import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/facultydashboard.css";

const labsData = [
  { name: "Data Science & Ecosystem", code: "23DC2004", batch: "Batch-2" },
  { name: "Data Structure & Algorithm", code: "23DC2021", batch: "Batch-2" },
  { name: "Python for Programming", code: "23DC2024", batch: "Batch-1" },
  { name: "Machine Learning", code: "23DC2011", batch: "Batch-2" },
];

const FacultyDashboard: React.FC = () => {
  const navigate = useNavigate();

  // ✅ Handles Card Click (Redirects to Upload Page)
  const handleLabClick = (lab: { name: string; code: string }) => {
    navigate(`/uploadmanual/${lab.code}`, { state: { labName: lab.name } });
  };

  return (
    <div className="labs-container">
      <div className="container">
        <div className="left-section">
          <h1 className="title">Labs Assigned to You</h1>

          <div className="labs-list">
            {labsData.map((lab) => (
              <div
                key={lab.code}
                className="lab-card"
                onClick={() => handleLabClick(lab)}
              >
                <div className="lab-info">
                  <span className="lab-name">{lab.name}</span>
                  <div className="lab-details">
                    <span className="lab-code">{lab.code}</span>
                    <span className="lab-batch">{lab.batch}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
