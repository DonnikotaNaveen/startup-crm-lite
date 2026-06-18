import { useState } from 'react';
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
import { ForecastCard } from '../components/analytics/ForecastCard';
import { ActivityHeatmap } from '../components/analytics/ActivityHeatmap';
import { TopPerformersCard } from '../components/analytics/TopPerformersCard';
import { EmptyAnalyticsState } from '../components/analytics/EmptyAnalyticsState';
import { LoadingSkeleton } from '../components/analytics/LoadingSkeleton';

export default function Analytics() {
  const [dateRange, setDateRange] = useState('30');
  const analytics = useAnalytics(dateRange);

  const isLoading = !analytics;
  const isEmpty = analytics?.totalLeads === 0;

  return (
    <div className="min-h-screen space-y-6 bg-slate-50 animate-fade-in dark:bg-gray-950">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Analytics Dashboard
            </h1>
            <p className="mt-1 text-sm font-medium text-slate-500 dark:text-gray-400">
              Sales performance, pipeline health, and revenue trends from your CRM leads.
            </p>
          </div>
          <AnalyticsFilters dateRange={dateRange} onDateRangeChange={setDateRange} />
        </div>

        {isEmpty ? (
          <EmptyAnalyticsState />
        ) : isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            {/* KPI Cards */}
            <div>
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
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
              <PieChartCard data={analytics.statusDistribution} />
              <FunnelChartCard data={analytics.funnelData} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
              <BarChartCard data={analytics.monthlyLeads} />
              <LineChartCard data={analytics.conversionByMonth} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
              <RevenueChartCard data={analytics.revenueByMonth} />
              <LeadSourceChart data={analytics.leadSources} />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
              <SalesVelocityCard salesVelocity={analytics.salesVelocity} />
              <ForecastCard
                forecastRevenue={analytics.forecastRevenue}
                pipelineValue={analytics.pipelineValue}
                wonRevenue={analytics.wonRevenue}
              />
            </div>

            <div>
              <ActivityHeatmap data={analytics.activityHeatmap} />
            </div>

            <div>
              <TopPerformersCard data={analytics.topPerformers} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
