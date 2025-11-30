import React, { useState, useEffect } from 'react';
import { issuesAPI } from '../api/endpoints';
import '../styles/IssuesPage.css';

export const IssuesPage = () => {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ status: '' });
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  const fetchIssues = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await issuesAPI.getAllIssues(filters);
      setIssues(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch issues');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateIssue = async (issueId) => {
    if (!newStatus) {
      setError('Please select a status');
      return;
    }

    setUpdatingId(issueId);
    setError(null);
    try {
      await issuesAPI.updateIssue(issueId, newStatus, adminNotes);
      fetchIssues();
      setSelectedIssue(null);
      setNewStatus('');
      setAdminNotes('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update issue');
    } finally {
      setUpdatingId(null);
    }
  };

  const statusColors = {
    new: '#ff6b6b',
    'in-progress': '#ffd93d',
    resolved: '#51cf66',
  };

  return (
    <div className="issues-container">
      <h2>Student Issues Management</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="filters">
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="">All Statuses</option>
          <option value="new">New</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading issues...</div>
      ) : issues.length === 0 ? (
        <div className="no-data">No issues found</div>
      ) : (
        <div className="issues-list">
          {issues.map((issue) => (
            <div key={issue.id} className="issue-card">
              <div className="issue-header">
                <h3>{issue.description}</h3>
                <span
                  className="status-badge"
                  style={{ backgroundColor: statusColors[issue.status] }}
                >
                  {issue.status}
                </span>
              </div>
              <div className="issue-details">
                <p>
                  <strong>Student:</strong> {issue.student?.fullName} (
                  {issue.student?.email})
                </p>
                <p>
                  <strong>Type:</strong> {issue.type}
                </p>
                {issue.course && (
                  <p>
                    <strong>Course:</strong> {issue.course.name}
                  </p>
                )}
              </div>

              {selectedIssue?.id === issue.id ? (
                <div className="issue-update-form">
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Select Status</option>
                    <option value="new">New</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add admin notes..."
                    className="form-control"
                    rows="3"
                  />
                  <div className="button-group">
                    <button
                      onClick={() => handleUpdateIssue(issue.id)}
                      disabled={updatingId === issue.id}
                      className="btn-primary"
                    >
                      {updatingId === issue.id ? 'Updating...' : 'Update'}
                    </button>
                    <button
                      onClick={() => setSelectedIssue(null)}
                      className="btn-secondary"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setSelectedIssue(issue);
                    setNewStatus(issue.status);
                    setAdminNotes(issue.adminNotes || '');
                  }}
                  className="btn-secondary"
                >
                  Edit
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
