import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import "./experimentupload.css";

const DataScienceForm: React.FC = () => {
  const { labCode } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const labName = location.state?.labName || "Unknown Lab";

  const [experiments, setExperiments] = useState<string[]>(Array(10).fill(""));
  const [files, setFiles] = useState<(File | null)[]>(Array(10).fill(null));

  const handleChange = (index: number, value: string) => {
    const newExperiments = [...experiments];
    newExperiments[index] = value;
    setExperiments(newExperiments);
  };

  const handleFileUpload = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newFiles = [...files];
      newFiles[index] = event.target.files[0];
      setFiles(newFiles);
    }
  };

  const handleSubmit = () => {
    console.log("Experiments:", experiments);
    console.log("Files:", files);

    // Navigate to Experiments page and pass data
    navigate("/experiments", { state: { experiments, files } });
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
                className="input-field"
                placeholder={`${index + 1}. Experiment Name`}
                value={experiments[index]}
                onChange={(e) => handleChange(index, e.target.value)}
              />

              {/* Hidden File Input */}
              <input
                type="file"
                id={`file-upload-${index}`}
                className="file-upload"
                onChange={(e) => handleFileUpload(index, e)}
                style={{ display: "none" }} // Hide default input
              />

              {/* Custom File Upload Label */}
              <label htmlFor={`file-upload-${index}`} className="custom-file-label">
                Upload
              </label>
            </div>
          ))}
        </div>

        <div className="buttons">
          <button className="submit-button" onClick={handleSubmit}>
            Submit
          </button>
        </div>

        <button className="back-button" onClick={() => navigate(-1)}>Back</button>
      </div>
    </div>
  );
};

export default DataScienceForm;
