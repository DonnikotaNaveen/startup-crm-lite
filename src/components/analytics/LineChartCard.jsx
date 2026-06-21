import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ANALYTICS_COLORS } from '../../constants/analyticsColors';

const tooltipStyle = { backgroundColor: '#111827', border: '1px solid #374151', borderRadius: 12, color: '#fff' };

export const LineChartCard = React.memo(({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 dark:border-gray-700 dark:bg-gray-800 h-full flex flex-col">
        <h3 className="text-lg font-semibold text-slate-900 mb-6 dark:text-white">Monthly Conversion Rate</h3>
        <div className="flex-1 flex items-center justify-center text-slate-400 dark:text-gray-500 min-h-[300px]">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-800 h-full flex flex-col">
      <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Monthly Conversion Rate</h3>
      <div className="flex-1">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 10, left: -12, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="date" stroke="#94a3b8" tickLine={false} />
            <YAxis stroke="#94a3b8" tickFormatter={(value) => `${value}%`} tickLine={false} />
            <Tooltip formatter={(value) => `${value}%`} contentStyle={tooltipStyle} />
            <Line
              type="monotone"
              dataKey="rate"
              stroke={ANALYTICS_COLORS.chart.green}
              strokeWidth={2}
              dot={{ fill: ANALYTICS_COLORS.chart.green, r: 4 }}
              activeDot={{ r: 6 }}
              isAnimationActive={true}
              cursor="pointer"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
});

LineChartCard.displayName = 'LineChartCard';
