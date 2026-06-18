import { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Activity, Menu } from "lucide-react";
import Sidebar from "../layout/Sidebar";
import DarkModeToggle from "./DarkModeToggle";

function LoadingSpinner() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center bg-slate-50/50 dark:bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 dark:border-blue-900 border-t-blue-600" />
        <p className="text-sm font-medium text-slate-500 dark:text-gray-400 animate-pulse">Syncing CRM Workspace...</p>
      </div>
    </div>
  );
}

/**
 * Layout component renders the core application shell with the left sidebar.
 *
 * @component
 * @returns {React.ReactElement}
 */
export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950 font-roboto text-slate-800 dark:text-gray-200 antialiased">
      <Toaster position="top-right" />

      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex min-h-screen flex-col transition-all duration-300 md:ml-64 lg:ml-72">
        {/* Mobile Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between
          border-b border-slate-200 dark:border-gray-700
          bg-white/90 dark:bg-gray-900/90
          backdrop-blur-md px-4 shadow-xs md:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-xl
                border border-slate-200 dark:border-gray-700
                text-slate-600 dark:text-gray-300
                hover:bg-slate-50 dark:hover:bg-gray-800
                transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              aria-expanded={sidebarOpen}
              aria-controls="main-sidebar"
              aria-label="Open navigation sidebar"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md shadow-blue-500/20">
                <Activity className="h-5 w-5" />
              </div>
              <span className="text-base font-extrabold text-slate-900 dark:text-gray-100 tracking-tight">
                CRM Lite
              </span>
            </div>
          </div>
          <DarkModeToggle compact />
        </header>

        {/* Page content */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-5 pb-24 sm:px-5 md:p-6 lg:p-8">
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
