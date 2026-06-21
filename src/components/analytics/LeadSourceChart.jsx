import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ANALYTICS_COLORS } from '../../constants/analyticsColors';

const tooltipStyle = { backgroundColor: '#111827', border: '1px solid #374151', borderRadius: 12, color: '#fff' };

export const LeadSourceChart = React.memo(({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 dark:border-gray-700 dark:bg-gray-800 h-full flex flex-col">
        <h3 className="text-lg font-semibold text-slate-900 mb-6 dark:text-white">Lead Sources</h3>
        <div className="flex-1 flex items-center justify-center text-slate-400 dark:text-gray-500 min-h-[300px]">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-800 h-full flex flex-col">
      <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Lead Sources</h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 10, left: 24, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" stroke="#94a3b8" tickLine={false} allowDecimals={false} />
            <YAxis dataKey="name" type="category" stroke="#94a3b8" tickLine={false} width={112} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar 
              dataKey="value" 
              radius={[0, 8, 8, 0]}
              isAnimationActive={true}
              cursor="pointer"
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={ANALYTICS_COLORS.source[entry.name] || ANALYTICS_COLORS.chart.slate} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

LeadSourceChart.displayName = 'LeadSourceChart';
