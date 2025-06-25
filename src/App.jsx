import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import TeacherReview from './pages/TeacherReview';
import AddTeacherReview from './pages/AddTeacherReview';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import ClassExchange from './pages/ClassExchange';
import NotFound from './pages/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teachers" element={<TeacherReview />} />
        <Route path="/teachers/add-review" element={<AddTeacherReview />} />
        <Route path="/exchange" element={<ClassExchange />} />
        <Route path="/settings" element={<Settings />} />
        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
