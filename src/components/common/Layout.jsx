import React, { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Menu } from "lucide-react";
import Sidebar from "../layout/Sidebar";

/**
 * LoadingSpinner component acts as a loading fallback.
 */
function LoadingSpinner() {
  return (
    <div className="flex min-h-[60vh] w-full items-center justify-center bg-slate-50/50">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
        <p className="text-sm font-medium text-slate-500 animate-pulse">Syncing CRM Workspace...</p>
      </div>
    </div>
  );
}

/**
 * Layout component renders the core application shell with the left sidebar navigation.
 * Standardizes UI spacing, fonts, and responsive behaviors for child page routes.
 *
 * @component
 * @returns {React.ReactElement} The Layout shell.
 */
export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-roboto text-slate-800 antialiased flex">
      {/* Toast notifications container */}
      <Toaster position="top-right" />

      {/* Shared Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area shifted on desktop */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64 transition-all duration-300">
        
        {/* Mobile Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/90 backdrop-blur-md px-6 shadow-xs lg:hidden">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              aria-expanded={sidebarOpen}
              aria-controls="main-sidebar"
              aria-label="Open navigation sidebar"
            >
              <Menu className="h-5.5 w-5.5" />
            </button>
            <span className="text-base font-extrabold text-slate-900 tracking-tight">
              Startup CRM Lite
            </span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs">
            BN
          </div>
        </header>

        {/* Dynamic child outlet rendering container */}
        <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
          <Suspense fallback={<LoadingSpinner />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
