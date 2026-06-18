import React from "react";
import { Edit3, Trash2, Mail, Phone, Calendar, Globe } from "lucide-react";
import StatusBadge from "./StatusBadge";
import Avatar from "../common/Avatar";

/**
 * LeadCard displays a grid card for a lead prospect with dark mode support.
 * Memoized to prevent re-renders when parent state triggers.
 *
 * @param {{ lead: Object, onEdit: Function, onDelete: Function }} props
 * @returns {JSX.Element}
 */
const LeadCard = React.memo(({ lead, onEdit, onDelete }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch { return dateStr; }
  };

  return (
    <div className="group rounded-2xl border border-slate-200/80 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 shadow-xs hover:-translate-y-1 hover:shadow-md dark:hover:shadow-gray-900/50 transition-all duration-300 flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Header: Initials + Actions */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar name={lead.name} className="h-10 w-10 text-sm" />
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900 dark:text-gray-100 truncate">{lead.name}</h3>
              <p className="text-xs font-semibold text-slate-400 dark:text-gray-500 truncate mt-0.5">{lead.company}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={() => onEdit(lead)}
              className="p-1.5 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-lg text-slate-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
              aria-label={`Edit ${lead.name}`}
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(lead.id)}
              className="p-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-lg text-slate-400 dark:text-gray-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/20 cursor-pointer"
              aria-label={`Delete ${lead.name}`}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Status */}
        <div className="pt-1">
          <StatusBadge status={lead.status} />
        </div>

        {/* Contact details */}
        <div className="space-y-2.5 pt-2 border-t border-slate-50 dark:border-gray-700 text-xs">
          <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400">
            <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-gray-500" />
            <a
              href={`mailto:${lead.email}`}
              className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 truncate transition-colors focus:outline-none focus:underline"
            >
              {lead.email}
            </a>
          </div>

          {lead.phone && (
            <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400">
              <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-gray-500" />
              <a
                href={`tel:${lead.phone}`}
                className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:underline"
              >
                {lead.phone}
              </a>
            </div>
          )}

          <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400">
            <Globe className="h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-gray-500" />
            <span className="font-semibold bg-slate-100 dark:bg-gray-700 px-2 py-0.5 rounded-md text-slate-600 dark:text-gray-300">
              {lead.source}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 dark:text-gray-500 pt-4 border-t border-slate-50 dark:border-gray-700 mt-4">
        <Calendar className="h-3.5 w-3.5 shrink-0" />
        <span>Added {formatDate(lead.createdAt)}</span>
      </div>
    </div>
  );
});

LeadCard.displayName = "LeadCard";

export default LeadCard;
