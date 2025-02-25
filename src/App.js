import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/auth/Login';
import StudentLayout from './components/student/layout/StudentLayout';
import StudentDashboard from './components/student/pages/StudentDashboard';
import Assignments from './components/student/pages/Assignments';
import SubjectAssignments from './components/student/pages/SubjectAssignments';
import ExamResults from './components/student/pages/ExamResults';
import LearningResources from './components/student/pages/LearningResources';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ExamResultsAnalysis from './components/student/pages/ExamResultsAnalysis';
import StudentProfile from './components/student/pages/StudentProfile';

// Faculty Components
import MainLayout from './components/faculty/layout/MainLayout';
import FacultyHome from './components/faculty/pages/FacultyHome';
import PaperEvaluation from './components/faculty/pages/PaperEvaluation';
import QuestionPaperGeneration from './components/faculty/pages/QuestionPaperGeneration';
import SynopsisForTeachers from './components/faculty/pages/SynopsisForTeachers';
import HomeworkCorrection from './components/faculty/pages/HomeworkCorrection';
import AILessonPlanning from './components/faculty/pages/AILessonPlanning';
import Profile from './components/faculty/pages/Profile';
import Preferences from './components/faculty/pages/Preferences';
import Help from './components/faculty/pages/Help';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            
            {/* Faculty Routes */}
            <Route
                path="/faculty-home"
                element={
                    <ProtectedRoute userType="faculty">
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<FacultyHome />} />
                <Route path="paper-evaluation" element={<PaperEvaluation />} />
                <Route path="question-generation" element={<QuestionPaperGeneration />} />
                <Route path="synopsis" element={<SynopsisForTeachers />} />
                <Route path="homework" element={<HomeworkCorrection />} />
                <Route path="lesson-planning" element={<AILessonPlanning />} />
                <Route path="profile" element={<Profile />} />
                <Route path="preferences" element={<Preferences />} />
                <Route path="help" element={<Help />} />
            </Route>

            {/* Student Routes */}
            <Route
                path="/student-home"
                element={
                    <ProtectedRoute>
                        <StudentLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<StudentDashboard />} />
                <Route path="assignments" element={<Assignments />} />
                <Route path="assignments/subject/:subjectId" element={<SubjectAssignments />} />
                <Route path="exam-results" element={<ExamResults />} />
                <Route path="exam-results/:examId" element={<ExamResultsAnalysis />} />
                <Route path="learning-resources" element={<LearningResources />} />
                <Route path="profile" element={<StudentProfile />} />
                <Route path="help" element={<Help />} />
            </Route>

            {/* Error Routes */}
            <Route path="/unauthorized" element={
                <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    height: '100vh',
                    gap: '20px'
                }}>
                    <h1>Unauthorized Access</h1>
                    <button 
                        onClick={() => window.location.href = '/'}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: 'pointer'
                        }}
                    >
                        Back to Login
                    </button>
                </div>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}

export default App;
