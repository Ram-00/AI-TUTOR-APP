import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StudentDashboard from '../components/student/pages/StudentDashboard';
import StudentProfile from '../components/student/pages/StudentProfile';
import StudentHome from '../components/student/pages/StudentHome';
import StudentLayout from '../components/student/layout/StudentLayout';

const StudentRoutes = () => {
    return (
        <StudentLayout>
            <Routes>
                <Route path="dashboard" element={<StudentDashboard />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route index element={<StudentHome />} />
                {/* Add more student routes here */}
            </Routes>
        </StudentLayout>
    );
};

export default StudentRoutes; 