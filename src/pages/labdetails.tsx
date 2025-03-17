import React, { useState } from "react";
import "./labdetails.css";

const LabDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState("record");

  return (
    <div className="lab-container">
      {/* Tabs Section */}
      <div className="lab-tabs">
        <div
          className={`lab-tab ${activeTab === "record" ? "active" : ""}`}
          onClick={() => setActiveTab("record")}
        >
          Record
        </div>
        <div
          className={`lab-tab ${activeTab === "video" ? "active" : ""}`}
          onClick={() => setActiveTab("video")}
        >
          Video
        </div>
      </div>

      {/* Content Section */}
      <div className="lab-content">
        {activeTab === "record" ? (
          <div className="document-view">
            <img src="/document.png" alt="Record Document" className="document-image" />
          </div>
        ) : (
          <div className="video-view">
            <video controls className="video-player">
              <source src="/sample-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button className="lab-submit-button">Submit</button>
    </div>
  );
};

export default LabDetails;