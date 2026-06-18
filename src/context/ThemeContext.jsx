/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";

export const ThemeContext = createContext(null);

/**
 * ThemeProvider manages global dark/light mode state.
 * Persists preference in localStorage and syncs the "dark" class
 * on document.documentElement for Tailwind CSS class-based dark mode.
 *
 * @param {{ children: React.ReactNode }} props
 */
export function ThemeProvider({ children }) {
  // Initialise from localStorage so theme is correct on first paint
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem("startup-crm-theme");
      return saved === "dark";
    } catch {
      return false;
    }
  });

  // Keep document class and localStorage in sync whenever isDarkMode changes
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
      localStorage.setItem("startup-crm-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("startup-crm-theme", "light");
    }
  }, [isDarkMode]);

  /** Toggles between dark and light mode. */
  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to access theme state and toggle.
 * Must be used inside a ThemeProvider tree.
 *
 * @returns {{ isDarkMode: boolean, toggleTheme: () => void }}
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
