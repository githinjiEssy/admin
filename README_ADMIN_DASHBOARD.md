# Admin Dashboard - React Application

A secure, web-based administrative dashboard for university operations supporting issue resolution, student academic progress monitoring, and administrative account management.

## Features

### 1. **Secure Authentication**
- Admin login with JWT token management
- Automatic token refresh and session management
- Protected routes with automatic redirect on unauthorized access
- Admin signup/registration page for new accounts

### 2. **Administrative User Management**
- Register new administrators with admin role
- Secure registration form with validation

### 3. **Student Issue Management**
- View all reported student issues with status filtering
- Filter issues by status (new, in-progress, resolved)
- Update issue status and add admin notes
- Direct access to student and lecturer contact information

### 4. **Student Academic Oversight**
- View list of all students
- Access student grades by term and year
- Identify students with missing marks
- View consolidated mark sheets

### 5. **Direct Communication**
- Browse student and lecturer contact information
- Quick email copy and send functionality
- Separate tabs for students and lecturers

### 6. **Course Management**
- View all available courses
- View course offerings with lecturer assignments
- Filter and search course information

## Project Structure

```
src/
├── api/
│   ├── apiClient.js          # Axios client with interceptors
│   └── endpoints.js          # API endpoint definitions
├── components/
│   ├── Navigation.js         # Navigation bar component
│   └── PrivateRoute.js       # Protected route component
├── context/
│   └── AuthContext.js        # Authentication context
├── pages/
│   ├── LoginPage.js          # Login page
│   ├── SignupPage.js         # Admin signup/registration page
│   ├── DashboardPage.js      # Dashboard home page
│   ├── IssuesPage.js         # Issues management
│   ├── AcademicPage.js       # Academic oversight
│   ├── AdminManagementPage.js # Admin user management
│   ├── ContactPage.js        # Contact information
│   └── CoursesPage.js        # Courses and offerings
├── styles/
│   ├── index.css             # Global styles
│   ├── LoginPage.css         # Login page styles
│   ├── SignupPage.css        # Signup page styles
│   ├── Navigation.css        # Navigation styles
│   ├── DashboardPage.css     # Dashboard styles
│   ├── IssuesPage.css        # Issues page styles
│   ├── AcademicPage.css      # Academic page styles
│   ├── AdminManagementPage.css
│   ├── ContactPage.css       # Contact page styles
│   └── CoursesPage.css       # Courses page styles
├── utils/
│   └── useAuth.js            # Authentication hook
└── App.js                    # Main application component
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API endpoint:**
   Create a `.env` file in the root directory:
   ```
   REACT_APP_API_URL=http://localhost:3001
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

4. **Build for production:**
   ```bash
   npm run build
   ```

## API Integration

The dashboard integrates with the following backend endpoints:

### Authentication
- `POST /auth/login` - Login with email and password
- `POST /auth/register` - Register new admin user

### Users
- `GET /admin/users?role=student` - Get all students
- `GET /admin/users?role=lecturer` - Get all lecturers

### Issues
- `GET /admin/issues` - Get all issues (with optional filters: status, studentId, lecturerId)
- `PUT /admin/issues/:id` - Update issue status and notes

### Academic
- `GET /admin/marksheets/consolidated` - Get student marks (params: studentId, term, year)
- `GET /public/courses` - Get all courses
- `GET /public/offerings` - Get all course offerings

## Authentication Flow

1. Admin logs in with email and password
2. System calls `POST /auth/login` endpoint
3. JWT token is received and stored in localStorage
4. Token is automatically included in all subsequent API requests
5. On unauthorized access (401), user is redirected to login page

## Usage

### Dashboard
- Central hub showing all available features
- Quick navigation to all system modules

### Issues Management
1. Navigate to Issues section
2. Filter by status (new, in-progress, resolved)
3. Click "Edit" on an issue to update
4. Change status and add admin notes
5. Save changes

### Academic Oversight
1. Navigate to Academic section
2. Select a student from the list
3. Choose term and year
4. Click "Fetch Marks" to view grades
5. Identify missing marks

### Direct Communication
1. Navigate to Contacts section
2. Switch between Students and Lecturers tabs
3. Copy email address or send email directly
4. Use contact information to reach out via email

### Course Management
1. Navigate to Courses section
2. View courses or offerings in separate tabs
3. Browse course details and assignments

### Admin Management
1. Navigate to Admin Users section
2. Fill in new admin details
3. Submit form to register new administrator

## Security Features

- JWT-based authentication
- Automatic token refresh on API calls
- Protected routes requiring authentication
- Secure logout clearing all stored tokens
- HTTPS recommended for production

## Environment Variables

```
REACT_APP_API_URL    # Backend API base URL (default: http://localhost:3001)
```

## Dependencies

- **React** (^19.2.0) - UI framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client with interceptors
- **React Testing Library** - Testing utilities

## Development

### Run tests
```bash
npm test
```

### Build for production
```bash
npm run build
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The dashboard requires a backend API server running on the configured URL
- All API endpoints require proper JWT authentication
- Student issues must be created by students through the student portal
- Admin users can only manage administrative tasks

## Support

For issues or questions about the Admin Dashboard, please contact the development team.
