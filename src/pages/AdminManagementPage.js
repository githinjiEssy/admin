import React, { useState } from 'react';
import { authAPI } from '../api/endpoints';
import '../styles/AdminManagementPage.css';

export const AdminManagementPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    staffNo: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await authAPI.registerAdmin(
        formData.email,
        formData.password,
        formData.fullName,
        formData.staffNo
      );
      setSuccess('Administrator registered successfully!');
      setFormData({
        email: '',
        password: '',
        fullName: '',
        staffNo: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register administrator');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-management-container">
      <h2>Administrative User Management</h2>

      <div className="register-form-card">
        <h3>Register New Administrator</h3>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="admin@university.edu"
            />
          </div>

          <div className="form-group">
            <label htmlFor="staffNo">Staff Number</label>
            <input
              id="staffNo"
              type="text"
              name="staffNo"
              value={formData.staffNo}
              onChange={handleChange}
              required
              placeholder="ADM001"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Registering...' : 'Register Administrator'}
          </button>
        </form>
      </div>
    </div>
  );
};
