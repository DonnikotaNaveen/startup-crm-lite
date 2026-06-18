import React from 'react';

export const ActivityHeatmap = React.memo(({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Activity Heatmap</h3>
        <div className="h-64 flex items-center justify-center text-slate-400">
          No data available
        </div>
      </div>
    );
  }

  const maxActivity = Math.max(
    ...data.flatMap(day => day.hours.map(h => h.count))
  );

  const getColor = (count) => {
    if (count === 0) return 'bg-slate-50';
    const intensity = (count / maxActivity) * 100;
    if (intensity < 25) return 'bg-blue-100';
    if (intensity < 50) return 'bg-blue-300';
    if (intensity < 75) return 'bg-blue-500';
    return 'bg-blue-700';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Activity Heatmap (24h)</h3>
      <div className="overflow-x-auto">
        <div className="flex gap-2">
          {data.map(day => (
            <div key={day.day} className="flex flex-col gap-1">
              <p className="text-xs font-medium text-slate-600 text-center w-8">{day.day}</p>
              {day.hours.map(hour => (
                <div
                  key={`${day.day}-${hour.hour}`}
                  className={`w-8 h-8 rounded ${getColor(hour.count)}`}
                  title={`${hour.hour}:00 - ${hour.count} leads`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs">
        <span className="text-slate-600">Less</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 bg-slate-50 border border-slate-200" />
          <div className="w-4 h-4 bg-blue-100" />
          <div className="w-4 h-4 bg-blue-300" />
          <div className="w-4 h-4 bg-blue-500" />
          <div className="w-4 h-4 bg-blue-700" />
        </div>
        <span className="text-slate-600">More</span>
      </div>
    </div>
  );
});

ActivityHeatmap.displayName = 'ActivityHeatmap';
