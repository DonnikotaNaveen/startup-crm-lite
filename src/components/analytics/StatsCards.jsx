import React from 'react';
import { BadgeDollarSign, CircleDollarSign, Clock3, Percent, TrendingDown, Users } from 'lucide-react';
import { formatCurrency, formatNumber } from '../../utils/analyticsHelpers';

const KPI_CARDS = [
  { key: 'totalLeads', label: 'Total Leads', icon: Users, tone: 'blue', format: 'number' },
  { key: 'conversionRate', label: 'Conversion Rate', icon: Percent, tone: 'emerald', format: 'percent' },
  { key: 'pipelineValue', label: 'Pipeline Value', icon: BadgeDollarSign, tone: 'cyan', format: 'currency' },
  { key: 'wonRevenue', label: 'Won Revenue', icon: CircleDollarSign, tone: 'green', format: 'currency' },
  { key: 'averageSalesCycle', label: 'Avg Sales Cycle', icon: Clock3, tone: 'amber', format: 'days' },
  { key: 'lostRate', label: 'Lost Rate', icon: TrendingDown, tone: 'rose', format: 'percent' },
];

const TONE_CLASSES = {
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  cyan: 'bg-cyan-50 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400',
  green: 'bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  rose: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
};

const formatValue = (value, format) => {
  if (format === 'currency') return formatCurrency(value);
  if (format === 'percent') return `${formatNumber(value)}%`;
  if (format === 'days') return `${formatNumber(value)} days`;
  return formatNumber(value);
};

const StatsCard = React.memo(({ label, value, format, icon: Icon, tone }) => (
  <div className="flex min-h-[160px] min-w-[170px] rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
    <div className="flex w-full flex-col justify-between">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-bold text-slate-500 dark:text-gray-400">{label}</p>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${TONE_CLASSES[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="text-center text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap lg:text-2xl dark:text-white">
        {formatValue(value, format)}
      </p>
    </div>
  </div>
));

export const StatsCards = React.memo((metrics) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-6">
    {KPI_CARDS.map((card) => (
      <StatsCard key={card.key} {...card} value={metrics[card.key]} />
    ))}
  </div>
));

StatsCard.displayName = 'StatsCard';
StatsCards.displayName = 'StatsCards';
