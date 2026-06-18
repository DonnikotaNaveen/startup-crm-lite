import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../components/common/Layout";

// Lazy-loaded page components for quick initial bundles
const Dashboard = React.lazy(() => import("../pages/Dashboard")); 
const Leads = React.lazy(() => import("../pages/Leads")); 
const Analytics = React.lazy(() => import("../pages/Analytics")); 
const Contacts = React.lazy(() => import("../pages/Contacts")); 
const Reports = React.lazy(() => import("../pages/Reports")); 
const Settings = React.lazy(() => import("../pages/Settings")); 
const NotFound = React.lazy(() => import("../pages/NotFound")); 

/**
 * AppLoading component serves as the global suspension fallback indicator
 * for lazy-loaded route views.
 */
function AppLoading() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8FAFC]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />
        <p className="text-sm font-semibold text-slate-500 animate-pulse">Syncing CRM Workspace...</p>
      </div>
    </div>
  );
}

/**
 * AppRoutes defines the navigation tree of Startup CRM Lite.
 * Integrates Dashboard directly, and groups all other workspace views inside Layout.
 *
 * @component
 * @returns {React.ReactElement} The app routes config.
 */
export default function AppRoutes() {
  return (
    <React.Suspense fallback={<AppLoading />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />

          {/* Route for Lead Management */}
          <Route path="leads" element={<Leads />} />

          {/* Route for CRM Analytics */}
          <Route path="analytics" element={<Analytics />} />

          {/* Route for Contacts Directory */}
          <Route path="contacts" element={<Contacts />} />

          {/* Route for Reports list */}
          <Route path="reports" element={<Reports />} />

          {/* Route for Settings configurations */}
          <Route path="settings" element={<Settings />} />

          {/* Catch-all page renders inside Layout shell */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
}
