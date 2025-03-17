import React from "react";
import "./experimentdetails.css";

const ExperimentDetails: React.FC = () => {

  return (
    <div className="experiment-page-container">
      <div className="experiment-form-container">
        <h1 className="experiment-title">1. Data Preprocessing</h1>

        <button className="experiment-btn">View Manual</button>
        <button className="experiment-btn">Upload Record Template</button>
        <button className="experiment-btn">Upload Video</button>

        <button className="experiment-check-btn">Check</button>
      </div>
    </div>
  );
};

export default ExperimentDetails;
