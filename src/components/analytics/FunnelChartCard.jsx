import React from 'react';
import { ANALYTICS_COLORS } from '../../constants/analyticsColors';

export const FunnelChartCard = React.memo(({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Sales Funnel</h3>
        <div className="flex h-64 items-center justify-center text-slate-400 dark:text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Sales Funnel</h3>
      <div className="space-y-4">
        {data.map((stage) => {
          const width = Math.max((stage.value / maxValue) * 100, stage.value ? 12 : 4);
          const color = ANALYTICS_COLORS.status[stage.stage] || ANALYTICS_COLORS.primary;

          return (
            <div key={stage.stage}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-slate-700 dark:text-gray-200">{stage.name}</span>
                <span className="text-sm font-semibold text-slate-500 dark:text-gray-400">{stage.value} leads</span>
              </div>
              <div className="h-10 overflow-hidden rounded-xl bg-slate-100 dark:bg-gray-900">
                <div
                  className="flex h-full items-center justify-end rounded-xl px-3 text-xs font-bold text-white transition-all"
                  style={{ width: `${width}%`, backgroundColor: color }}
                >
                  {stage.value > 0 ? `${Math.round((stage.value / maxValue) * 100)}%` : ''}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

FunnelChartCard.displayName = 'FunnelChartCard';
