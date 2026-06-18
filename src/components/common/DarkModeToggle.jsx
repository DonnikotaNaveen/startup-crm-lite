import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function DarkModeToggle({ compact = false }) {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDarkMode}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={`group inline-flex items-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 ${
        compact ? "gap-2 px-2.5 py-2" : "w-full justify-between gap-3 px-4 py-3"
      }`}
    >
      {!compact && (
        <span className="text-sm font-bold">
          {isDarkMode ? "Dark Mode" : "Light Mode"}
        </span>
      )}

      <span className="relative inline-flex h-7 w-12 shrink-0 items-center rounded-full bg-slate-200 transition-colors duration-200 dark:bg-blue-600">
        <span
          className={`inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white text-slate-500 shadow-sm transition-all duration-200 ${
            isDarkMode ? "translate-x-6 text-blue-600" : "translate-x-1 text-amber-500"
          }`}
        >
          {isDarkMode ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
        </span>
      </span>

      {compact && (
        <span className="hidden text-xs font-bold sm:inline">
          {isDarkMode ? "Dark" : "Light"}
        </span>
      )}
    </button>
  );
}
