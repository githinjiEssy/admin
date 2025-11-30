import apiClient from './apiClient';

export const authAPI = {
  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),
  
  registerAdmin: (email, password, fullName, staffNo) =>
    apiClient.post('/auth/register', {
      email,
      password,
      fullName,
      staffNo,
      role: 'admin',
    }),
};

export const usersAPI = {
  getAllUsers: (role) =>
    apiClient.get('/admin/users', { params: { role } }),
  
  getStudents: () => usersAPI.getAllUsers('student'),
  
  getLecturers: () => usersAPI.getAllUsers('lecturer'),
};

export const issuesAPI = {
  getAllIssues: (filters = {}) =>
    apiClient.get('/admin/issues', { params: filters }),
  
  getIssuesByStatus: (status) =>
    issuesAPI.getAllIssues({ status }),
  
  getIssuesByStudent: (studentId) =>
    issuesAPI.getAllIssues({ studentId }),
  
  getIssuesByLecturer: (lecturerId) =>
    issuesAPI.getAllIssues({ lecturerId }),
  
  updateIssue: (issueId, status, adminNotes) =>
    apiClient.put(`/admin/issues/${issueId}`, {
      status,
      admin_notes: adminNotes,
    }),
};

export const academicAPI = {
  getAllCourses: () =>
    apiClient.get('/public/courses'),
  
  getAllOfferings: () =>
    apiClient.get('/public/offerings'),
  
  getConsolidatedMarks: (studentId, term, year) =>
    apiClient.get('/admin/marksheets/consolidated', {
      params: { studentId, term, year },
    }),
};
