import React from "react";
import "./UploadExercise.css";

const UploadExercise: React.FC = () => {
  return (
    <div className="container">
      <h2 className="title">Upload the Experiment</h2>
      <div className="upload-grid">
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="upload-row">
            <span className="number">{i + 1}.</span>
            <button className="upload-btn">Upload</button>
          </div>
        ))}
      </div>
      <button className="save-btn">Save</button>
    </div>
  );
};

export default UploadExercise;
