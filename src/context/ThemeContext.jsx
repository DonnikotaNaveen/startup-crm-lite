/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useEffect, useState, useContext } from "react";

export const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = "startup-crm-theme";

const applyThemePreference = (enabled) => {
  document.documentElement.classList.toggle("dark", enabled);
  localStorage.setItem(THEME_STORAGE_KEY, enabled ? "dark" : "light");
};

/**
 * ThemeProvider manages global dark/light mode state.
 * Persists preference in localStorage and syncs the "dark" class
 * on document.documentElement for Tailwind CSS class-based dark mode.
 *
 * @param {{ children: React.ReactNode }} props
 */
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY);
      return saved === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    applyThemePreference(isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = useCallback(() => {
    setIsDarkMode((prev) => {
      const next = !prev;
      applyThemePreference(next);
      return next;
    });
  }, []);

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
