import { Bell, Search, Moon, Sun, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useTheme } from "../../context/ThemeContext";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useMemo, useState } from "react";
import { resources } from "../../data/resources";
import { allCourses } from "../../data/roadmap";

type SearchResult = {
  id: string;
  type: "course" | "resource";
  title: string;
  subtitle: string;
  path: string;
};

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New resource uploaded",
      description: "A new software architecture guide was added to the library.",
    },
    {
      id: 2,
      title: "Roadmap updated",
      description: "Your semester roadmap has been refreshed with current progress.",
    },
  ];

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get("q") ?? "");
  }, [location.search]);

  const searchResults = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return [];
    }

    const courseResults: SearchResult[] = allCourses
      .filter(
        (course) =>
          course.code.toLowerCase().includes(normalizedQuery) ||
          course.name.toLowerCase().includes(normalizedQuery),
      )
      .map((course) => ({
        id: course.id,
        type: "course",
        title: course.code,
        subtitle: course.name,
        path: `/app/roadmap?course=${course.id}`,
      }));

    const resourceResults: SearchResult[] = resources
      .filter(
        (resource) =>
          resource.title.toLowerCase().includes(normalizedQuery) ||
          resource.description.toLowerCase().includes(normalizedQuery) ||
          resource.category.toLowerCase().includes(normalizedQuery) ||
          resource.author.toLowerCase().includes(normalizedQuery),
      )
      .map((resource) => ({
        id: resource.id,
        type: "resource",
        title: resource.title,
        subtitle: `${resource.category} · ${resource.author}`,
        path: `/app/resources?q=${encodeURIComponent(searchQuery.trim())}`,
      }));

    return [...courseResults, ...resourceResults].slice(0, 6);
  }, [searchQuery]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const handleSearchSubmit = () => {
    const trimmedQuery = searchQuery.trim();
    if (!trimmedQuery) {
      return;
    }

    const firstResult = searchResults[0];
    if (firstResult) {
      navigate(firstResult.path);
    } else {
      navigate(`/app/resources?q=${encodeURIComponent(trimmedQuery)}`);
    }

    setShowSearchResults(false);
  };

  const handleSearchSelect = (result: SearchResult) => {
    if (result.type === "course") {
      setSearchQuery(result.title);
    }

    navigate(result.path);
    setShowSearchResults(false);
  };

  return (
    <header className="flex flex-col gap-4 border-b border-gray-200 bg-white px-4 py-4 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-900 sm:px-6 md:h-16 md:flex-row md:items-center md:justify-between md:px-8 md:py-0">
      <div className="w-full flex-1 md:max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search courses, resources..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchResults(true);
            }}
            onFocus={() => setShowSearchResults(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSearchSubmit();
              }
            }}
            className="w-full rounded-2xl border border-gray-200 bg-[#F8FAFC] py-2 pl-10 pr-4 text-gray-900 transition-colors placeholder:text-gray-500 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#06B6D4] dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder:text-gray-400"
          />

          {showSearchResults && searchQuery.trim() && (
            <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-900">
              {searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <button
                    key={`${result.type}-${result.id}`}
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      handleSearchSelect(result);
                    }}
                    className="flex w-full items-start justify-between gap-4 border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                  >
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {result.title}
                      </div>
                      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {result.subtitle}
                      </div>
                    </div>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                      {result.type}
                    </span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                  No matches found. Press Enter to search resources.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 md:justify-end md:gap-4">
        <button
          onClick={toggleTheme}
          className="rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setShowNotifications((current) => !current);
              setShowUserMenu(false);
            }}
            className="relative rounded-full p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            aria-label="Open notifications"
            aria-expanded={showNotifications}
          >
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#10B981]"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 z-50 mt-2 w-80 rounded-xl border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <div className="border-b border-gray-100 px-4 pb-2 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100">
                Notifications
              </div>
              <div className="py-1">
                {notifications.map((notification) => (
                  <button
                    key={notification.id}
                    type="button"
                    className="w-full px-4 py-3 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {notification.title}
                    </div>
                    <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      {notification.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative flex items-center gap-3 border-l border-gray-200 pl-3 dark:border-gray-700 md:pl-4">
          <div className="hidden text-right sm:block">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-100">Abdullah Alzahrani</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Student</div>
          </div>
          <button
            type="button"
            onClick={() => {
              setShowUserMenu((current) => !current);
              setShowNotifications(false);
            }}
            className="relative"
          >
            <Avatar className="h-10 w-10 cursor-pointer transition-all hover:ring-2 hover:ring-[#06B6D4]">
              <AvatarFallback className="bg-[#1E3A8A] text-white">AA</AvatarFallback>
            </Avatar>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-12 z-50 mt-2 w-48 rounded-xl border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-700 dark:bg-gray-800">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
