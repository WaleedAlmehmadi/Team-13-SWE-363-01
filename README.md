# SWE Compass

**SWE Compass** is a high-fidelity React + Vite front-end portal designed for Software Engineering students at KFUPM. The application provides a comprehensive ecosystem for academic tracking, curriculum visualization, and role-based management in one responsive interface.

---

## 👥 Team Members

* **Aseel Bawazir**: Architect
* **Waleed Almehmadi**: UI Lead
* **Sultan Alsbia**: Feature Developer A
* **Amin Srraj**: Feature Developer B
* **Abdullah Alzahrani**: QA and Documentation

---

## ✨ Features

* **Personalized Dashboard**: Real-time course summaries with search, status filtering, and interactive progress tracking.
* **Interactive Roadmap**: A visual semester-by-semester breakdown including course details, prerequisite mapping, and filters.
* **Resource Library**: A centralized hub for exams and notes with advanced category filtering and search.
* **Smart Upload Flow**: Resource submission system featuring real-time validation and submission feedback.
* **Authentication & Profile**: Login, signup, and user settings with interactive form validation.
* **Responsive Design**: Fully optimized layout featuring a desktop sidebar and a mobile navigation drawer using Tailwind CSS 4.
* **Role-Based Access (RBAC)**: Strict interface isolation for Students, Moderators, and Admins.

---

## 🔑 Testing Credentials (Prototype Mode)

| Role | Email | Password |
| :--- | :--- | :--- |
| **Student** | *any@email.com* | `123456` |
| **Moderator** | `mod@kfupm.edu.sa` | `123456` |
| **Admin** | `admin@kfupm.edu.sa` | `123456` |

---

## 🛠 Tech Stack

* **Framework**: React 19
* **Build Tool**: Vite 6 (Updated config)
* **Routing**: React Router 7 (Nested & Protected Routes)
* **Styling**: Tailwind CSS 4 & PostCSS
* **Icons**: Lucide React
* **Linting**: ESLint 9

---

## 🚀 Setup & Installation

### Prerequisites
* **Node.js**: version 18 or higher
* **npm**: version 9 or higher

### Execution Commands

| Action | Command |
| :--- | :--- |
| **Install Dependencies** | `npm install` |
| **Start Development Server** | `npm run dev` |
| **Build for Production** | `npm run build` |
| **Run ESLint Check** | `npm run lint` |
| **Preview Production Build** | `npm run preview` |

---

## 📦 Main Dependencies

### Runtime
* `react`, `react-dom`
* `react-router-dom`
* `lucide-react`
* `@tailwindcss/vite`

### Development
* `vite`, `@vitejs/plugin-react`
* `tailwindcss`, `@tailwindcss/postcss`, `postcss`, `autoprefixer`
* `eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`

---

## 🛣 Application Routes

* `/` — Landing / Overview
* `/login` & `/signup` — Authentication
* `/app/dashboard` — Student Dashboard
* `/app/roadmap` — Curriculum Roadmap
* `/app/library` — Resource Library
* `/app/upload` — Submission Portal
* `/app/profile` — User Settings
* `/app/moderator` — Review Center (Mod Only)
* `/app/admin` — Analytics (Admin Only)

---

## ✅ QA Summary

* **Responsive Audit**: Verified behavior for shared layouts, profile actions, and navigation across all breakpoints.
* **Logic Verification**: Confirmed interactive filtering in resource views and roadmap cards.
* **Validation**: Added comprehensive upload-form validation and success state feedback.
* **Build Integrity**: Project successfully passes `npm run build` and `npm run lint` with zero errors.

---

## 📂 Project Structure

```text
src/
 ├── components/
 │    ├── layout/      # Sidebar, Header, and Root Layout
 │    └── ui/          # Reusable UI elements (Buttons, Inputs, etc.)
 ├── data/             # Mock data for courses and resources
 ├── layouts/          # Wrapper components for different auth states
 ├── pages/            # Page-level components (Dashboard, Roadmap, etc.)
 └── routes.tsx        # Centralized RBAC and Navigation logic
public/                # Static assets and icons
```

---

## Backend Setup

### Prerequisites
* **Node.js**: version 18 or higher
* **MongoDB Atlas**: a free cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

### Environment Variables

