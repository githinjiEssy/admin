import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navigation } from './components/Navigation';
import { PrivateRoute } from './components/PrivateRoute';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { DashboardPage } from './pages/DashboardPage';
import { IssuesPage } from './pages/IssuesPage';
import { AcademicPage } from './pages/AcademicPage';
import { AdminManagementPage } from './pages/AdminManagementPage';
import { ContactPage } from './pages/ContactPage';
import { CoursesPage } from './pages/CoursesPage';
import './styles/index.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <Navigation />
          <div className="main-content">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <DashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/issues"
                element={
                  <PrivateRoute>
                    <IssuesPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/academic"
                element={
                  <PrivateRoute>
                    <AcademicPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin-management"
                element={
                  <PrivateRoute>
                    <AdminManagementPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/contacts"
                element={
                  <PrivateRoute>
                    <ContactPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/courses"
                element={
                  <PrivateRoute>
                    <CoursesPage />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
