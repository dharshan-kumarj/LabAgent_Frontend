import React from "react";
import "./uploadexercise.css";

const UploadExercise: React.FC = () => {


  return (
    <div className="upload-page-container">
      <div className="upload-form-container">
        <h1 className="upload-form-title">Upload the Exercise</h1>

        <div className="upload-experiment-grid">
          {Array.from({ length: 10 }, (_, index) => (
            <div key={index} className="upload-row">
              <span className="upload-number">{index + 1}.</span>
              <button className="upload-btn">Upload</button>
            </div>
          ))}
        </div>

        <button className="upload-save-button">Save</button>
      </div>
    </div>
  );
};

export default UploadExercise;
