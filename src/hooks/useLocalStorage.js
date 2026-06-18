import { useState, useEffect } from "react";

/**
 * Reusable hook to synchronize state dynamically with localStorage.
 *
 * @param {string} key - The localStorage storage identifier.
 * @param {any} initialValue - Initial fallback value.
 * @returns {[any, Function]} A stateful value and a function to update it.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch (error) {
      console.error(`Failed to load key "${key}" from localStorage:`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Failed to save key "${key}" to localStorage:`, error);
    }
  }, [key, value]);

  return [value, setValue];
}
