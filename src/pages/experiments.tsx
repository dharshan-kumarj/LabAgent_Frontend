import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate for navigation
import "./Experiments.css";
import Logo from "../assets/karunya logo.png"; // Corrected import path

const Experiments: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleDoubleClick = (experimentNumber: number) => {
    navigate("/details", { state: { experimentNumber } }); // ✅ Pass data when navigating
  };

  return (
    <div className="main-container">
      {/* Header with Logo */}
      <div className="header">
        <img src={Logo} alt="Karunya Logo" className="logo" />
      </div>

      {/* Experiment Section */}
      <div className="experiment-container">
        <h1 className="title">Experiments</h1>
        <div className="grid-container">
          {Array.from({ length: 10 }, (_, i) => {
            const experimentNumber = i + 1;
            return (
              <div
                key={experimentNumber}
                className={`experiment-box ${selected === experimentNumber ? "active" : ""}`}
                onClick={() =>
                  setSelected((prev) => (prev === experimentNumber ? null : experimentNumber))
                }
                onDoubleClick={() => handleDoubleClick(experimentNumber)} // ✅ Double-tap navigation
                aria-label={`Select experiment ${experimentNumber}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelected(experimentNumber)}
              >
                <span className="box-number">{experimentNumber}.</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Experiments;
