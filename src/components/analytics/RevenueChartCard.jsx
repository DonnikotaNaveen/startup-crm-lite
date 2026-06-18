import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ANALYTICS_COLORS } from '../../constants/analyticsColors';
import { formatCurrency } from '../../utils/analyticsHelpers';

const tooltipStyle = { backgroundColor: '#111827', border: '1px solid #374151', borderRadius: 12, color: '#fff' };

export const RevenueChartCard = React.memo(({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 dark:border-gray-700 dark:bg-gray-800">
        <h3 className="text-lg font-semibold text-slate-900 mb-6 dark:text-white">Won Revenue by Month</h3>
        <div className="h-64 flex items-center justify-center text-slate-400 dark:text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">Won Revenue by Month</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 5, right: 10, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="wonRevenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={ANALYTICS_COLORS.chart.green} stopOpacity={0.35} />
              <stop offset="95%" stopColor={ANALYTICS_COLORS.chart.green} stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="date" stroke="#94a3b8" tickLine={false} />
          <YAxis stroke="#94a3b8" tickFormatter={(value) => formatCurrency(value)} tickLine={false} />
          <Tooltip
            formatter={value => formatCurrency(value)}
            contentStyle={tooltipStyle}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            fill="url(#wonRevenueGradient)"
            stroke={ANALYTICS_COLORS.chart.green}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

RevenueChartCard.displayName = 'RevenueChartCard';
