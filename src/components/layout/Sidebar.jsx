import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Contact, 
  BarChart3, 
  Settings, 
  X,
  Activity
} from "lucide-react";

/**
 * @typedef {Object} SidebarProps
 * @property {boolean} isOpen - Toggles visibility of the sidebar drawer on mobile viewports.
 * @property {function(boolean):void} setIsOpen - Handler function to change the visibility state of the sidebar.
 */

/**
 * Sidebar component provides the main application navigation shell.
 * It remains fixed on desktop resolutions and behaves as a slide-in drawer on mobile.
 *
 * @component
 * @param {SidebarProps} props - Component properties.
 * @returns {React.ReactElement} The Sidebar component.
 */
export default function Sidebar({ isOpen, setIsOpen }) {
  const sidebarRef = useRef(null);

  // Close sidebar on pressing escape key for accessible keyboard behavior
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  // Prevent background scrolling when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navItems = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Leads", path: "/leads", icon: Users },
    { name: "Contacts", path: "/contacts", icon: Contact },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "Reports", path: "/reports", icon: BarChart3 },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300 lg:hidden"
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
        className={`fixed inset-y-0 left-0 z-50 flex h-screen w-64 flex-col border-r border-slate-200/80 bg-white transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand header panel */}
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            {/* Logo representation */}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20">
              <Activity className="h-5 w-5" />
            </div>
            <span className="text-base font-extrabold tracking-tight text-slate-900">
              Startup CRM Lite
            </span>
          </div>

          {/* Close button for mobile drawer */}
          <button
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
                onClick={() => setIsOpen(false)} // Auto-close drawer on click on mobile
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
                    isActive
                      ? "bg-blue-50 text-blue-600 shadow-xs shadow-blue-100/50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                  }`
                }
              >
                <IconComponent className="h-5 w-5 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User profile bottom widget (Premium CRM appearance) */}
        <div className="border-t border-slate-100 p-4">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs">
              DN
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-slate-900 truncate">Bhaskar Naidu</span>
              <span className="text-[10px] font-semibold text-slate-400 truncate">admin@crmlite.io</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
