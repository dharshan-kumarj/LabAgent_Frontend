import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logo from "./pages/logo";
import Login from "./pages/login";
import FacultyLogin from "./pages/FacultyLogin";
import StudentLogin from "./pages/StudentLogin";
import LabsAssigned from "./pages/LabsAssigned";
import FacultyDashboard from "./pages/FacultyDashboard";
import ExperimentUpload from "./pages/experimentupload";
import UploadExercise from "./pages/uploadexercise";
import Experiment from "./pages/experiments";
import ExperimentDetails from "./pages/experimentdetails";
import LabDetails from "./pages/labdetails";
import StudentLabExercise from "./pages/StudentLabExercise";
import StudentList from "./pages/Studentlist";  
import ExerciseProgress from "./pages/ExerciseProgress"; 

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Logo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/faculty-login" element={<FacultyLogin />} />
                <Route path="/student-login" element={<StudentLogin />} />
                <Route path="/labs-assigned" element={<LabsAssigned />} />
                <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
                <Route path="/experiment-upload/:labCode" element={<ExperimentUpload />} />
                <Route path="/upload-exercise" element={<UploadExercise />} />
                <Route path="/experiments" element={<Experiment />} />
                <Route path="/details" element={<ExperimentDetails />} />
                <Route path="/record" element={<LabDetails />} />
                <Route path="/student-lab/:labCode" element={<StudentLabExercise />} />
                <Route path="/students/:labCode" element={<StudentList />} />
                <Route path="/progress/:studentId" element={<ExerciseProgress />} />
            </Routes>
        </Router>
    );
};

export default App;
