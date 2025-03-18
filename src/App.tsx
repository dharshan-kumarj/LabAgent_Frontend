import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Logo from './pages/logo';
import Login from './pages/login';
import FacultyLogin from './pages/FacultyLogin';
import StudentLogin from './pages/StudentLogin';
import LabsAssigned from './pages/LabsAssigned';
import FacultyDashboard from './pages/FacultyDashboard';
import ExperimentUpload from './pages/experimentupload';
import UploadExercise from './pages/uploadexercise';
import Experiment from './pages/experiments';
import ExperimentDetails from './pages/experimentdetails';
import LabDetails from './pages/labdetails';
import StudentLabExercise from './pages/StudentLabExercise';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate replace to="/login" />} />
                <Route path="/logo" element={<Logo />} />
                <Route path="/login" element={<Login />} />
                <Route path="/faculty-login" element={<FacultyLogin />} />
                <Route path="/student-login" element={<StudentLogin />} />
                <Route path="/labs-assigned" element={<LabsAssigned />} />
                <Route path="/faculty-dashboard" element={<FacultyDashboard />} />

                {/* ✅ Experiment Upload (Lab-Specific) */}
                <Route path="/experiment-upload/:labCode" element={<ExperimentUpload />} />

                {/* ✅ Upload Exercise Page */}
                <Route path="/upload-exercise" element={<UploadExercise />} />

                {/* ✅ Experiments Page */}
                <Route path="/experiments" element={<Experiment />} />

                {/* ✅ Other Routes */}
                <Route path="/details" element={<ExperimentDetails />} />
                <Route path="/record" element={<LabDetails />} />
                <Route path="/student-lab/:labCode" element={<StudentLabExercise />} />
            </Routes>
        </Router>
    );
};

export default App;
