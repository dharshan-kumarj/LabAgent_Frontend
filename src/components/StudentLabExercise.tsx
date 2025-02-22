import React, { useState } from "react";
import "../styles/studentlabexercise.css"; // Fixed import path
import { FaLock } from "react-icons/fa"; // Import lock icon

const DataScienceForm: React.FC = () => {
  const [experiments, setExperiments] = useState<string[]>(Array(10).fill(""));
  
  const handleChange = (index: number, value: string) => {
    if (index === 0) { // Only allow changes for the first experiment
      const newExperiments = [...experiments];
      newExperiments[index] = value;
      setExperiments(newExperiments);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Data Science & Ecosystem</h1>
      <h2 className="sub-title">No. of Experiments</h2>

      <div className="experiment-grid">
        {Array.from({ length: 10 }, (_, index) => (
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
                disabled={index > 0} // Lock all except the first experiment
              />
              {index > 0 && <FaLock className="lock-icon" />} {/* Show lock icon */}
            </div>
          </div>
        ))}
      </div>

      <button className="next-button">Next</button>
      <button className="back-button">Back</button>
    </div>
  );
};

export default DataScienceForm;
