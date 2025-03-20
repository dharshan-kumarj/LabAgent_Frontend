import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import "../styles/experimentdetails.css";

const ExperimentDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Initialize navigation
  const experimentNumber = location.state?.experimentNumber || "Unknown"; // ✅ Get experiment number

  const handleUploadClick = (tab: "record" | "video") => {
    navigate("/record", { state: { activeTab: tab, experimentNumber } }); // ✅ Pass active tab
  };

  return (
    <div className="experiment-page-container">
      <div className="experiment-form-container">
        <h1 className="experiment-title">{experimentNumber}. Experiment Details</h1>

        <button className="experiment-btn">View Manual</button>
        <button className="experiment-btn" onClick={() => handleUploadClick("record")}>
          Upload Record Template
        </button>
        <button className="experiment-btn" onClick={() => handleUploadClick("video")}>
          Upload Video
        </button>

        <button className="experiment-check-btn">Check</button>
      </div>
    </div>
  );
};

export default ExperimentDetails;
