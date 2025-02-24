import React, { useState } from "react";
import "./Experiments.css";

const Experiments: React.FC = () => {
  const [selected, setSelected] = useState<number>(1);

  return (
    <div className="main-container">
      {/* Header with Logo */}
      <div className="header">
        <img src="/karunya logo.png" alt="Karunya Logo" className="logo" />
      </div>

      {/* Experiment Section */}
      <div className="experiment-container">
        <h1 className="title">Experiments</h1>
        <div className="grid-container">
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={i}
              className={`experiment-box ${selected === i + 1 ? "active" : ""}`}
              onClick={() => setSelected(i + 1)}
            >
              <span className="box-number">{i + 1}.</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experiments;
