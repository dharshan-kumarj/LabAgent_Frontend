import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logo from './pages/logo';
import Login from './pages/login';
import FacultyDashboard from './pages/faculty_dashboard';
import ExperimentUpload from './pages/experimentupload';
import UploadExercise from './pages/uploadexercise';
import Experiment from './pages/experiments';
import ExperimentDetails from './pages/experimentdetails';
import LabDetails from './pages/labdetails';
const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Logo />} />
                <Route path="logo" element={<Logo/>}/>
                <Route path="login" element={<Login />} />
                <Route path="dashboard" element={<FacultyDashboard />} />
                <Route path="upload" element={<ExperimentUpload />} />
                <Route path="exercise" element={<UploadExercise />} />
                <Route path="experiment" element={<Experiment />} />
                <Route path="details" element={<ExperimentDetails />} />
                <Route path="record" element={<LabDetails />} />
            </Routes>
        </Router>
    );
};

export default App;
