### **Project Prompt: Administrative Dashboard for University Operations & Support**

**Objective:**

Develop a secure, web-based administrative dashboard to support university operations by facilitating issue resolution, monitoring student academic progress (grades), and managing administrative accounts within the Online Examination System. This system will enable administrators to efficiently receive and escalate student concerns to lecturers, track student performance, and maintain system integrity through administrative user management.

**Target User:**

University administrative staff primarily focused on student support, academic oversight, and system administration.

**Core Functional Requirements:**

1.  **Secure Authentication:** Administrators must log in to the dashboard securely.
2.  **Administrative User Management:** Register new administrators.
3.  **Student Issue Management:** Receive issues reported by students and facilitate communication with relevant lecturers.
4.  **Student Academic Oversight:** View student grades after they are posted by lecturers, and identify students with missing marks or attendance issues.
5.  **Direct Communication:** Ability to contact students and lecturers regarding issues.
6.  **Core Data Visibility:** View existing courses and course offerings for contextual understanding.

---

### **System Specification Document (Revised)**

#### **1.0 Introduction**

This document outlines the revised technical and functional specifications for the "Administrative Dashboard," now focusing on operational support, issue management, and administrative user control within the "Online Examination System." The dashboard will operate by making authenticated API calls to the existing backend.

#### **2.0 Authentication and Authorization**

*   **2.1 Admin Dashboard Login:** The dashboard will have its own secure login page for administrative users.
*   **2.2 API Authentication:** For all interactions with protected backend API endpoints, the dashboard backend will authenticate using the credentials of a dedicated user with the `admin` role.
    *   It will first call the `POST /auth/login` endpoint to obtain a JSON Web Token (JWT).
    *   This JWT must be included in the `Authorization` header as `Bearer <token>` for all subsequent requests to protected routes.

#### **3.0 Feature Specifications & API Interaction**

This section details the dashboard's features and their corresponding API interactions, including proposed new endpoints where functionality is currently absent.

**3.1 Administrative User Management**

*   **3.1.1 Register New Administrators**
    *   **Functionality:** Allow an authenticated administrator to register new users with the `admin` role.
    *   **API Interaction:**
        *   The existing `POST /auth/register` endpoint can be utilized.
        *   The dashboard will make a `POST` request to `/auth/register` with `email`, `password`, `fullName`, `role: 'admin'`, and `staffNo`.
        *   **Important:** This assumes the `POST /auth/register` endpoint allows an authenticated admin to register other users with a specified role. If not, a new `POST /admin/users` endpoint with explicit role assignment capabilities will be required. (Presuming `POST /auth/register` is open for any user, it implies the need for a protected admin endpoint if this registration is to be exclusive to admins).
        *   **Recommendation:** For strict admin control, a new protected endpoint `POST /admin/register-admin` might be more appropriate, requiring admin authentication.

**3.2 Student & Lecturer Information Retrieval**

*   **3.2.1 Get All Lecturers**
    *   **Functionality:** Retrieve a comprehensive list of all lecturers, primarily for contact purposes regarding student issues.
    *   **API Interaction:**
        *   Make a `GET` request to the `/public/offerings` endpoint.
        *   Extract `fullName` and `staffNo` from the `assignedLecturerIds` of each offering.
        *   De-duplicate the list to present unique lecturer profiles.
        *   **Gap:** This method provides lecturer names and staff numbers but no direct contact information (like email).
        *   **Proposed Solution:** A new endpoint `GET /admin/users?role=lecturer` would be ideal to retrieve full lecturer profiles, including email addresses.

*   **3.2.2 Get All Students**
    *   **Functionality:** Retrieve a comprehensive list of all students for contact regarding attendance, marks, and for accessing their grades.
    *   **API Interaction (Gap Analysis & Proposed Solution):**
        *   The current API lacks a direct endpoint to retrieve all students.
        *   **Proposed New Endpoint:** A new endpoint is essential:
            *   **Endpoint:** `GET /admin/users`
            *   **Query Parameter:** `role=student`
            *   **Authorization:** Requires `admin` role authentication.
            *   **Response:** A JSON array of user objects containing student details (`fullName`, `regNo`, `email`, etc.). This will be critical for the admin to contact students.

**3.3 Student Academic Oversight**

*   **3.3.1 View Student Consolidated Grades**
    *   **Functionality:** View the consolidated marksheet for a specific student for a given term and year. This addresses the requirement to "see a student's grades when lecturers post them" and identify "missing marks."
    *   **API Interaction:**
        *   Make a `GET` request to the `/admin/marksheets/consolidated` endpoint.
        *   **Query Parameters:** `term=<term>`, `year=<year>`, `studentId=<student_id>`.
        *   **Authorization:** Requires `admin` role authentication.
        *   This endpoint effectively addresses the need to view student grades.

