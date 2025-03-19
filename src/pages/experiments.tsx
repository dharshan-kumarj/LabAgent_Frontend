import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Experiments.css";
import Logo from "../assets/karunya logo.png"; 

const Experiments: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Receive submitted experiments & files
  const submittedExperiments = location.state?.experiments || [];
  const submittedFiles = location.state?.files || [];

  const handleDoubleClick = (experimentName: string, index: number) => {
    navigate("/details", { state: { experimentName, experimentNumber: index + 1, file: submittedFiles[index] } });
  };

  return (
    <div className="main-container">
      <div className="header">
        <img src={Logo} alt="Karunya Logo" className="logo" />
      </div>

      <div className="experiment-container">
        <h1 className="title">Submitted Experiments</h1>

        <div className="grid-container">
          {submittedExperiments.length > 0 ? (
            submittedExperiments.map((name: string, index: number) => (
              <div
                key={index}
                className="experiment-box"
                onDoubleClick={() => handleDoubleClick(name, index)}
              >
                <span className="box-number">{index + 1}. {name || "Untitled Experiment"}</span>
              </div>
            ))
          ) : (
            <p>No experiments submitted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Experiments;
