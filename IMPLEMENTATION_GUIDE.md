# Admin Dashboard Implementation Guide

This guide provides a comprehensive overview of the Admin Dashboard implementation based on the ADMIN_SYSTEM_SPECIFICATION.md.

## Overview

The Admin Dashboard is a React-based web application that enables university administrative staff to:
- Manage student issues and concerns
- Monitor student academic progress
- Register and manage administrative users
- Access contact information for students and lecturers
- View course and offering information

## Architecture

### Frontend Stack
- **React 19** - UI framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client with request/response interceptors
- **Context API** - State management for authentication

### Key Patterns

#### 1. Authentication Context
Located in `src/context/AuthContext.js`, manages:
- Current admin user state
- JWT token storage
- Login/logout functions
- Authentication status

#### 2. API Client with Interceptors
Located in `src/api/apiClient.js`:
- Automatically includes JWT token in headers
- Handles 401 responses by redirecting to login
- Configurable base URL via environment variables

#### 3. Protected Routes
Located in `src/components/PrivateRoute.js`:
- Wraps routes that require authentication
- Redirects unauthenticated users to login
- Preserves requested location for post-login redirect

#### 4. Custom Authentication Hook
Located in `src/utils/useAuth.js`:
- Provides convenient access to auth context
- Throws error if used outside AuthProvider

## Feature Implementation

### 1. Login (Section 2.0)
**Files:** `src/pages/LoginPage.js`, `src/api/endpoints.js`

**Implementation:**
```javascript
const handleSubmit = async (e) => {
  const response = await authAPI.login(email, password);
  const { token, user } = response.data;
  login(user, token); // Store in context and localStorage
};
```

**API Call:** `POST /auth/login`
- Request: `{ email, password }`
- Response: `{ token, user: { id, email, fullName, role } }`

### 2. Admin User Management (Section 3.1)
**File:** `src/pages/AdminManagementPage.js`

**Implementation:**
```javascript
const handleSubmit = async (e) => {
  await authAPI.registerAdmin(
    email, password, fullName, staffNo
  );
};
```

**API Call:** `POST /auth/register`
- Request: `{ email, password, fullName, staffNo, role: 'admin' }`
- Response: `{ success: true, user: {...} }`

### 3. Student & Lecturer Retrieval (Section 3.2)
**File:** `src/pages/ContactPage.js`

**Implementation:**
```javascript
const [studentsResponse, lecturersResponse] = await Promise.all([
  usersAPI.getStudents(),
  usersAPI.getLecturers(),
]);
```

**API Calls:**
- `GET /admin/users?role=student`
- `GET /admin/users?role=lecturer`

**Response Format:**
```json
[
  {
    "id": "uuid",
    "email": "student@university.edu",
    "fullName": "John Doe",
    "staffNo": "STU001",
    "phone": "555-1234"
  }
]
```

### 4. Student Issue Management (Section 3.4)
**File:** `src/pages/IssuesPage.js`

**Features:**
- View all issues: `GET /admin/issues`
- Filter by status: `GET /admin/issues?status=new|in-progress|resolved`
- Filter by student: `GET /admin/issues?studentId=uuid`
- Filter by lecturer: `GET /admin/issues?lecturerId=uuid`
- Update issue: `PUT /admin/issues/:id`

**Issue Object:**
```json
{
  "id": "uuid",
  "description": "Missing marks for final exam",
  "type": "missing mark",
  "status": "new|in-progress|resolved",
  "student": {
    "id": "uuid",
    "fullName": "Jane Smith",
    "email": "jane@university.edu"
  },
  "course": {
    "id": "uuid",
    "name": "Calculus I"
  },
  "adminNotes": "Contacted lecturer for clarification",
  "createdAt": "2025-11-30T22:24:37.450Z"
}
```

### 5. Academic Oversight (Section 3.3)
**File:** `src/pages/AcademicPage.js`

**Implementation:**
1. Fetch all students: `GET /admin/users?role=student`
2. Select student
3. Fetch marks: `GET /admin/marksheets/consolidated?studentId=uuid&term=1&year=2025`

**Response Format:**
```json
{
  "studentId": "uuid",
  "term": 1,
  "year": 2025,
  "courses": [
    {
      "id": "uuid",
      "name": "Calculus I",
      "code": "MATH101",
      "mark": 85,
      "grade": "A",
      "status": "complete"
    },
    {
      "id": "uuid",
      "name": "Physics I",
      "code": "PHY101",
      "mark": null,
      "grade": null,
      "status": "missing"
    }
  ]
}
```

### 6. Course and Offering View (Section 3.5)
**File:** `src/pages/CoursesPage.js`

**API Calls:**
- `GET /public/courses`
- `GET /public/offerings`

**Course Object:**
```json
{
  "id": "uuid",
  "name": "Calculus I",
  "code": "MATH101",
  "description": "Introduction to calculus",
  "credits": 3,
  "department": "Mathematics"
}
```

**Offering Object:**
```json
{
  "id": "uuid",
  "courseName": "Calculus I",
  "term": 1,
  "year": 2025,
  "assignedLecturerIds": [
    {
      "id": "uuid",
      "fullName": "Dr. Smith",
      "staffNo": "LECTR001",
      "email": "smith@university.edu"
    }
  ],
  "schedule": "Mon/Wed 10:00-11:30",
  "location": "Room 101"
}
```

