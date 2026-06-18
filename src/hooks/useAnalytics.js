import { useMemo } from 'react';
import { useLeads } from '../context/LeadContext';
import {
  calculateStatusDistribution,
  calculateMonthlyLeads,
  calculateConversionByMonth,
  calculateRevenueByMonth,
  calculateLeadSources,
  calculateFunnelData,
  calculateTotalLeads,
  calculateWonLeads,
  calculateConversionRate,
  calculateLostRate,
  calculateWonRevenue,
  calculatePipelineValue,
  calculateAverageSalesCycle,
  calculateSalesVelocity,
  calculateForecastRevenue,
  calculateTopPerformers,
  calculateActivityHeatmap,
  filterLeadsByDateRange,
} from '../utils/analyticsHelpers';

export const useAnalytics = (dateRange = '30') => {
  const { leads } = useLeads();

  const filteredLeads = useMemo(() => {
    return filterLeadsByDateRange(leads, dateRange);
  }, [leads, dateRange]);

  const analytics = useMemo(() => {
    if (!filteredLeads || filteredLeads.length === 0) {
      return {
        totalLeads: 0,
        wonLeads: 0,
        conversionRate: 0,
        lostRate: 0,
        wonRevenue: 0,
        pipelineValue: 0,
        averageSalesCycle: 0,
        salesVelocity: 0,
        forecastRevenue: 0,
        statusDistribution: [],
        monthlyLeads: [],
        conversionByMonth: [],
        revenueByMonth: [],
        leadSources: [],
        funnelData: [],
        topPerformers: [],
        activityHeatmap: [],
      };
    }

    return {
      totalLeads: calculateTotalLeads(filteredLeads),
      wonLeads: calculateWonLeads(filteredLeads),
      conversionRate: calculateConversionRate(filteredLeads),
      lostRate: calculateLostRate(filteredLeads),
      wonRevenue: calculateWonRevenue(filteredLeads),
      pipelineValue: calculatePipelineValue(filteredLeads),
      averageSalesCycle: calculateAverageSalesCycle(filteredLeads),
      salesVelocity: calculateSalesVelocity(filteredLeads, parseInt(dateRange)),
      forecastRevenue: calculateForecastRevenue(filteredLeads, parseInt(dateRange)),
      statusDistribution: calculateStatusDistribution(filteredLeads),
      monthlyLeads: calculateMonthlyLeads(filteredLeads, parseInt(dateRange)),
      conversionByMonth: calculateConversionByMonth(filteredLeads, parseInt(dateRange)),
      revenueByMonth: calculateRevenueByMonth(filteredLeads, parseInt(dateRange)),
      leadSources: calculateLeadSources(filteredLeads),
      funnelData: calculateFunnelData(filteredLeads),
      topPerformers: calculateTopPerformers(filteredLeads),
      activityHeatmap: calculateActivityHeatmap(filteredLeads),
    };
  }, [filteredLeads]);

  return analytics;
};
