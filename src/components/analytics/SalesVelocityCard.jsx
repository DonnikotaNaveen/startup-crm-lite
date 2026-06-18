import React from 'react';
import { TrendingUp, Target } from 'lucide-react';
import { formatCurrency } from '../../utils/analyticsHelpers';

export const SalesVelocityCard = React.memo(({ salesVelocity, forecastRevenue }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-slate-600 mb-2">Sales Velocity</p>
            <p className="text-3xl font-bold text-slate-900">{salesVelocity}</p>
            <p className="text-xs text-slate-500 mt-2">deals per week</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-slate-600 mb-2">Revenue Forecast</p>
            <p className="text-3xl font-bold text-slate-900">{formatCurrency(forecastRevenue)}</p>
            <p className="text-xs text-slate-500 mt-2">next period</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-lg">
            <Target className="w-6 h-6 text-amber-500" />
          </div>
        </div>
      </div>
    </div>
  );
});

SalesVelocityCard.displayName = 'SalesVelocityCard';
