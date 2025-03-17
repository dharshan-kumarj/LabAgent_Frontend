import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./experimentupload.css";

const DataScienceForm: React.FC = () => {
  const [experiments, setExperiments] = useState<string[]>(Array(10).fill(""));
  const navigate = useNavigate(); // Hook for navigation

  const handleChange = (index: number, value: string) => {
    const newExperiments = [...experiments];
    newExperiments[index] = value;
    setExperiments(newExperiments);
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h1 className="form-title">Data Science & Ecosystem</h1>
        <h2 className="sub-title">No. of Experiments</h2>

        <div className="experiment-grid">
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="input-group">
              <input
                type="text"
                id={`experiment-${index + 1}`}
                className="input-field"
                placeholder={`${index + 1}.`}
                value={experiments[index]}
                onChange={(e) => handleChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>

        <div className="buttons">
          <button className="submit-button">Submit</button>
          <button className="upload-button" onClick={() => navigate("/upload")}>
            Upload
          </button>
        </div>

        <button className="back-button">Back</button>
      </div>
    </div>
  );
};

export default DataScienceForm;
