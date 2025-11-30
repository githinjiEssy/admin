import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/useAuth';
import '../styles/Navigation.css';

export const Navigation = () => {
  const navigate = useNavigate();
  const { admin, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo" onClick={() => navigate('/dashboard')}>
          <span className="logo-text">🎓 Admin Dashboard</span>
        </div>

        <button
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => {
                navigate('/dashboard');
                setIsOpen(false);
              }}
            >
              Dashboard
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => {
                navigate('/issues');
                setIsOpen(false);
              }}
            >
              Issues
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => {
                navigate('/academic');
                setIsOpen(false);
              }}
            >
              Academic
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => {
                navigate('/contacts');
                setIsOpen(false);
              }}
            >
              Contacts
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => {
                navigate('/courses');
                setIsOpen(false);
              }}
            >
              Courses
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link"
              onClick={() => {
                navigate('/admin-management');
                setIsOpen(false);
              }}
            >
              Admin Users
            </button>
          </li>
        </ul>

        <div className="nav-user">
          <span className="user-name">{admin?.fullName || 'Admin'}</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};
