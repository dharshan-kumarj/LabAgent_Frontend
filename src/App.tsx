import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "../src/login";
import Navbar from "./faculty/components/FacultyNavbar";
import StudentLogin from "../src/student/components/StudentLogin";
import FacultyDashboard from "./faculty/pages/facultydashboard";
import StudentDashboard from "./student/pages/studentdashboard";
import FacultyLogin from "../src/faculty/components/FacultyLogin";
import Students from "../src/faculty/components/student";
import LabManual from "../src/faculty/components/labmanual";
import UploadManual from "./faculty/components/uploadmanual";



const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/StudentLogin" element={<StudentLogin />} />
          <Route path="/Facultylogin" element={<FacultyLogin />} />
          <Route path="/facultydashboard" element={<FacultyDashboard />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/labmanual" element={<LabManual />} />
          <Route path="/uploadmanual/:labCode" element={<UploadManual />} />  
        </Routes>
      </div>
    </Router>
  );
};

export default App;
