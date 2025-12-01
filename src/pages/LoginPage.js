import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authAPI } from '../api/endpoints'; 
import { useAuth } from '../utils/useAuth'; 
import '../styles/LoginPage.css';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, setError, error } = useAuth(); 
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Clear previous errors
    setError(null);

    try {
      // 1. Call the API
      const response = await authAPI.login(formData.email, formData.password);
      const { token, user } = response.data;

      
      // 2. Check if this user is actually an Admin
      if (user.role !== 'admin') {
        // If they are a student/lecturer, DO NOT let them proceed.
        setError("ACCESS DENIED: You are not authorized to view the Admin Dashboard.");
        setLoading(false);
        return; // Stop the function here
      }
      

      // 3. If Admin, proceed to login
      login(user, token);
      
      // 4. Redirect to Dashboard
      const from = location.state?.from?.pathname || '/admin/dashboard';
      navigate(from);

    } catch (err) {
      // Handle server errors
      setError(err.response?.data?.message || 'Login failed. Check connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Admin Portal</h1>
        <p className="subtitle">Restricted Access</p>
        
        <form onSubmit={handleSubmit}>
          {/* Display Error Message */}
          {error && <div className="error-message" style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
          
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
            {loading ? 'Verifying Credentials...' : 'Secure Login'}
          </button>
        </form>

        {/*  WE REMOVED THE SIGNUP TO PREVENT UNAUTHORIZED REGISTRATION */}
        <div className="auth-links" style={{marginTop: '1rem', fontSize: '0.9rem', color: '#666'}}>
           <p>Authorized Personnel Only</p>
        </div>
      </div>
    </div>
  );
};