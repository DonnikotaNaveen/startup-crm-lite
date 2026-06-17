import React, { useMemo } from "react";

/**
 * @typedef {Object} Lead
 * @property {number|string} id - Unique identifier of the lead.
 * @property {string} name - Full name of the lead contact.
 * @property {string} company - Name of the lead's company.
 * @property {"New"|"Contacted"|"Qualified"|"Lost"} status - CRM Pipeline status stage.
 * @property {string} createdAt - Date string when lead was created.
 */

/**
 * @typedef {Object} PipelineOverviewProps
 * @property {Lead[]} leads - Array of lead data objects.
 */

/**
 * PipelineOverview component renders a visual horizontal representation
 * of the CRM sales funnel. It groups, counts, and computes percentages for
 * leads in the "New", "Contacted", "Qualified", and "Lost" pipeline stages.
 *
 * @component
 * @param {PipelineOverviewProps} props - Component properties.
 * @returns {React.ReactElement} The PipelineOverview component.
 */
export default function PipelineOverview({ leads = [] }) {
  const stats = useMemo(() => {
    const counts = {
      New: 0,
      Contacted: 0,
      Qualified: 0,
      Lost: 0,
    };

    // Aggregate counts by status, ignoring any unexpected statuses
    leads.forEach((lead) => {
      if (counts[lead.status] !== undefined) {
        counts[lead.status]++;
      }
    });

    const totalLeads = counts.New + counts.Contacted + counts.Qualified + counts.Lost;

    // Calculate percentage representations
    const getPercentage = (count) => {
      if (totalLeads === 0) return 0;
      return Math.round((count / totalLeads) * 100);
    };

    return {
      total: totalLeads,
      stages: [
        {
          key: "New",
          label: "New",
          count: counts.New,
          percentage: getPercentage(counts.New),
          colorClass: "bg-blue-500",
          textClass: "text-blue-600",
          badgeBgClass: "bg-blue-50 border-blue-100 text-blue-700",
          dotColorClass: "bg-blue-500",
        },
        {
          key: "Contacted",
          label: "Contacted",
          count: counts.Contacted,
          percentage: getPercentage(counts.Contacted),
          colorClass: "bg-amber-500",
          textClass: "text-amber-600",
          badgeBgClass: "bg-amber-50 border-amber-100 text-amber-700",
          dotColorClass: "bg-amber-500",
        },
        {
          key: "Qualified",
          label: "Qualified",
          count: counts.Qualified,
          percentage: getPercentage(counts.Qualified),
          colorClass: "bg-emerald-500",
          textClass: "text-emerald-600",
          badgeBgClass: "bg-emerald-50 border-emerald-100 text-emerald-700",
          dotColorClass: "bg-emerald-500",
        },
        {
          key: "Lost",
          label: "Lost",
          count: counts.Lost,
          percentage: getPercentage(counts.Lost),
          colorClass: "bg-rose-500",
          textClass: "text-rose-600",
          badgeBgClass: "bg-rose-50 border-rose-100 text-rose-700",
          dotColorClass: "bg-rose-500",
        },
      ],
    };
  }, [leads]);

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
      {/* Component Title Panel */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900 leading-snug">Pipeline Funnel Overview</h2>
        <p className="text-xs font-semibold text-slate-400 mt-1">
          Distribution and conversion status of {stats.total} total leads in the CRM database.
        </p>
      </div>

      {/* Horizontal Stacked Bar Visualization */}
      <div className="relative mb-8">
        <div className="flex h-4.5 w-full rounded-full bg-slate-100 overflow-hidden shadow-inner">
          {stats.stages.map((stage) => {
            if (stage.count === 0) return null;
            return (
              <div
                key={stage.key}
                style={{ width: `${stage.percentage}%` }}
                className={`${stage.colorClass} h-full first:rounded-l-full last:rounded-r-full transition-all duration-500 ease-out hover:opacity-90 cursor-pointer`}
                title={`${stage.label}: ${stage.count} (${stage.percentage}%)`}
                role="progressbar"
                aria-valuenow={stage.percentage}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            );
          })}
          {stats.total === 0 && (
            <div className="w-full h-full bg-slate-100 text-center text-[10px] font-bold text-slate-400 py-0.5">
              No active pipeline leads found.
            </div>
          )}
        </div>
      </div>

      {/* Responsive Breakdown Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.stages.map((stage) => (
          <div
            key={stage.key}
            className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${stage.dotColorClass}`} />
              <span className="text-xs font-bold text-slate-700 truncate">{stage.label}</span>
            </div>
            <div className="flex items-baseline gap-1.5 ml-2">
              <span className="text-sm font-extrabold text-slate-900 leading-none">{stage.count}</span>
              <span className="text-[10px] font-semibold text-slate-400 leading-none">
                ({stage.percentage}%)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
