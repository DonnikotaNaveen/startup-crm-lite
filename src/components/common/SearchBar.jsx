import React, { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

/**
 * Debounced search input with a clear button.
 *
 * The internal `localValue` updates on every keystroke for instant visual
 * feedback, while the debounced `onChange` prop fires 300 ms after the user
 * stops typing — keeping filtering performant on large lists.
 *
 * @param {Object} props
 * @param {string}   props.value     - Controlled value driven by parent.
 * @param {Function} props.onChange  - Called with the debounced string.
 */
export default function SearchBar({ value, onChange }) {
  // Keep a local mirror so the input stays snappy while we debounce upward
  const [localValue, setLocalValue] = useState(value ?? "");
  const debounceRef = useRef(null);

  // Sync local state when parent resets value (e.g. clear-all-filters)
  useEffect(() => {
    setLocalValue(value ?? "");
  }, [value]);

  const handleChange = (e) => {
    const next = e.target.value;
    setLocalValue(next);

    // Clear any in-flight debounce before starting a new one
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange(next);
    }, 300);
  };

  const handleClear = () => {
    setLocalValue("");
    if (debounceRef.current) clearTimeout(debounceRef.current);
    onChange("");
  };

  // Cleanup on unmount
  useEffect(() => () => clearTimeout(debounceRef.current), []);

  return (
    <div className="relative flex-1">
      {/* Magnifying glass icon */}
      <Search
        className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none"
        aria-hidden="true"
      />

      <input
        type="text"
        aria-label="Search leads"
        placeholder="Search by name, company, or email..."
        value={localValue}
        onChange={handleChange}
        className="w-full pl-10 pr-9 py-2.5 bg-slate-50 focus:bg-white border border-slate-200/60 focus:border-blue-500 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
      />

      {/* Clear (×) button — only shown when there is text */}
      {localValue && (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center h-5 w-5 rounded-full bg-slate-300/70 hover:bg-slate-400/70 text-slate-600 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
