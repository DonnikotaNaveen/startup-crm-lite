import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ANALYTICS_COLORS } from '../../constants/analyticsColors';
import { formatCurrency } from '../../utils/analyticsHelpers';

export const RevenueChartCard = React.memo(({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Won Revenue by Month</h3>
        <div className="h-64 flex items-center justify-center text-slate-400">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Won Revenue by Month</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" stroke="#64748b" />
          <YAxis stroke="#64748b" />
          <Tooltip
            formatter={value => formatCurrency(value)}
            contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0' }}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            fill={ANALYTICS_COLORS.chart.green}
            stroke={ANALYTICS_COLORS.chart.green}
            fillOpacity={0.3}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
});

RevenueChartCard.displayName = 'RevenueChartCard';
