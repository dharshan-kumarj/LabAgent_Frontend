import React from "react";
import "./experimentdetails.css";

const ExperimentDetails: React.FC = () => {
  return (
    <div className="container">
      <h2 className="title">1. Data Preprocessing</h2>
      <button className="button">View Manual</button>
      <button className="button">Upload Record Template</button>
      <button className="button">Upload Video</button>
      <button className="check-button">Check</button>
    </div>
  );
};

export default ExperimentDetails;
