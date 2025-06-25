import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import TeacherReview from './pages/TeacherReview';
import AddTeacherReview from './pages/AddTeacherReview';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ClassExchange from './pages/ClassExchange';
import Messages from './pages/Messages';
import NotFound from './pages/NotFound';
import AddTeacher from './pages/AddTeacher';
import ClassSwapRequest from './pages/ClassSwapRequest';
import TeacherDetail from './pages/TeacherDetail';
import TeamFinder from './pages/TeamFinder';
import ProfileDetail from './pages/ProfileDetail';
import AiRecommendation from './pages/AiRecommendation';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teachers" element={<TeacherReview />} />
        <Route path="/teachers/add-teacher" element={<AddTeacher />} />
        <Route path="/teachers/add-review" element={<AddTeacherReview />} />
        <Route path="/teachers/:teacherId" element={<TeacherDetail />} />
        <Route path="/exchange" element={<ClassExchange />} />
        <Route path="/exchange/swap-request" element={<ClassSwapRequest />} />
        <Route path="/team-finder" element={<TeamFinder />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile-detail" element={<ProfileDetail />} />
        <Route path="/ai-recommendation" element={<AiRecommendation />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
  );
}

export default App;
