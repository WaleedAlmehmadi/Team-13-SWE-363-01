import { createBrowserRouter, Navigate } from "react-router";
import { Root } from "./components/layout/Root";
import { Overview } from "./components/pages/Overview";
import { Login } from "./components/pages/Login";
import { SignUp } from "./components/pages/SignUp";
import { Dashboard } from "./components/pages/Dashboard";
import { Roadmap } from "./components/pages/Roadmap";
import { Resources } from "./components/pages/Resources";
import { Upload } from "./components/pages/Upload";
import { Moderator } from "./components/pages/Moderator";
import { Admin } from "./components/pages/Admin";
import { NotFound } from "./components/pages/NotFound";
import { Profile } from "./components/pages/Profile";

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Overview,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/app",
    element: (
      <ProtectedRoute>
        <Root />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      { path: "dashboard", Component: Dashboard },
      { path: "roadmap", Component: Roadmap },
      { path: "resources", Component: Resources },
      { path: "upload", Component: Upload },
      { path: "moderator", Component: Moderator },
      { path: "admin", Component: Admin },
      { path: "profile", Component: Profile },
      { path: "*", Component: NotFound },
    ],
  },
]);