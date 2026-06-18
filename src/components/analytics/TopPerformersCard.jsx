import React from 'react';
import { formatCurrency } from '../../utils/analyticsHelpers';

export const TopPerformersCard = React.memo(({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Top Performers</h3>
        <div className="h-64 flex items-center justify-center text-slate-400">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Top Performers</h3>
      <div className="space-y-4">
        {data.slice(0, 10).map((performer, index) => {
          const percentage = (performer.revenue / Math.max(...data.map(p => p.revenue))) * 100;
          return (
            <div key={performer.name} className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-600 w-20">{index + 1}.</span>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-900">{performer.name}</span>
                  <span className="text-sm text-slate-600">{performer.deals} deals</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs text-slate-500 mt-1 block">{formatCurrency(performer.revenue)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

TopPerformersCard.displayName = 'TopPerformersCard';
