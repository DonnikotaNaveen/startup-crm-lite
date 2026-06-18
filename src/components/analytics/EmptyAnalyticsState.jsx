import React from 'react';

export const EmptyAnalyticsState = React.memo(() => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
          <span className="text-3xl">📊</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">No Data Available</h3>
      <p className="text-slate-600">
        Create or import leads to see analytics and insights.
      </p>
    </div>
  );
});

EmptyAnalyticsState.displayName = 'EmptyAnalyticsState';
