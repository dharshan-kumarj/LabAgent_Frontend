import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaFileUpload, FaList } from "react-icons/fa"; // ✅ Import icons
import "../styles/uploadmanual.css";

const UploadManual: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const labName = location.state?.labName || "Unknown Lab";
  const labCode = location.pathname.split("/").pop(); // Extract lab code from URL

  const [experimentName, setExperimentName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isTextBased, setIsTextBased] = useState(false);
  const [experiments, setExperiments] = useState<string[]>([]); // ✅ Store Experiments

  // ✅ Handle File Selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // ✅ Handle Save Button
  const handleSave = () => {
    if (!experimentName.trim()) {
      alert("Please enter an experiment name.");
      return;
    }

    if (!isTextBased && !selectedFile) {
      alert("Please upload a file or switch to text-based entry.");
      return;
    }

    setExperiments([...experiments, experimentName]); // ✅ Store Experiment
    setExperimentName(""); // ✅ Reset field
    setSelectedFile(null); // ✅ Reset file input
  };

  return (
    <div className="upload-page-container">
      <div className="upload-form-container">
        <h1 className="upload-form-title">{labName} - Upload Experiment</h1>

        {/* ✅ Experiment Name Input */}
        <div className="input-group">
          <label className="input-label">Experiment Name:</label>
          <input
            type="text"
            className="input-field"
            placeholder="Enter experiment name"
            value={experimentName}
            onChange={(e) => setExperimentName(e.target.value)}
          />
        </div>

        {/* ✅ Toggle Between File Upload & Text-Based */}
        <div className="toggle-group">
          <label className="input-label">Experiment Type:</label>
          <div className="toggle-options">
            <button className={`toggle-btn ${isTextBased ? "active" : ""}`} onClick={() => setIsTextBased(true)}>
              Text-Based
            </button>
            <button className={`toggle-btn ${!isTextBased ? "active" : ""}`} onClick={() => setIsTextBased(false)}>
              File Upload
            </button>
          </div>
        </div>

        {/* ✅ Conditional File Upload Input */}
        {!isTextBased && (
          <div className="input-group file-upload">
            <label className="input-label">Upload File:</label>
            <div className="file-upload-box">
              <FaFileUpload className="upload-icon" />
              <input type="file" className="file-input" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
            </div>
            {selectedFile && <p className="file-name">Selected: {selectedFile.name}</p>}
          </div>
        )}

        {/* ✅ Save Button */}
        <button className="upload-save-button" onClick={handleSave}>
          Save Experiment
        </button>
      </div>
    
    </div>
  );
};

export default UploadManual;
