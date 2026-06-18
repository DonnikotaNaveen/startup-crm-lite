import React from 'react';
import { formatCurrency } from '../../utils/analyticsHelpers';

export const TopPerformersCard = React.memo(({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-slate-900 mb-6 dark:text-white">Top Performers</h3>
        <div className="h-64 flex items-center justify-center text-slate-400 dark:text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Top Performers by Won Revenue</h3>
      <div className="space-y-4">
        {data.slice(0, 10).map((performer, index) => {
          const percentage = (performer.revenue / Math.max(...data.map(p => p.revenue), 1)) * 100;
          return (
            <div key={performer.name} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-extrabold text-slate-600 dark:bg-gray-900 dark:text-gray-300">
                {index + 1}
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-900 dark:text-gray-100">{performer.name}</span>
                  <span className="text-sm text-slate-600 dark:text-gray-400">{performer.deals} deals</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 dark:bg-gray-900">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 mt-1 block dark:text-gray-400">{formatCurrency(performer.revenue)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

TopPerformersCard.displayName = 'TopPerformersCard';
