import React, { useState } from "react";
import "./labdetails.css";

const LabDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"record" | "video">("record");

  return (
    <div className="container">
      <div className="header">
      <img src="/src/assets/images/karunya logo.png" alt="Karunya Logo" className="logo" />
      </div>

      <div className="tab-container">
        <div
          className={`tab ${activeTab === "record" ? "active" : ""}`}
          onClick={() => setActiveTab("record")}
        >
          Record
        </div>
        <div
          className={`tab ${activeTab === "video" ? "active" : ""}`}
          onClick={() => setActiveTab("video")}
        >
          Video
        </div>
      </div>

      <div className="content">
        {activeTab === "record" ? (
          <div className="document-preview">
            <img src="/src/assets/images/record.png" alt="Document Preview" />
          </div>
        ) : (
          <div className="video-preview">
            <video controls>
              <source src="/sample-video.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>

      <button className="submit-btn">Submit</button>
    </div>
  );
};

export default LabDetails;