**3.4 Issue Management & Communication**

*   **3.4.1 Student Issue Submission**
    *   **Functionality:** Allow students to submit issues or queries (e.g., missing marks, course-related problems).
    *   **API Interaction (Gap Analysis & Proposed Solution):**
        *   No existing endpoint for students to report issues.
        *   **Proposed New Endpoint:**
            *   **Endpoint:** `POST /student/issues` (or `POST /issues` if a general endpoint)
            *   **Request Body:** `issue_description`, `course_offering_id` (optional), `student_id` (from authenticated user), `type` (e.g., 'missing mark', 'general query').
            *   **Authorization:** Requires `student` role authentication.

*   **3.4.2 View Reported Issues (by Admin)**
    *   **Functionality:** Administrators can view a list of all issues reported by students, filterable by status, student, or lecturer.
    *   **API Interaction (Gap Analysis & Proposed Solution):**
        *   No existing endpoint to view reported issues.
        *   **Proposed New Endpoint:**
            *   **Endpoint:** `GET /admin/issues`
            *   **Query Parameters:** `status` (e.g., 'new', 'in-progress', 'resolved'), `studentId`, `lecturerId`.
            *   **Authorization:** Requires `admin` role authentication.
            *   **Response:** A list of issue objects, including student details, issue description, and associated course/lecturer (if applicable).

*   **3.4.3 Update Issue Status (by Admin)**
    *   **Functionality:** Administrators can update the status of an issue (e.g., mark as "in-progress" or "resolved").
    *   **API Interaction (Gap Analysis & Proposed Solution):**
        *   No existing endpoint to update issues.
        *   **Proposed New Endpoint:**
            *   **Endpoint:** `PUT /admin/issues/:id`
            *   **Request Body:** `status`, `admin_notes`.
            *   **Authorization:** Requires `admin` role authentication.

*   **3.4.4 Contact Lecturers/Students**
    *   **Functionality:** The dashboard will display contact information (primarily email) for students and lecturers to allow administrators to initiate communication *outside* the system (e.g., via email client).
    *   **API Interaction:**
        *   Relies on the `GET /admin/users?role=lecturer` and `GET /admin/users?role=student` endpoints (proposed) to retrieve email addresses and other contact details.

**3.5 Academic Context (View Only)**

*   **3.5.1 View Courses**
    *   **Functionality:** Display a list of all available courses for context.
    *   **API Interaction:** `GET /public/courses`

*   **3.5.2 View Course Offerings**
    *   **Functionality:** Display a filterable list of all course offerings for context.
    *   **API Interaction:** `GET /public/offerings`

#### **4.0 Summary of API Requirements (Updated)**

This table summarizes the necessary API endpoints, highlighting existing ones and the **new endpoints required** for the revised admin system functionality.

| Feature | HTTP Method | Endpoint | Status | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **API Login (Admin)** | `POST` | `/auth/login` | Existing | Obtain JWT for admin user |
| **Register New Admin** | `POST` | `/auth/register` | Existing | Requires admin auth & `role: 'admin'`; or new protected endpoint for strict control |
| **Get All Courses** | `GET` | `/public/courses` | Existing | |
| **Get All Offerings** | `GET` | `/public/offerings` | Existing | Provides lecturer names/staff numbers |
| **Get Consolidated Marks (by student)** | `GET` | `/admin/marksheets/consolidated` | Existing | `studentId`, `term`, `year` as query params |
| **NEW: Get All Users (by role)** | `GET` | `/admin/users` | **Required** | Query `role=student` or `role=lecturer` to get full user profiles (including email) |
| **NEW: Student Submit Issue** | `POST` | `/student/issues` | **Required** | Endpoint for students to report problems |
| **NEW: Admin View All Issues** | `GET` | `/admin/issues` | **Required** | Filterable list of reported student issues |
| **NEW: Admin Update Issue Status** | `PUT` | `/admin/issues/:id` | **Required** | Update status (e.g., 'resolved'), add admin notes |

#### **5.0 Non-Functional Requirements**

*   **Security:** The dashboard must enforce strong authentication for administrators and ensure secure communication with the backend API (HTTPS). It must prevent unauthorized access to sensitive student and administrative data.
*   **Usability:** The interface should be intuitive and easy to navigate for administrative staff, minimizing training requirements.
*   **Scalability:** The system should be designed to handle a growing number of students, lecturers, courses, and reported issues without significant performance degradation.
*   **Auditability:** Actions performed by administrators (e.g., updating issue statuses) should ideally be logged for accountability (though the current API doesn't expose an audit log, this is a good practice for the dashboard's internal logging).
