import React from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "../styles/StudentList.css"; // Ensure this file exists
import karunyaLogo from "../assets/karunya logo.png"; // ✅ Import the logo correctly

// ✅ Generate Student IDs Dynamically (Optimized)
const students = Array(75)
  .fill(0)
  .map((_, i) => `URK23AI10${String(i + 1).padStart(2, "0")}`);

const StudentList: React.FC = () => {
  const { labId } = useParams<{ labId?: string }>(); // ✅ Ensure correct type
  const navigate = useNavigate();
  const location = useLocation(); // ✅ Get location state
  const labName = location.state?.labName || "Unknown Lab"; // ✅ Default value for labName

  return (
    <div className="student-list-container">
      {/* ✅ Display Karunya Logo */}
      <img src={karunyaLogo} alt="Karunya Logo" className="karunya-logo" />

      {/* ✅ Display Lab Name */}
      <h1 className="student-list-title">
        Students for Lab:{" "}
        <span className="lab-name">{labId ? labName : "Unknown Lab"}</span>
      </h1>

      <div className="student-buttons">
        {students.map((studentId) => (
          <button
            key={studentId}
            className="student-button"
            onClick={() => navigate(`/progress/${studentId}`, { state: { labId, labName } })} // ✅ Pass state to keep data
          >
            {studentId}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
