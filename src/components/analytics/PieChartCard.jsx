import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ANALYTICS_COLORS } from '../../constants/analyticsColors';

const tooltipStyle = { backgroundColor: '#111827', border: '1px solid #374151', borderRadius: 12, color: '#fff' };

export const PieChartCard = React.memo(({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 dark:border-gray-700 dark:bg-gray-800 h-full flex flex-col">
        <h3 className="text-lg font-semibold text-slate-900 mb-6 dark:text-white">Lead Status Distribution</h3>
        <div className="flex-1 flex items-center justify-center text-slate-400 dark:text-gray-500 min-h-[300px]">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-800 h-full flex flex-col">
      <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Lead Status Distribution</h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              innerRadius={56}
              outerRadius={80}
              dataKey="value"
              paddingAngle={2}
              isAnimationActive={true}
              cursor="pointer"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={ANALYTICS_COLORS.status[entry.name]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
            <Legend
              iconType="circle"
              formatter={(value) => <span className="text-slate-600 dark:text-gray-300">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

PieChartCard.displayName = 'PieChartCard';
