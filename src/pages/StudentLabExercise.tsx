import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa"; 
import "./studentlabexercise.css"; 

const StudentLabExercise: React.FC = () => {
  const { labCode } = useParams(); 
  const navigate = useNavigate(); 

  const [experiments, setExperiments] = useState<string[]>(Array(10).fill(""));

  const handleChange = (index: number, value: string) => {
    if (index === 0) { 
      const newExperiments = [...experiments];
      newExperiments[index] = value;
      setExperiments(newExperiments);
    }
  };

  const handleNext = () => {
    navigate(`/studentlab/${labCode}/1`); // Navigate to experiment 1
  };

  return (
    <div className="app-container">
      <div className="form-container">
        <h1 className="form-title">Experiments for {labCode}</h1>
        <h2 className="sub-title">No. of Experiments</h2>

        <div className="experiment-grid">
          {experiments.map((_, index) => (
            <div key={index} className="input-group">
              <label htmlFor={`experiment-${index + 1}`} className="input-label">
                Experiment {index + 1}:
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  id={`experiment-${index + 1}`}
                  className={`input-field ${index > 0 ? "locked" : ""}`}
                  value={experiments[index]}
                  onChange={(e) => handleChange(index, e.target.value)}
                  disabled={index > 0} 
                />
                {index > 0 && <FaLock className="lock-icon" />}
              </div>
            </div>
          ))}
        </div>

        <button className="next-button" onClick={handleNext}>Next</button>

        <button className="back-button" onClick={() => navigate("/labs-assigned")}>
          Back
        </button>
      </div>
    </div>
  );
};

export default StudentLabExercise;
