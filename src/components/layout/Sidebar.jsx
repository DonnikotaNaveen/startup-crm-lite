import { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Contact,
  BarChart3,
  FileText,
  Settings,
  X,
  Activity,
} from "lucide-react";
import DarkModeToggle from "../common/DarkModeToggle";
import Avatar from "../common/Avatar";
import { useWorkspace } from "../../context/WorkspaceContext";

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
  const { profile } = useWorkspace();

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
    { name: "Dashboard", path: "/", icon: LayoutDashboard, subLabel: "Workspace overview" },
    { name: "Leads", path: "/leads", icon: Users, subLabel: "Pipeline management" },
    { name: "Contacts", path: "/contacts", icon: Contact, subLabel: "People directory" },
    { name: "Analytics", path: "/analytics", icon: BarChart3, subLabel: "Revenue insights" },
    { name: "Reports", path: "/reports", icon: FileText, subLabel: "Exports and audits" },
    { name: "Settings", path: "/settings", icon: Settings, subLabel: "Workspace controls" },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs transition-opacity duration-300 md:hidden"
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
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-72 flex-col
          border-r border-slate-200/80 dark:border-gray-700
          bg-white dark:bg-gray-900
          transition-transform duration-300 ease-in-out md:w-64 md:translate-x-0 lg:w-72
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Brand header */}
        <div className="flex h-16 items-center justify-between px-4 lg:px-6 border-b border-slate-100 dark:border-gray-700">
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
            className="flex h-11 w-11 items-center justify-center rounded-lg
              text-slate-500 dark:text-gray-400
              hover:bg-slate-100 dark:hover:bg-gray-800
              hover:text-slate-700 dark:hover:text-gray-200
              transition-colors md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-5 lg:px-4">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 lg:px-4 ${
                    isActive
                      ? "border-l-2 border-blue-500 bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 shadow-xs pl-[10px] lg:pl-[14px]"
                      : "border-l-2 border-transparent text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-gray-100 hover:bg-slate-50 dark:hover:bg-gray-800"
                  }`
                }
              >
                <IconComponent className="h-5 w-5 shrink-0" />
                <span className="flex min-w-0 flex-col">
                  <span>{item.name}</span>
                  <span className="hidden truncate text-[11px] font-semibold text-slate-400 dark:text-gray-500 lg:block">
                    {item.subLabel}
                  </span>
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Theme Toggle */}
        <div className="px-4 pb-2">
          <DarkModeToggle />
        </div>

        {/* User profile bottom widget */}
        <div className="border-t border-slate-100 dark:border-gray-700 p-4">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <Avatar name={profile.name} className="h-9 w-9 text-xs" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-900 dark:text-gray-100 truncate">{profile.name}</span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-gray-500 truncate">{profile.email}</span>
            </div>
          </div>
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-2 py-2 shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur-md md:hidden dark:border-gray-700 dark:bg-gray-900/95">
        <div className="grid grid-cols-6 gap-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                aria-label={item.name}
                title={item.name}
                className={({ isActive }) =>
                  `flex h-11 items-center justify-center rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                  }`
                }
              >
                <IconComponent className="h-5 w-5" />
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
