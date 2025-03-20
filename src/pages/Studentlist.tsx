import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../styles/StudentList.css"; // Ensure this file exists
import karunyaLogo from "../assets/karunya logo.png"; // ✅ Import the logo correctly

// Generate student IDs dynamically
const students = Array.from({ length: 75 }, (_, i) => `URK23AI10${String(i + 1).padStart(2, "0")}`);

const StudentList: React.FC = () => {
  const { labId } = useParams<{ labId?: string }>(); // ✅ Ensure labId is correctly typed
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get location state
  const labName = location.state?.labName || "N/A"; // ✅ Extract labName from state

  return (
    <div className="student-list-container">
      {/* ✅ Added the Karunya Logo */}
      <img src={karunyaLogo} alt="Karunya Logo" className="karunya-logo" />

      {/* ✅ Show Lab Name */}
      <h1 className="student-list-title">
        Students for Lab: <span className="lab-name">{labName}</span> 
      </h1>

      <div className="student-buttons">
        {students.map((studentId) => (
          <button 
            key={studentId} 
            className="student-button"
            onClick={() => navigate(`/progress/${studentId}`)}
          >
            {studentId}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
