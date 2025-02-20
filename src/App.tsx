import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Logo from './pages/logo';
import Login from './pages/login';
import FacultyDashboard from './pages/faculty_dashboard';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Logo />} />
                <Route path="logo" element={<Logo/>}/>
                <Route path="login" element={<Login />} />
                <Route path="dashboard" element={<FacultyDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
