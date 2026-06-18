import React from 'react';

export const LoadingSkeleton = React.memo(({ count = 6 }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 animate-pulse dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-4 dark:bg-gray-700" />
            <div className="h-10 bg-slate-200 rounded w-1/2 dark:bg-gray-700" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 animate-pulse dark:border-gray-700 dark:bg-gray-800"
          >
            <div className="h-8 bg-slate-200 rounded w-1/2 mb-4 dark:bg-gray-700" />
            <div className="h-64 bg-slate-100 rounded dark:bg-gray-900" />
          </div>
        ))}
      </div>
    </div>
  );
});

LoadingSkeleton.displayName = 'LoadingSkeleton';
