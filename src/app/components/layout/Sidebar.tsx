import { NavLink } from "react-router";
import { LayoutDashboard, Map, BookOpen, Upload, Shield, Settings } from "lucide-react";

export function Sidebar() {
  const userRole = localStorage.getItem("userRole") || "student";
  
  const studentNavItems = [
    { path: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/app/roadmap", label: "Roadmap", icon: Map },
    { path: "/app/resources", label: "Resources", icon: BookOpen },
    { path: "/app/upload", label: "Upload", icon: Upload },
  ];

  const moderatorNavItems = [
    { path: "/app/moderator", label: "Moderator", icon: Shield },
  ];

  const adminNavItems = [
    { path: "/app/admin", label: "Admin", icon: Settings },
  ];

  const navItems = [
    ...studentNavItems,
    ...(userRole === "moderator" || userRole === "admin" ? moderatorNavItems : []),
    ...(userRole === "admin" ? adminNavItems : []),
  ];

  return (
    <div className="w-full shrink-0 border-b border-gray-200 bg-white shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-900 md:w-64 md:border-r md:border-b-0">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-700 md:px-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1E3A8A] to-[#06B6D4] flex items-center justify-center">
            <span className="text-white text-sm font-semibold">SC</span>
          </div>
          <span className="font-semibold text-lg text-[#1E3A8A] dark:text-white">SWE Compass</span>
        </div>
        <div className="text-xs font-medium uppercase tracking-[0.2em] text-gray-400 md:hidden">Menu</div>
      </div>

      {/* Navigation */}
      <nav className="flex gap-2 overflow-x-auto p-3 md:block md:space-y-1 md:overflow-visible md:p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex min-w-fit items-center gap-3 rounded-2xl px-4 py-3 whitespace-nowrap transition-all md:min-w-0 ${
                  isActive
                    ? "bg-[#1E3A8A] dark:bg-[#06B6D4] text-white shadow-md"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="hidden border-t border-gray-200 p-4 dark:border-gray-700 md:block">
        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
          © 2026 SWE Compass
        </div>
      </div>
    </div>
  );
}
