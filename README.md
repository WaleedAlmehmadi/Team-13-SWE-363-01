# SWE Compass

**SWE Compass** is a high-fidelity React + Vite front-end portal designed for Software Engineering students at KFUPM. The application provides a comprehensive ecosystem for academic tracking, curriculum visualization, and role-based management in one responsive interface.

---

## 👥 Team Members

* **Aseel Bawazir**: Architect
* **Waleed Alharbi**: UI Lead
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

```bash
cd backend
npm install
npm start
```

Server runs on `http://localhost:5000`
