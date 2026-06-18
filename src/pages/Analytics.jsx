import React, { useState } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import { AnalyticsFilters } from '../components/analytics/AnalyticsFilters';
import { StatsCards } from '../components/analytics/StatsCards';
import { PieChartCard } from '../components/analytics/PieChartCard';
import { FunnelChartCard } from '../components/analytics/FunnelChartCard';
import { BarChartCard } from '../components/analytics/BarChartCard';
import { LineChartCard } from '../components/analytics/LineChartCard';
import { RevenueChartCard } from '../components/analytics/RevenueChartCard';
import { LeadSourceChart } from '../components/analytics/LeadSourceChart';
import { SalesVelocityCard } from '../components/analytics/SalesVelocityCard';
import { ActivityHeatmap } from '../components/analytics/ActivityHeatmap';
import { TopPerformersCard } from '../components/analytics/TopPerformersCard';
import { EmptyAnalyticsState } from '../components/analytics/EmptyAnalyticsState';
import { LoadingSkeleton } from '../components/analytics/LoadingSkeleton';

export default function Analytics() {
  const [dateRange, setDateRange] = useState('30');
  const analytics = useAnalytics(dateRange);

  const isLoading = !analytics || Object.keys(analytics).length === 0;
  const isEmpty = analytics?.totalLeads === 0;

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics Dashboard</h1>
          <p className="text-slate-600">
            Real-time insights into your sales pipeline and lead performance.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <AnalyticsFilters dateRange={dateRange} onDateRangeChange={setDateRange} />
        </div>

        {isEmpty ? (
          <EmptyAnalyticsState />
        ) : isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* KPI Cards */}
            <div className="mb-8">
              <StatsCards
                totalLeads={analytics.totalLeads}
                conversionRate={analytics.conversionRate}
                pipelineValue={analytics.pipelineValue}
                wonRevenue={analytics.wonRevenue}
                averageSalesCycle={analytics.averageSalesCycle}
                lostRate={analytics.lostRate}
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <PieChartCard data={analytics.statusDistribution} />
              <FunnelChartCard data={analytics.funnelData} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <BarChartCard data={analytics.monthlyLeads} />
              <LineChartCard data={analytics.conversionByMonth} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <RevenueChartCard data={analytics.revenueByMonth} />
              <LeadSourceChart data={analytics.leadSources} />
            </div>

            {/* Sales Velocity & Forecast */}
            <div className="mb-8">
              <SalesVelocityCard
                salesVelocity={analytics.salesVelocity}
                forecastRevenue={analytics.forecastRevenue}
              />
            </div>

            {/* Activity Heatmap */}
            <div className="mb-8">
              <ActivityHeatmap data={analytics.activityHeatmap} />
            </div>

            {/* Top Performers */}
            <div>
              <TopPerformersCard data={analytics.topPerformers} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
