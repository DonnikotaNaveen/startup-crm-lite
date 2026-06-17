import React from "react";

/**
 * @typedef {Object} StatusBadgeProps
 * @property {"New"|"Contacted"|"Meeting Scheduled"|"Proposal Sent"|"Won"|"Lost"} status - The lead status key to visualize.
 */

/**
 * StatusBadge component displays a pill-shaped color-coded badge.
 * Provides clear visual signaling of a lead's position in the sales funnel.
 *
 * @component
 * @param {StatusBadgeProps} props - Component properties.
 * @returns {React.ReactElement} The StatusBadge component.
 */
export default function StatusBadge({ status }) {
  const getBadgeClasses = (statusKey) => {
    switch (statusKey) {
      case "New":
        return "bg-slate-50 text-slate-700 border-slate-200/80";
      case "Contacted":
        return "bg-amber-50 text-amber-700 border-amber-200/80";
      case "Meeting Scheduled":
        return "bg-purple-50 text-purple-700 border-purple-200/80";
      case "Proposal Sent":
        return "bg-indigo-50 text-indigo-700 border-indigo-200/80";
      case "Won":
        return "bg-emerald-50 text-emerald-700 border-emerald-200/80";
      case "Lost":
        return "bg-rose-50 text-rose-700 border-rose-200/80";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200/80";
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold transition-all duration-200 ${getBadgeClasses(
        status
      )}`}
    >
      {status}
    </span>
  );
}
