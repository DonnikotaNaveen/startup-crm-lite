import React from 'react';
import { Gauge, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/analyticsHelpers';

export const SalesVelocityCard = React.memo(({ salesVelocity = 0 }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-800 h-full flex flex-col justify-between">
    <div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-slate-500 dark:text-gray-400">Sales Velocity</p>
          <p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {formatCurrency(salesVelocity)}
          </p>
          <p className="mt-2 text-sm font-medium text-slate-500 dark:text-gray-400">estimated revenue pace per day</p>
        </div>
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
          <Gauge className="h-6 w-6" />
        </div>
      </div>
    </div>
    <div className="mt-6 flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600 dark:bg-gray-900 dark:text-gray-300">
      <TrendingUp className="h-4 w-4 text-emerald-600" />
      Based on opportunities, deal value, win rate, and cycle length.
    </div>
  </div>
));

SalesVelocityCard.displayName = 'SalesVelocityCard';
