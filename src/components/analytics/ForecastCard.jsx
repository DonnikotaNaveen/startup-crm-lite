import React from 'react';
import { Target } from 'lucide-react';
import { formatCurrency } from '../../utils/analyticsHelpers';

export const ForecastCard = React.memo(({ forecastRevenue }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-slate-600 mb-2">Revenue Forecast</p>
          <p className="text-3xl font-bold text-slate-900">{formatCurrency(forecastRevenue)}</p>
          <p className="text-xs text-slate-500 mt-2">projected for next period</p>
        </div>
        <div className="p-3 bg-amber-50 rounded-lg">
          <Target className="w-6 h-6 text-amber-500" />
        </div>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-2">
        <div
          className="bg-amber-500 h-2 rounded-full"
          style={{ width: '65%' }}
        />
      </div>
      <p className="text-xs text-slate-500 mt-2">Based on current conversion rate and pipeline</p>
    </div>
  );
});

ForecastCard.displayName = 'ForecastCard';
