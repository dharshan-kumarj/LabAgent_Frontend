import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import "../styles/studentlabexercise.css";

const StudentLabExercise: React.FC = () => {
  const { labCode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Extracting lab name from state
  const labName = location.state?.labName || "Unknown Lab";

  const [selectedExperiment, setSelectedExperiment] = useState<number | null>(null);

  const handleSelect = (index: number) => {
    if (index === 0) {
      setSelectedExperiment(index);
    }
  };

  const handleNext = () => {
    if (selectedExperiment !== null) {
      navigate(`/student-lab/${labCode}/${selectedExperiment + 1}`); // ✅ Navigates to Studentlab.tsx
    }
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1 className="form-title">{labName}</h1>
        <h2 className="sub-title">No. of Experiments</h2>

        <div className="experiment-grid">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className={`experiment-card ${selectedExperiment === index ? "selected" : ""} ${index > 0 ? "locked" : ""}`}
              onClick={() => handleSelect(index)}
            >
              <span>Experiment {index + 1}</span>
              {index > 0 && <FaLock className="lock-icon" />}
            </div>
          ))}
        </div>

        <button className="next-button" onClick={handleNext} disabled={selectedExperiment === null}>
          Next
        </button>

        <button className="back-button" onClick={() => navigate("/labs-assigned")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default StudentLabExercise;
