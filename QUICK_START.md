# Admin Dashboard - Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure API URL
Create `.env` file in the root directory:
```
REACT_APP_API_URL=http://localhost:3001
```

### 3. Start Development Server
```bash
npm start
```
The application will open at `http://localhost:3000`

### 4. Build for Production
```bash
npm run build
```

## 📋 Features Overview

### Dashboard Home
- Central hub showing all available features
- Quick access to all modules

### Issues Management
1. Click **Issues** in navigation
2. Filter by status (new, in-progress, resolved)
3. Click **Edit** on any issue to update
4. Change status and add admin notes
5. Click **Update** to save changes

### Academic Oversight
1. Click **Academic** in navigation
2. Select a student from the list
3. Choose term and year
4. Click **Fetch Marks** to view grades
5. Red text = Missing marks, Green text = Complete marks

### Direct Communication
1. Click **Contacts** in navigation
2. Switch between **Students** and **Lecturers** tabs
3. Click **Copy Email** or **Send Email**
4. Use email copy for external communication
5. Send Email opens default email client

### Course Management
1. Click **Courses** in navigation
2. Switch between **Courses** and **Offerings** tabs
3. Browse available courses and current offerings
4. View lecturer assignments and schedules

### Admin User Management
1. Click **Admin Users** in navigation
2. Fill in the registration form
3. Click **Register Administrator** to create new admin
4. New admin can then login with provided credentials

## 🔐 Authentication

### Login
- Email: Use valid admin email
- Password: Use admin password
- System stores JWT token automatically

### Logout
- Click your name in top right
- Click **Logout**
- You will be redirected to login page

## 🛠️ API Configuration

The application connects to a backend API. Configure the URL:

```
REACT_APP_API_URL=<your-api-url>
```

### Required Backend Endpoints

**Authentication:**
- `POST /auth/login` - Login
- `POST /auth/register` - Register admin

**Users:**
- `GET /admin/users?role=student` - Get students
- `GET /admin/users?role=lecturer` - Get lecturers

**Issues:**
- `GET /admin/issues` - Get all issues
- `GET /admin/issues?status=new` - Filter by status
- `PUT /admin/issues/:id` - Update issue

**Academic:**
- `GET /admin/marksheets/consolidated` - Get student marks

**Courses:**
- `GET /public/courses` - Get all courses
- `GET /public/offerings` - Get course offerings

## 📁 Project Structure

```
src/
├── api/              # API client and endpoints
├── components/       # Reusable components
├── context/          # Authentication context
├── pages/            # Page components
├── styles/           # CSS files
└── utils/            # Utility functions
```

## 🎨 Customization

### Change Colors
Edit `src/styles/index.css` to modify color scheme:
- Primary: `#667eea`
- Success: `#28a745`
- Danger: `#dc3545`
- Info: `#17a2b8`

### Add New Pages
1. Create component in `src/pages/NewPage.js`
2. Import in `src/App.js`
3. Add route to Routes
4. Add navigation link in `src/components/Navigation.js`
5. Create CSS file in `src/styles/NewPage.css`

### Modify API Calls
Edit `src/api/endpoints.js` to change API methods

## 🐛 Troubleshooting

### "Cannot connect to API"
- Check `REACT_APP_API_URL` environment variable
- Ensure backend server is running
- Check backend CORS configuration

### "401 Unauthorized"
- JWT token may have expired
- Login again to refresh token
- Check if backend is validating tokens correctly

### "Page not loading"
- Check browser console for errors
- Ensure all required API endpoints exist
- Verify authentication token is valid

### "Form submission fails"
- Check network tab in browser devtools
- Verify request body matches API requirements
- Check backend validation rules

## 📱 Responsive Design

The dashboard is responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (< 768px)

Navigation collapses to hamburger menu on mobile devices.

## 🚀 Deployment

### To Heroku
```bash
heroku create your-app-name
heroku config:set REACT_APP_API_URL=https://your-api-url.com
git push heroku main
```

### To Vercel
```bash
npm install -g vercel
vercel
# Follow prompts and set REACT_APP_API_URL
```

### To AWS S3 + CloudFront
```bash
npm run build
aws s3 sync build/ s3://your-bucket-name
# Configure CloudFront distribution
```

## 📚 Documentation

- **README_ADMIN_DASHBOARD.md** - Full feature documentation
- **IMPLEMENTATION_GUIDE.md** - Technical implementation details
- **ADMIN_SYSTEM_SPECIFICATION.md** - System requirements and specifications

## 🤝 Support

For issues or questions:
1. Check the documentation files
2. Review browser console for errors
3. Check network tab for API issues
4. Verify backend API is running
5. Contact development team

## ✅ Development Checklist

- [ ] Install dependencies (`npm install`)
- [ ] Create `.env` file with API URL
- [ ] Start development server (`npm start`)
- [ ] Login with test credentials
- [ ] Test all navigation links
- [ ] Test Issue filtering and updating
- [ ] Test Academic marks retrieval
- [ ] Test Contact information display
- [ ] Test Course/Offering viewing
- [ ] Test Admin registration
- [ ] Test logout functionality
- [ ] Build for production (`npm run build`)

## 📦 Available Scripts

```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from Create React App
```

**Note:** Eject is irreversible. Only use if you need advanced configuration.

## 🎯 Key Technologies

- **React 19** - Modern UI framework
- **React Router 6** - Client-side routing
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling

## 📝 Notes

- Keep tokens secure (never expose in code)
- Use HTTPS in production
- Implement backend CORS correctly
- Keep API URL in environment variables
- Regular backups of localStorage recommended
- Monitor API performance

Enjoy using the Admin Dashboard! 🎉

## 🆕 Admin Sign-Up Feature

### Create New Admin Account
1. Go to Login page (`http://localhost:3000/login`)
2. Click **"Sign up here"** link at bottom
3. Fill in the registration form:
   - Full Name
   - Email Address
   - Staff Number
   - Password (minimum 6 characters)
   - Confirm Password
4. Click **"Create Account"**
5. After successful registration, you'll be redirected to login
6. Login with your new credentials

### Form Validation
- ✅ All fields required
- ✅ Email must be valid format
- ✅ Password must be at least 6 characters
- ✅ Passwords must match
- ✅ Error messages displayed if validation fails

### Features
- Password confirmation to prevent typos
- Clear error messages
- Success confirmation before redirect
- Link back to login page
- Responsive design for all devices
