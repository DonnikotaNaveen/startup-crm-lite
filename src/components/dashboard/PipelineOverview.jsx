import { useMemo } from "react";

/**
 * PipelineOverview renders a horizontal CRM funnel with dark mode support.
 */
export default function PipelineOverview({ leads = [] }) {
  const stats = useMemo(() => {
    const counts = { New: 0, Contacted: 0, Qualified: 0, Lost: 0 };

    leads.forEach((lead) => {
      if (lead.status === "New") counts.New++;
      else if (lead.status === "Contacted") counts.Contacted++;
      else if (["Meeting Scheduled", "Proposal Sent", "Won"].includes(lead.status)) counts.Qualified++;
      else if (lead.status === "Lost") counts.Lost++;
    });

    const totalLeads = counts.New + counts.Contacted + counts.Qualified + counts.Lost;
    const getPercentage = (count) => totalLeads === 0 ? 0 : Math.round((count / totalLeads) * 100);

    return {
      total: totalLeads,
      stages: [
        {
          key: "New", label: "New", count: counts.New, percentage: getPercentage(counts.New),
          colorClass: "bg-blue-500",
          textClass: "text-blue-600 dark:text-blue-400",
          badgeBgClass: "bg-blue-50 dark:bg-blue-950/50 border-blue-100 dark:border-blue-900/50 text-blue-700 dark:text-blue-400",
          dotColorClass: "bg-blue-500",
        },
        {
          key: "Contacted", label: "Contacted", count: counts.Contacted, percentage: getPercentage(counts.Contacted),
          colorClass: "bg-amber-500",
          textClass: "text-amber-600 dark:text-amber-400",
          badgeBgClass: "bg-amber-50 dark:bg-amber-950/50 border-amber-100 dark:border-amber-900/50 text-amber-700 dark:text-amber-400",
          dotColorClass: "bg-amber-500",
        },
        {
          key: "Qualified", label: "Qualified", count: counts.Qualified, percentage: getPercentage(counts.Qualified),
          colorClass: "bg-emerald-500",
          textClass: "text-emerald-600 dark:text-emerald-400",
          badgeBgClass: "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-400",
          dotColorClass: "bg-emerald-500",
        },
        {
          key: "Lost", label: "Lost", count: counts.Lost, percentage: getPercentage(counts.Lost),
          colorClass: "bg-rose-500",
          textClass: "text-rose-600 dark:text-rose-400",
          badgeBgClass: "bg-rose-50 dark:bg-rose-950/50 border-rose-100 dark:border-rose-900/50 text-rose-700 dark:text-rose-400",
          dotColorClass: "bg-rose-500",
        },
      ],
    };
  }, [leads]);

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-xs h-full flex flex-col justify-between">
      <div>
        <div className="mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-gray-100 leading-snug">Pipeline Funnel Overview</h2>
          <p className="text-xs font-semibold text-slate-400 dark:text-gray-500 mt-1">
            Distribution and conversion status of {stats.total} total leads in the CRM database.
          </p>
        </div>

        {/* Stacked bar */}
        <div className="relative mb-8">
          <div className="flex h-4.5 w-full rounded-full bg-slate-100 dark:bg-gray-800 overflow-hidden shadow-inner">
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
              <div className="w-full h-full text-center text-[10px] font-bold text-slate-400 dark:text-gray-500 py-0.5">
                No active pipeline leads found.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stage breakdown cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.stages.map((stage) => (
          <div
            key={stage.key}
            className="flex items-center justify-between rounded-xl border border-slate-100 dark:border-gray-700 bg-slate-50/50 dark:bg-gray-800 p-3.5 hover:bg-slate-50 dark:hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${stage.dotColorClass}`} />
              <span className="text-xs font-bold text-slate-700 dark:text-gray-300 truncate">{stage.label}</span>
            </div>
            <div className="flex items-baseline gap-1.5 ml-2">
              <span className="text-sm font-extrabold text-slate-900 dark:text-gray-100 leading-none">{stage.count}</span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-gray-500 leading-none">({stage.percentage}%)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
