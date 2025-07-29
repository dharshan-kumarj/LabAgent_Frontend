import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import "../styles/labmanual.css";
import Logo from "../../../public/assets/image/logo.jpeg";

// ✅ Load PDF worker from CDN to fix rendering issues
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const LabManual: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Extract submitted experiments & files
  const submittedExperiments = location.state?.experiments || [];

  // ✅ State to track selected experiment & PDF view
  const [selectedExperiment, setSelectedExperiment] = useState<{ name: string; index: number; file: File | null } | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);

  const handleExperimentClick = (experiment: { name: string; file: File | null }, index: number) => {
    setSelectedExperiment({ name: experiment.name, index, file: experiment.file });
  };

  // ✅ Handle Double Click to Navigate to Detailed View
  const handleDoubleClick = (experiment: { name: string; file: File | null }, index: number) => {
    navigate("/details", {
      state: { experimentName: experiment.name, experimentNumber: index + 1, file: experiment.file },
    });
  };

  return (
    <div className="main-container">
      {/* ✅ Left Panel - Experiment List */}
      <div className="left-panel">
        <img src={Logo} alt="Karunya Logo" className="logo" />
        <h1 className="title">Submitted Experiments</h1>
        <div className="grid-container">
          {submittedExperiments.length > 0 ? (
            submittedExperiments.map((experiment: { name: string; file: File | null }, index: number) => (
              <div
                key={index}
                className={`experiment-box ${selectedExperiment?.index === index ? "selected" : ""}`}
                onClick={() => handleExperimentClick(experiment, index)}
                onDoubleClick={() => handleDoubleClick(experiment, index)}
              >
                <span className="box-number">
                  {index + 1}. {experiment.name || "Untitled Experiment"}
                </span>
              </div>
            ))
          ) : (
            <p>No experiments submitted yet.</p>
          )}
        </div>
      </div>

      {/* ✅ Right Panel - LAB Manual & PDF Viewer */}
      <div className="right-panel">
        <h2 className="lab-manual-title">LAB MANUAL</h2>

        {/* ✅ Experiment Details & PDF Viewer */}
        {selectedExperiment ? (
          <div className="experiment-details">
            <h3>{selectedExperiment.name}</h3>

            {selectedExperiment.file ? (
              <div className="pdf-viewer">
                <Document file={URL.createObjectURL(selectedExperiment.file)} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                  {Array.from(new Array(numPages), (_, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                  ))}
                </Document>
              </div>
            ) : (
              <p>No PDF uploaded for this experiment.</p>
            )}
          </div>
        ) : (
          <p className="placeholder-text">Select an experiment to view details.</p>
        )}

        {/* ✅ Upload Buttons */}
        <div className="upload-btn-container">
          <button className="upload-btn">Upload Video</button>
          <button className="upload-btn">Upload Template</button>
        </div>
      </div>
    </div>
  );
};

export default LabManual;
