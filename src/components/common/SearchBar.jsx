import { useEffect, useRef, useState } from "react";
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

  const displayedValue = value === "" ? "" : localValue;

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
        className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none dark:text-gray-500"
        aria-hidden="true"
      />

      <input
        type="text"
        aria-label="Search leads"
        placeholder="Search by name, company, or email..."
        value={displayedValue}
        onChange={handleChange}
        className="min-h-11 w-full pl-10 pr-11 py-2.5 bg-slate-50 focus:bg-white border border-slate-200/60 focus:border-blue-500 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:bg-gray-900 dark:focus:border-blue-500"
      />

      {/* Clear (×) button — only shown when there is text */}
      {displayedValue && (
        <button
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-1.5 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-slate-600 transition-colors duration-150 hover:text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-gray-300 dark:hover:text-white"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
