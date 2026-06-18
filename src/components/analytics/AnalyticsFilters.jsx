import React from 'react';
import { ANALYTICS_COLORS } from '../../constants/analyticsColors';

export const AnalyticsFilters = React.memo(({ dateRange, onDateRangeChange }) => {
  const ranges = [
    { value: '7', label: 'Last 7 Days' },
    { value: '30', label: 'Last 30 Days' },
    { value: '90', label: 'Last 90 Days' },
    { value: '365', label: 'This Year' },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {ranges.map(range => (
        <button
          key={range.value}
          onClick={() => onDateRangeChange(range.value)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            dateRange === range.value
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
});

AnalyticsFilters.displayName = 'AnalyticsFilters';
