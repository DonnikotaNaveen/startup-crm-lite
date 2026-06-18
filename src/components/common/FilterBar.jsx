import { useMemo } from "react";

const STATUSES = ["All", "New", "Contacted", "Meeting Scheduled", "Proposal Sent", "Won", "Lost"];

/**
 * FilterBar renders status filter buttons with dark mode support.
 *
 * @param {{ activeFilter: string, onFilterChange: Function, leads: Array }} props
 * @returns {JSX.Element}
 */
export default function FilterBar({ activeFilter, onFilterChange, leads = [] }) {
  const counts = useMemo(() => {
    const map = { All: leads.length };
    STATUSES.forEach((s) => {
      if (s !== "All") map[s] = 0;
    });
    leads.forEach((lead) => {
      if (lead && lead.status && map[lead.status] !== undefined) {
        map[lead.status]++;
      }
    });
    return map;
  }, [leads]);

  return (
    <div role="group" aria-label="Filter leads by status" className="flex flex-wrap gap-2">
      {STATUSES.map((status) => {
        const isActive = activeFilter === status;
        const count = counts[status] ?? 0;

        return (
          <button
            key={status}
            onClick={() => onFilterChange(status)}
            aria-pressed={isActive}
            className={`
              inline-flex min-h-11 items-center gap-1.5 px-3.5 py-1.5
              rounded-full text-xs font-semibold
              border transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-blue-500/30
              cursor-pointer whitespace-nowrap
              ${isActive
                ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20"
                : "bg-slate-50 dark:bg-gray-800 text-slate-600 dark:text-gray-300 border-slate-200/70 dark:border-gray-700 hover:bg-slate-100 dark:hover:bg-gray-700 hover:border-slate-300 dark:hover:border-gray-600 hover:text-slate-800 dark:hover:text-gray-100"
              }
            `}
          >
            {status}
            <span
              className={`
                px-1.5 py-0.5 rounded-full text-[10px] font-bold
                ${isActive ? "bg-white/20 text-white" : "bg-slate-200/80 dark:bg-gray-700 text-slate-500 dark:text-gray-400"}
              `}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
