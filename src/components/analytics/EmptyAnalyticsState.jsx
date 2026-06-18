import React from 'react';
import { BarChart3 } from 'lucide-react';

export const EmptyAnalyticsState = React.memo(() => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex justify-center mb-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          <BarChart3 className="h-8 w-8" />
        </div>
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2 dark:text-white">No analytics data yet</h3>
      <p className="text-slate-600 dark:text-gray-400">
        Create or import leads to see analytics and insights.
      </p>
    </div>
  );
});

EmptyAnalyticsState.displayName = 'EmptyAnalyticsState';
