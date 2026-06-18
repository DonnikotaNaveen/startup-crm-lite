import { NavLink } from "react-router-dom"; // Import NavLink for standard active-state aware navigation
import { LayoutDashboard, Users, BarChart3, Activity } from "lucide-react"; // Import icons from Lucide for clear visual identifiers
import DarkModeToggle from "./DarkModeToggle";
import Avatar from "./Avatar";
import { useWorkspace } from "../../context/WorkspaceContext";

/**
 * Navbar component renders a sticky glassmorphic navigation header
 * that handles page transitions and highlights the active route.
 */
export default function Navbar() {
  const { profile } = useWorkspace();
  // Navigation items configuration for easy extensibility and clean rendering
  const navItems = [
    { path: "/", label: "Dashboard", icon: LayoutDashboard },
    { path: "/leads", label: "Leads", icon: Users },
    { path: "/analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    // Sticky container with backdrop blur, subtle shadow, and light border to create a premium glass feel
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-all duration-300 dark:border-gray-700 dark:bg-gray-900/85">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Logo / Brand identity section */}
          <div className="flex items-center gap-2.5">
            {/* Glowing gradient background wrapper for the CRM icon */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20">
              <Activity className="h-5.5 w-5.5" />
            </div>
            {/* Brand naming with modern typography */}
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900 leading-none dark:text-white">CRM Lite</span>
              <span className="text-[10px] font-medium text-slate-500 tracking-wider uppercase dark:text-gray-400">Startup Accelerator</span>
            </div>
          </div>

          {/* Center Navigation Links - Desktop Version */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon; // Resolve dynamic icon component
              return (
                <NavLink
                  key={item.path} // React key for list items
                  to={item.path} // Navigation path target
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 shadow-sm shadow-blue-100/50 dark:bg-blue-950/60 dark:text-blue-400 dark:shadow-none" // Active styling with subtle background and colored text
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white" // Inactive styling with hover state transitions
                    }`
                  }
                >
                  <Icon className="h-4.5 w-4.5" /> {/* Render icon component */}
                  <span>{item.label}</span> {/* Render label text */}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Header Controls - Mock Profile Avatar and Notifications */}
          <div className="flex items-center gap-4">
            {/* Decorative Active Indicators for CRM status */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 dark:bg-emerald-950/40 dark:border-emerald-900">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Live Workspace</span>
            </div>

            <DarkModeToggle compact />

            {/* User Avatar Circle */}
            <Avatar name={profile.name} className="h-9 w-9 cursor-pointer hover:opacity-90 transition-opacity" />
          </div>

        </div>
      </div>
    </header>
  );
}
