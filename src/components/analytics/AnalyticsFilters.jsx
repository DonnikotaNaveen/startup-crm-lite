import React from 'react';

export const AnalyticsFilters = React.memo(({ dateRange, onDateRangeChange }) => {
  const ranges = [
    { value: '7', label: 'Last 7 Days' },
    { value: '30', label: 'Last 30 Days' },
    { value: '90', label: 'Last 90 Days' },
    { value: 'year', label: 'This Year' },
  ];

  return (
    <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {ranges.map(range => (
        <button
          key={range.value}
          onClick={() => onDateRangeChange(range.value)}
          className={`rounded-xl px-3 py-2 text-sm font-bold transition-all sm:px-4 ${
            dateRange === range.value
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
});

AnalyticsFilters.displayName = 'AnalyticsFilters';
