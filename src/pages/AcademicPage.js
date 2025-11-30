import React, { useState, useEffect } from 'react';
import { usersAPI, academicAPI } from '../api/endpoints';
import '../styles/AcademicPage.css';

export const AcademicPage = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [marks, setMarks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ term: '', year: new Date().getFullYear() });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await usersAPI.getStudents();
      setStudents(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setMarks(null);
  };

  const fetchMarks = async () => {
    if (!selectedStudent || !filters.term) {
      setError('Please select a student and term');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await academicAPI.getConsolidatedMarks(
        selectedStudent.id,
        filters.term,
        filters.year
      );
      setMarks(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch marks');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="academic-container">
      <h2>Student Academic Oversight</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="academic-content">
        <div className="students-panel">
          <h3>Students</h3>
          <div className="students-list">
            {students.map((student) => (
              <div
                key={student.id}
                className={`student-item ${
                  selectedStudent?.id === student.id ? 'selected' : ''
                }`}
                onClick={() => handleStudentSelect(student)}
              >
                <div className="student-name">{student.fullName}</div>
                <div className="student-email">{student.email}</div>
              </div>
            ))}
          </div>
        </div>

        {selectedStudent && (
          <div className="marks-panel">
            <h3>{selectedStudent.fullName} - Marks</h3>
            
            <div className="filters">
              <select
                name="term"
                value={filters.term}
                onChange={(e) => setFilters({ ...filters, term: e.target.value })}
                className="filter-select"
              >
                <option value="">Select Term</option>
                <option value="1">Term 1</option>
                <option value="2">Term 2</option>
                <option value="3">Term 3</option>
              </select>

              <input
                type="number"
                name="year"
                value={filters.year}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                className="filter-select"
              />

              <button onClick={fetchMarks} disabled={loading} className="btn-primary">
                {loading ? 'Loading...' : 'Fetch Marks'}
              </button>
            </div>

            {marks && (
              <div className="marks-display">
                <table className="marks-table">
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Mark</th>
                      <th>Grade</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {marks.courses?.map((course) => (
                      <tr key={course.id}>
                        <td>{course.name}</td>
                        <td>{course.mark || 'N/A'}</td>
                        <td>{course.grade || 'N/A'}</td>
                        <td>
                          {course.mark === null ? (
                            <span className="status-missing">Missing</span>
                          ) : (
                            <span className="status-complete">Complete</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