## Component Hierarchy

```
App
├── AuthProvider
│   ├── Navigation
│   └── Routes
│       ├── /login → LoginPage
│       ├── /dashboard → PrivateRoute → DashboardPage
│       ├── /issues → PrivateRoute → IssuesPage
│       ├── /academic → PrivateRoute → AcademicPage
│       ├── /admin-management → PrivateRoute → AdminManagementPage
│       ├── /contacts → PrivateRoute → ContactPage
│       └── /courses → PrivateRoute → CoursesPage
```

## State Management

### Authentication State (AuthContext)
```javascript
{
  admin: { id, email, fullName, role },
  isAuthenticated: boolean,
  loading: boolean,
  error: string | null,
  login: (adminData, token) => void,
  logout: () => void,
  setLoading: (boolean) => void,
  setError: (string) => void
}
```

### Local Component States
- **LoginPage:** formData (email, password), loading, error
- **IssuesPage:** issues, filters, selectedIssue, loading, error
- **AcademicPage:** students, selectedStudent, marks, filters, loading, error
- **ContactPage:** students, lecturers, activeTab, loading, error
- **CoursesPage:** courses, offerings, activeTab, loading, error
- **AdminManagementPage:** formData, loading, error, success
- **DashboardPage:** Static content

## Error Handling

### API Error Flow
1. API call fails with error
2. Try/catch block catches the error
3. Display error message to user
4. If 401: redirect to login (via interceptor)
5. User can retry operation

### Implementation Pattern
```javascript
try {
  const response = await apiFunction();
  // Process response
} catch (err) {
  setError(err.response?.data?.message || 'Default error message');
} finally {
  setLoading(false);
}
```

## Security Considerations

### JWT Token Management
- Stored in localStorage as `authToken`
- Included in Authorization header: `Bearer <token>`
- Cleared on logout
- Cleared on 401 unauthorized response

### Admin User Data Storage
- Stored in localStorage as `adminUser` (stringified JSON)
- Used for displaying current user info (fullName, email, role)
- Cleared on logout

### Protected Routes
- All non-login routes wrapped in PrivateRoute
- Authentication state checked before rendering
- Unauthenticated users redirected to login

## Styling Approach

### Global Styles (`src/styles/index.css`)
- Reset and normalize styles
- Button and form styling
- Message styling (error, success)
- Utility classes (loading, no-data)

### Page-Specific Styles
- One CSS file per page/component
- Scoped to component-specific selectors
- Responsive design with media queries

### Design System
- **Primary Color:** #667eea (Indigo)
- **Danger Color:** #dc3545 (Red)
- **Success Color:** #28a745 (Green)
- **Info Color:** #17a2b8 (Cyan)
- **Neutral Color:** #6c757d (Gray)

## Configuration

### Environment Variables
```
REACT_APP_API_URL=http://localhost:3001  # Backend API base URL
REACT_APP_ENV=development                 # Environment mode (optional)
```

### Build Configuration
- Default build output: `build/` directory
- Production-optimized bundle with source maps
- Gzip compression enabled
- Bundle size: ~94KB (gzipped)

## API Endpoint Summary

| Feature | Method | Endpoint | Status |
|---------|--------|----------|--------|
| Admin Login | POST | `/auth/login` | ✓ Implemented |
| Register Admin | POST | `/auth/register` | ✓ Implemented |
| Get All Users | GET | `/admin/users?role=` | ✓ Implemented |
| Get All Issues | GET | `/admin/issues` | ✓ Implemented |
| Update Issue | PUT | `/admin/issues/:id` | ✓ Implemented |
| Get Marks | GET | `/admin/marksheets/consolidated` | ✓ Implemented |
| Get Courses | GET | `/public/courses` | ✓ Implemented |
| Get Offerings | GET | `/public/offerings` | ✓ Implemented |

## Testing Checklist

- [ ] Login with valid credentials
- [ ] Login with invalid credentials
- [ ] Access protected route without authentication
- [ ] View and filter issues
- [ ] Update issue status and notes
- [ ] View student list and select student
- [ ] Fetch and view student marks
- [ ] View contact information for students
- [ ] View contact information for lecturers
- [ ] Copy email address
- [ ] Send email (mailto link)
- [ ] Register new administrator
- [ ] View courses and offerings
- [ ] Logout functionality

## Deployment

### Build for Production
```bash
npm run build
```

### Serve Locally
```bash
npm install -g serve
serve -s build
```

### Deploy to Production
1. Build the application: `npm run build`
2. Upload `build/` directory to hosting platform
3. Configure environment variable `REACT_APP_API_URL` to production backend URL
4. Ensure backend API is running and accessible

## Performance Optimizations

- Lazy loading of pages via React Router
- Efficient state updates with React hooks
- API response caching at component level
- Optimized CSS with minimal file size
- Production bundle tree-shaking

## Future Enhancements

1. **Pagination** for large data sets (students, issues, etc.)
2. **Search functionality** for quick filtering
3. **Audit logging** of admin actions
4. **Export/Import** functionality for reports
5. **Dark mode** theme support
6. **Multi-language** support
7. **Advanced filtering** and sorting
8. **Notification system** for real-time updates
9. **User profile management** page
10. **Dashboard analytics** and statistics
