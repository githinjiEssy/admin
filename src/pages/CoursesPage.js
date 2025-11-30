import React, { useState, useEffect } from 'react';
import { academicAPI } from '../api/endpoints';
import '../styles/CoursesPage.css';

export const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [offerings, setOfferings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('courses');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [coursesResponse, offeringsResponse] = await Promise.all([
        academicAPI.getAllCourses(),
        academicAPI.getAllOfferings(),
      ]);
      setCourses(coursesResponse.data);
      setOfferings(offeringsResponse.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="courses-container">
      <h2>Courses & Offerings</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          Courses ({courses.length})
        </button>
        <button
          className={`tab ${activeTab === 'offerings' ? 'active' : ''}`}
          onClick={() => setActiveTab('offerings')}
        >
          Offerings ({offerings.length})
        </button>
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <>
          {activeTab === 'courses' ? (
            <div className="courses-list">
              {courses.length === 0 ? (
                <div className="no-data">No courses found</div>
              ) : (
                courses.map((course) => (
                  <div key={course.id} className="course-card">
                    <div className="course-header">
                      <h3>{course.name}</h3>
                      <span className="course-code">{course.code}</span>
                    </div>
                    <p className="course-description">
                      {course.description || 'No description available'}
                    </p>
                    <div className="course-details">
                      {course.credits && (
                        <span className="detail">
                          <strong>Credits:</strong> {course.credits}
                        </span>
                      )}
                      {course.department && (
                        <span className="detail">
                          <strong>Department:</strong> {course.department}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="offerings-list">
              {offerings.length === 0 ? (
                <div className="no-data">No offerings found</div>
              ) : (
                offerings.map((offering) => (
                  <div key={offering.id} className="offering-card">
                    <div className="offering-header">
                      <h3>{offering.course?.name || offering.courseName}</h3>
                      <span className="offering-term">
                        {offering.term} - {offering.year}
                      </span>
                    </div>
                    <div className="offering-details">
                      <p>
                        <strong>Lecturer:</strong>{' '}
                        {offering.assignedLecturerIds
                          ?.map((lid) => lid.fullName)
                          .join(', ') || 'TBD'}
                      </p>
                      {offering.schedule && (
                        <p>
                          <strong>Schedule:</strong> {offering.schedule}
                        </p>
                      )}
                      {offering.location && (
                        <p>
                          <strong>Location:</strong> {offering.location}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
