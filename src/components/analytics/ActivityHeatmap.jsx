import React from 'react';

const HOURS = [0, 4, 8, 12, 16, 20, 23];

export const ActivityHeatmap = React.memo(({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Activity Heatmap</h3>
        <div className="flex h-64 items-center justify-center text-slate-400 dark:text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  const maxActivity = Math.max(...data.flatMap((day) => day.hours.map((hour) => hour.count)), 1);

  const getColor = (count) => {
    if (count === 0) return 'bg-slate-50 border-slate-100 dark:border-gray-700 dark:bg-gray-900';
    const intensity = (count / maxActivity) * 100;
    if (intensity < 25) return 'bg-cyan-100 border-cyan-100';
    if (intensity < 50) return 'bg-cyan-300 border-cyan-300';
    if (intensity < 75) return 'bg-blue-500 border-blue-500';
    return 'bg-blue-700 border-blue-700';
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-6 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Activity Heatmap</h3>
          <p className="text-sm font-medium text-slate-500 dark:text-gray-400">Lead creation volume by day and hour.</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[760px]">
          <div className="mb-2 grid grid-cols-[42px_repeat(24,minmax(0,1fr))] gap-1 text-[10px] font-bold text-slate-400 dark:text-gray-500">
            <span />
            {Array.from({ length: 24 }, (_, hour) => (
              <span key={hour} className={HOURS.includes(hour) ? 'text-center' : 'text-transparent'}>
                {hour}
              </span>
            ))}
          </div>
          <div className="space-y-1">
            {data.map((day) => (
              <div key={day.day} className="grid grid-cols-[42px_repeat(24,minmax(0,1fr))] gap-1">
                <span className="flex items-center text-xs font-bold text-slate-500 dark:text-gray-400">{day.day}</span>
                {day.hours.map((hour) => (
                  <div
                    key={`${day.day}-${hour.hour}`}
                    className={`h-6 rounded-md border transition-all hover:scale-110 cursor-pointer ${getColor(hour.count)}`}
                    title={`${day.day} ${hour.hour}:00 - ${hour.count} leads`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3 text-xs font-semibold text-slate-500 dark:text-gray-400">
        <span>Less</span>
        <div className="flex gap-1">
          <div className="h-4 w-4 rounded bg-slate-50 ring-1 ring-slate-100 dark:bg-gray-900 dark:ring-gray-700" />
          <div className="h-4 w-4 rounded bg-cyan-100" />
          <div className="h-4 w-4 rounded bg-cyan-300" />
          <div className="h-4 w-4 rounded bg-blue-500" />
          <div className="h-4 w-4 rounded bg-blue-700" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
});

ActivityHeatmap.displayName = 'ActivityHeatmap';
