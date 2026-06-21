import React from 'react';
import { Target } from 'lucide-react';
import { formatCurrency } from '../../utils/analyticsHelpers';

export const ForecastCard = React.memo(({ forecastRevenue = 0, pipelineValue = 0, wonRevenue = 0 }) => {
  const targetBase = Math.max(forecastRevenue, pipelineValue + wonRevenue, 1);
  const forecastPercent = Math.min(100, Math.round((forecastRevenue / targetBase) * 100));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:border-gray-700 dark:bg-gray-800 h-full flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-slate-500 dark:text-gray-400">Revenue Forecast</p>
            <p className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              {formatCurrency(forecastRevenue)}
            </p>
            <p className="mt-2 text-sm font-medium text-slate-500 dark:text-gray-400">projected next 30 days</p>
          </div>
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
            <Target className="h-6 w-6" />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase text-slate-400 dark:text-gray-500">
          <span>Forecast confidence</span>
          <span>{forecastPercent}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-gray-900">
          <div className="h-full rounded-full bg-amber-500" style={{ width: `${forecastPercent}%` }} />
        </div>
      </div>
    </div>
  );
});

ForecastCard.displayName = 'ForecastCard';
