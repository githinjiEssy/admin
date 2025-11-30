import React from 'react';
import '../styles/DashboardPage.css';

export const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <h1>Welcome to Admin Dashboard</h1>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-icon">📋</div>
          <h3>Issues Management</h3>
          <p>View and manage student issues reported by students. Update status and add notes.</p>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📊</div>
          <h3>Academic Oversight</h3>
          <p>Monitor student grades and identify students with missing marks.</p>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📧</div>
          <h3>Direct Communication</h3>
          <p>Access contact information for students and lecturers to facilitate communication.</p>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">👥</div>
          <h3>Admin Management</h3>
          <p>Register new administrative users with admin role.</p>
        </div>

        <div className="dashboard-card">
          <div className="card-icon">📚</div>
          <h3>Courses & Offerings</h3>
          <p>View all available courses and course offerings for contextual understanding.</p>
        </div>
      </div>

      <div className="info-section">
        <h2>System Overview</h2>
        <p>
          This Administrative Dashboard is designed to support university operations by facilitating
          issue resolution, monitoring student academic progress, and managing administrative accounts
          within the Online Examination System.
        </p>
      </div>
    </div>
  );
};