Copy `.env.example` to `.env` inside the `backend/` folder and fill in your values:

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/swe-compass
JWT_SECRET=your_super_secret_key_here
```

### Run the Backend

```bash
cd backend
npm install
npm start
```

Server runs on `http://localhost:5000`

---

## 🗄 Database Schema

### User

| Field | Type | Notes |
| :--- | :--- | :--- |
| `_id` | ObjectId | Auto-generated primary key |
| `fullName` | String | Required |
| `email` | String | Required · unique · must end in `@kfupm.edu.sa` |
| `studentId` | String | 9 digits · unique · optional for admin/mod |
| `password` | String | Bcrypt-hashed · never returned in API responses |
| `role` | String | `student` (default) · `moderator` · `admin` |
| `createdAt` | Date | Auto-set by Mongoose timestamps |
| `updatedAt` | Date | Auto-set by Mongoose timestamps |

### Resource

| Field | Type | Notes |
| :--- | :--- | :--- |
| `_id` | ObjectId | Auto-generated primary key |
| `title` | String | Required |
| `description` | String | Required |
| `courseName` | String | Required (e.g. `ICS 202 - Data Structures`) |
| `category` | String | Enum: Lecture Notes · Past Exams · Lab Materials · Project Templates · Study Guides · Reference Materials · Video Tutorials · Other |
| `type` | String | `file` or `link` |
| `fileUrl` | String | Path/URL of uploaded document (PDF, DOCX, PPTX) |
| `resourceUrl` | String | External link (YouTube, GitHub, Drive, etc.) |
| `uploadedBy` | ObjectId | Ref → User (required) |
| `reviewedBy` | ObjectId | Ref → User (set by moderator) |
| `status` | String | `pending` (default) · `approved` · `rejected` |
| `rejectionReason` | String | Populated when status is `rejected` |
| `rating` | Number | 0–5, default 0 |
| `ratingCount` | Number | Number of ratings received |
| `createdAt` | Date | Auto-set by Mongoose timestamps |

```
User ──────────────────────────────────────────┐
 _id, fullName, email, studentId               │ uploadedBy
 password (hashed), role, timestamps           │
                                               ▼
                                          Resource
                                    title, description
                                    courseName, category
                                    type, fileUrl, resourceUrl
                                    status, rating, timestamps
                                               │ reviewedBy
                                               ▼
                                    User (moderator/admin)
```

---

## 🔐 Authentication API

Base URL: `http://localhost:5000/api/auth`

### `POST /register`

Creates a new student account.

**Request Body**
```json
{
  "fullName": "Abdullah Alzahrani",
  "email": "s202100000@kfupm.edu.sa",
  "studentId": "202100000",
  "password": "securepassword"
}
```

**Success Response** `201 Created`
```json
{
  "token": "<JWT>",
  "user": {
    "id": "...",
    "fullName": "Abdullah Alzahrani",
    "email": "s202100000@kfupm.edu.sa",
    "studentId": "202100000",
    "role": "student"
  }
}
```

**Error Responses**

| Status | Message |
| :--- | :--- |
| `400` | Must use a KFUPM email address (@kfupm.edu.sa) |
| `400` | Email already registered |
| `400` | Student ID already in use |
| `400` | Validation error (e.g. password too short) |

---

### `POST /login`

Authenticates an existing user.

**Request Body**
```json
{
  "email": "s202100000@kfupm.edu.sa",
  "password": "securepassword"
}
```

**Success Response** `200 OK`
```json
{
  "token": "<JWT>",
  "user": {
    "id": "...",
    "fullName": "Abdullah Alzahrani",
    "email": "s202100000@kfupm.edu.sa",
    "studentId": "202100000",
    "role": "student"
  }
}
```

**Error Responses**

| Status | Message |
| :--- | :--- |
| `400` | Email and password are required |
| `401` | Invalid email or password |

---

### `GET /me`

Returns the currently authenticated user. Requires `Authorization: Bearer <token>` header.

**Success Response** `200 OK`
```json
{
  "id": "...",
  "fullName": "Abdullah Alzahrani",
  "email": "s202100000@kfupm.edu.sa",
  "studentId": "202100000",
  "role": "student",
  "createdAt": "2026-04-22T00:00:00.000Z"
}
```

**Error Responses**

| Status | Message |
| :--- | :--- |
| `401` | Not authorized, no token |
| `401` | Not authorized, invalid token |
