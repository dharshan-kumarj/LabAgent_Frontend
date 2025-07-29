import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/student.css"; // ✅ Import custom styles

// ✅ Sample Student Data
const studentsData = [
  { name: "John Doe", id: "23ST001", progress: 80 },
  { name: "Jane Smith", id: "23ST002", progress: 60 },
  { name: "Michael Brown", id: "23ST003", progress: 90 },
  { name: "Emily Johnson", id: "23ST004", progress: 50 },
  { name: "Daniel Wilson", id: "23ST005", progress: 70 },
];

const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Filter students based on search
  const filteredStudents = studentsData.filter((student) =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="students-container">
      {/* ✅ Page Title */}
      <h2 className="title">Students List & Progress</h2>

      {/* ✅ Search Bar */}
      <input
        type="text"
        className="search-bar"
        placeholder="Search student..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* ✅ Students Table */}
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Student ID</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.id}</td>
                <td>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: `${student.progress}%` }}
                    >
                      {student.progress}%
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
