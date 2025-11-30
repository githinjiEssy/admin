import React, { useState, useEffect } from 'react';
import { usersAPI } from '../api/endpoints';
import '../styles/ContactPage.css';

export const ContactPage = () => {
  const [students, setStudents] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('students');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const [studentsResponse, lecturersResponse] = await Promise.all([
        usersAPI.getStudents(),
        usersAPI.getLecturers(),
      ]);
      setStudents(studentsResponse.data);
      setLecturers(lecturersResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (email) => {
    navigator.clipboard.writeText(email);
    alert(`Copied: ${email}`);
  };

  return (
    <div className="contact-container">
      <h2>Direct Communication</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Students ({students.length})
        </button>
        <button
          className={`tab ${activeTab === 'lecturers' ? 'active' : ''}`}
          onClick={() => setActiveTab('lecturers')}
        >
          Lecturers ({lecturers.length})
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading contacts...</div>
      ) : (
        <div className="contacts-list">
          {activeTab === 'students' ? (
            students.length === 0 ? (
              <div className="no-data">No students found</div>
            ) : (
              students.map((student) => (
                <div key={student.id} className="contact-card">
                  <div className="contact-info">
                    <h3>{student.fullName}</h3>
                    <p className="contact-detail">
                      <strong>Email:</strong> {student.email}
                    </p>
                    {student.phone && (
                      <p className="contact-detail">
                        <strong>Phone:</strong> {student.phone}
                      </p>
                    )}
                  </div>
                  <div className="contact-actions">
                    <button
                      onClick={() => copyToClipboard(student.email)}
                      className="btn-copy"
                    >
                      Copy Email
                    </button>
                    <a
                      href={`mailto:${student.email}`}
                      className="btn-email"
                    >
                      Send Email
                    </a>
                  </div>
                </div>
              ))
            )
          ) : (
            lecturers.length === 0 ? (
              <div className="no-data">No lecturers found</div>
            ) : (
              lecturers.map((lecturer) => (
                <div key={lecturer.id} className="contact-card">
                  <div className="contact-info">
                    <h3>{lecturer.fullName}</h3>
                    <p className="contact-detail">
                      <strong>Email:</strong> {lecturer.email}
                    </p>
                    <p className="contact-detail">
                      <strong>Staff No:</strong> {lecturer.staffNo}
                    </p>
                    {lecturer.phone && (
                      <p className="contact-detail">
                        <strong>Phone:</strong> {lecturer.phone}
                      </p>
                    )}
                  </div>
                  <div className="contact-actions">
                    <button
                      onClick={() => copyToClipboard(lecturer.email)}
                      className="btn-copy"
                    >
                      Copy Email
                    </button>
                    <a
                      href={`mailto:${lecturer.email}`}
                      className="btn-email"
                    >
                      Send Email
                    </a>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      )}
    </div>
  );
};
