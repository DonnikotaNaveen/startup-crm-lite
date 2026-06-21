import React from "react";

/**
 * StatusBadge renders a color-coded pipeline status pill with dark mode support.
 * Memoized to prevent re-renders when parent lists update.
 */
const StatusBadge = React.memo(({ status }) => {
  const styles = {
    New:                "bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-300 border-slate-200/80 dark:border-gray-600",
    Contacted:          "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-200/80 dark:border-amber-900/50",
    "Meeting Scheduled":"bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400 border-purple-200/80 dark:border-purple-900/50",
    "Proposal Sent":    "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 border-indigo-200/80 dark:border-indigo-900/50",
    Won:                "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200/80 dark:border-emerald-900/50",
    Lost:               "bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border-rose-200/80 dark:border-rose-900/50",
  };

  const className = styles[status] ?? "bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-gray-300 border-slate-200/80 dark:border-gray-600";

  return (
    <span className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-bold ${className}`}>
      {status}
    </span>
  );
});

StatusBadge.displayName = "StatusBadge";

export default StatusBadge;

