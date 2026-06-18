import React from 'react';
import { TrendingUp } from 'lucide-react';
import { formatCurrency, formatNumber, formatCompactNumber } from '../../utils/analyticsHelpers';

const StatsCard = React.memo(({ label, value, format = 'number', trend, icon: Icon }) => {
  const formattedValue = React.useMemo(() => {
    if (format === 'currency') return formatCurrency(value);
    if (format === 'compact') return formatCompactNumber(value);
    if (format === 'percent') return `${value}%`;
    return formatNumber(value);
  }, [value, format]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-2">{label}</p>
          <p className="text-3xl font-bold text-slate-900">{formattedValue}</p>
        </div>
        {Icon && (
          <div className="p-3 bg-blue-50 rounded-lg">
            <Icon className="w-6 h-6 text-blue-500" />
          </div>
        )}
      </div>
      {trend && (
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span className="text-sm text-green-600">{trend}</span>
        </div>
      )}
    </div>
  );
});

export const StatsCards = React.memo(({
  totalLeads,
  conversionRate,
  pipelineValue,
  wonRevenue,
  averageSalesCycle,
  lostRate,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
      <StatsCard label="Total Leads" value={totalLeads} format="number" />
      <StatsCard label="Conversion Rate" value={conversionRate} format="percent" />
      <StatsCard label="Pipeline Value" value={pipelineValue} format="currency" />
      <StatsCard label="Won Revenue" value={wonRevenue} format="currency" />
      <StatsCard label="Avg Sales Cycle" value={averageSalesCycle} format="number" />
      <StatsCard label="Lost Rate" value={lostRate} format="percent" />
    </div>
  );
});

StatsCard.displayName = 'StatsCard';
StatsCards.displayName = 'StatsCards';
