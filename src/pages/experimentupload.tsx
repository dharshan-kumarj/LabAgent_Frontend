import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./experimentupload.css";

const DataScienceForm: React.FC = () => {
  const { labCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const labName = location.state?.labName || "Unknown Lab";

  const [experiments, setExperiments] = useState<string[]>(Array(10).fill(""));

  const handleChange = (index: number, value: string) => {
    const newExperiments = [...experiments];
    newExperiments[index] = value;
    setExperiments(newExperiments);
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h1 className="form-title">{labName}</h1>
        <h2 className="sub-title">Lab Code: {labCode}</h2>
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
          <button className="submit-button" onClick={() => navigate("/experiments")}>
            Submit
          </button>
          <button className="upload-button" onClick={() => navigate("/upload-exercise")}>
            Upload
          </button>
        </div>

        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default DataScienceForm;
