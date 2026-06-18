import { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Menu } from "lucide-react";
import Sidebar from "../layout/Sidebar";

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
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-gray-950 font-roboto text-slate-800 dark:text-gray-200 antialiased flex">
      <Toaster position="top-right" />

      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col min-h-screen lg:ml-64 transition-all duration-300">
        {/* Mobile Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between
          border-b border-slate-200 dark:border-gray-700
          bg-white/90 dark:bg-gray-900/90
          backdrop-blur-md px-6 shadow-xs lg:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl
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
            <span className="text-base font-extrabold text-slate-900 dark:text-gray-100 tracking-tight">
              Startup CRM Lite
            </span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full
            bg-slate-100 dark:bg-gray-700
            border border-slate-200 dark:border-gray-600
            text-slate-700 dark:text-gray-200 font-bold text-xs">
            DN
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
