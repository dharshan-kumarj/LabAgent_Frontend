import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logo from './pages/logo';
import Login from './pages/login';
import ExperimentUpload from './pages/experimentupload';
import UploadExercise from './pages/uploadexercise';
import Experiment from './pages/experiments';
import ExperimentDetails from './pages/experimentdetails';
import LabDetails from './pages/labdetails';
import FacultyLogin from './facultylogin';
const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Logo />} />
                <Route path="login" element={<Login />} />
                <Route path="upload" element={<ExperimentUpload />} />
                <Route path="exercise" element={<UploadExercise />} />
                <Route path="experiment" element={<Experiment />} />
                <Route path="details" element={<ExperimentDetails />} />
                <Route path="record" element={<LabDetails />} />
                <Route path="facultylogin" element={<FacultyLogin />} />
            </Routes>
        </Router>
    );
};

export default App;
