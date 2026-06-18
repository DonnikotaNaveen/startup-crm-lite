import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Contact,
  BarChart3,
  Settings,
  X,
  Activity,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

/**
 * @typedef {Object} SidebarProps
 * @property {boolean} isOpen - Toggles visibility of the sidebar drawer on mobile viewports.
 * @property {function(boolean):void} setIsOpen - Handler function to change the visibility state.
 */

/**
 * Sidebar component provides the main application navigation shell.
 * Includes a Light/Dark mode toggle near the bottom.
 *
 * @component
 * @param {SidebarProps} props
 * @returns {React.ReactElement}
 */
export default function Sidebar({ isOpen, setIsOpen }) {
  const sidebarRef = useRef(null);
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const navItems = [
    { name: "Dashboard",  path: "/",          icon: LayoutDashboard },
    { name: "Leads",      path: "/leads",      icon: Users },
    { name: "Contacts",   path: "/contacts",   icon: Contact },
    { name: "Analytics",  path: "/analytics",  icon: BarChart3 },
    { name: "Reports",    path: "/reports",    icon: BarChart3 },
    { name: "Settings",   path: "/settings",   icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300 lg:hidden"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        ref={sidebarRef}
        id="main-sidebar"
        role="navigation"
        aria-label="Main Navigation"
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col
          border-r border-slate-200/80 dark:border-gray-700
          bg-white dark:bg-gray-900
          transition-transform duration-300 ease-in-out lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Brand header */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100 dark:border-gray-700">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-gray-100">
              Startup CRM Lite
            </span>
          </div>

          {/* Mobile close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg
              text-slate-500 dark:text-gray-400
              hover:bg-slate-100 dark:hover:bg-gray-800
              hover:text-slate-700 dark:hover:text-gray-200
              transition-colors lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-xs"
                      : "text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-gray-100 hover:bg-slate-50 dark:hover:bg-gray-800"
                  }`
                }
              >
                <IconComponent className="h-5 w-5 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <div className="px-4 pb-2">
          <button
            onClick={toggleTheme}
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className="w-full flex items-center justify-between px-4 py-3 rounded-xl
              border border-slate-200/80 dark:border-gray-700
              bg-slate-50 dark:bg-gray-800
              hover:bg-slate-100 dark:hover:bg-gray-700
              text-slate-700 dark:text-gray-200
              transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer group"
          >
            <span className="text-sm font-semibold">
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </span>
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200
              ${isDarkMode
                ? "bg-amber-100 dark:bg-amber-900/40 text-amber-500"
                : "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-500"
              } group-hover:scale-110`}
            >
              {isDarkMode
                ? <Sun className="h-4.5 w-4.5" />
                : <Moon className="h-4.5 w-4.5" />
              }
            </div>
          </button>
        </div>

        {/* User profile bottom widget */}
        <div className="border-t border-slate-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full
              bg-slate-100 dark:bg-gray-700
              border border-slate-200 dark:border-gray-600
              text-slate-700 dark:text-gray-200 font-bold text-xs">
              DN
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-900 dark:text-gray-100 truncate">Donnikota Naveen</span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-gray-500 truncate">admin@crmlite.io</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
