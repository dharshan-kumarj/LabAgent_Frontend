import React, { useState } from 'react';
import './experimentupload.css';

const DataScienceForm: React.FC = () => {
  const [experiments, setExperiments] = useState<string[]>(Array(10).fill(''));

  const handleChange = (index: number, value: string) => {
    const newExperiments = [...experiments];
    newExperiments[index] = value;
    setExperiments(newExperiments);
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Data Science & Ecosystem </h1>
      <h2 className="sub-title">No. of. Experiments</h2>

      {/* Wrap input fields inside the grid */}
      <div className="experiment-grid">
        {Array.from({ length: 10 }, (_, index) => (
          <div key={index} className="input-group">
            <label htmlFor={`experiment-${index + 1}`} className="input-label">Experiment {index + 1}:</label>
            <input
              type="text"
              id={`experiment-${index + 1}`}
              className="input-field"
              value={experiments[index]}
              onChange={(e) => handleChange(index, e.target.value)}
            />
          </div>
        ))}
      </div>

      <div className="buttons">
        <button className="submit-button">Submit</button>
        <button className="upload-button">Upload</button>
      </div>

      <button className="back-button">Back</button>
    </div>
  );
};

export default DataScienceForm;
