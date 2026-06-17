/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";

export const ThemeContext = createContext(null);

/**
 * ThemeProvider component manages the dark/light mode state and sets the proper CSS class.
 *
 * @param {Object} props - React props.
 * @param {React.ReactNode} props.children - Child components to render.
 * @returns {React.ReactElement} The ThemeContext.Provider element.
 */
export function ThemeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  /**
   * Applies or removes the 'dark' CSS class on the document root element.
   *
   * @returns {void}
   */
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  /**
   * Toggles the application theme between dark and light modes.
   *
   * @returns {void}
   */
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Custom hook to access theme context state and toggler action.
 * Throws an error if invoked outside of a ThemeProvider context.
 *
 * @returns {{ isDarkMode: boolean, toggleTheme: Function }}
 * @throws {Error} If hook is used outside ThemeProvider.
 */
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
