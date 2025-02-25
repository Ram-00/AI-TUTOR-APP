import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Login from './Login';
import FacultyHome from './FacultyHome';
import StudentHome from './StudentHome';

const AppContent = () => {
    const { darkMode, setDarkMode } = useContext(UserContext);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <div style={{ 
            backgroundColor: darkMode ? '#121212' : '#ffffff',
            color: darkMode ? '#ffffff' : '#000000',
            minHeight: '100vh'
        }}>
            <button onClick={toggleDarkMode}>
                Toggle Dark Mode: {darkMode ? 'On' : 'Off'}
            </button>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/faculty" element={<FacultyHome />} />
                <Route path="/student" element={<StudentHome />} />
            </Routes>
        </div>
    );
};

export default AppContent;
