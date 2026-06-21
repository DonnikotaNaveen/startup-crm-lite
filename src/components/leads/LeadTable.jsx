import React, { useState, useMemo } from "react";
import { Eye, Edit3, Trash2, Mail, Calendar, Globe, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";
import StatusBadge from "./StatusBadge";
import Avatar from "../common/Avatar";
import Tooltip from "../common/Tooltip";
import { formatCurrency } from "../../utils/analyticsHelpers";

/**
 * SortIcon — renders the appropriate chevron icon for a sortable column header.
 */
function SortIcon({ field, sortField, sortDir }) {
  if (sortField !== field) return <ChevronsUpDown className="h-3.5 w-3.5 text-slate-300 dark:text-gray-600" />;
  return sortDir === "asc"
    ? <ChevronUp className="h-3.5 w-3.5 text-blue-500" />
    : <ChevronDown className="h-3.5 w-3.5 text-blue-500" />;
}

/**
 * LeadTable displays CRM leads in a responsive table with sorting and row actions.
 * Memoized to prevent re-renders when other parent state elements change.
 *
 * @param {{ leads: Array, onEdit: Function, onDelete: Function, onView: Function }} props
 * @returns {JSX.Element}
 */
const LeadTable = React.memo(({ leads = [], onEdit, onDelete, onView }) => {
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch { return dateStr; }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  const sortedLeads = useMemo(() => {
    if (!sortField) return leads;
    return [...leads].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // Numeric sort for value
      if (sortField === "value") {
        valA = Number(valA) || 0;
        valB = Number(valB) || 0;
        return sortDir === "asc" ? valA - valB : valB - valA;
      }

      // Date sort for createdAt
      if (sortField === "createdAt") {
        valA = new Date(valA).getTime();
        valB = new Date(valB).getTime();
        return sortDir === "asc" ? valA - valB : valB - valA;
      }

      // String sort
      valA = String(valA ?? "").toLowerCase();
      valB = String(valB ?? "").toLowerCase();
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [leads, sortField, sortDir]);

  const SortableTh = ({ field, label, className = "" }) => (
    <th
      scope="col"
      className={`px-3 py-2 ${className}`}
      aria-sort={sortField === field ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
    >
      <button
        onClick={() => handleSort(field)}
        className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider hover:text-slate-800 dark:hover:text-gray-200 transition-colors focus:outline-none"
        aria-label={`Sort by ${label}`}
      >
        {label}
        <SortIcon field={field} sortField={sortField} sortDir={sortDir} />
      </button>
    </th>
  );

  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-gray-700 dark:bg-gray-900">
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-fit border-collapse text-left text-sm sm:min-w-[700px]">
          <thead>
            <tr className="bg-slate-50/75 dark:bg-gray-800/80 border-b border-slate-200 dark:border-gray-700">
              <SortableTh field="name" label="Lead" className="w-[18%]" />
              <th scope="col" className="hidden w-[14%] px-3 py-2 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider lg:table-cell">
                Company
              </th>
              <th scope="col" className="w-[16%] px-3 py-2 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="w-[22%] px-3 py-2 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <SortableTh field="value" label="Value" className="hidden w-[10%] lg:table-cell" />
              <th scope="col" className="hidden w-[10%] px-3 py-2 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider lg:table-cell">
                Source
              </th>
              <SortableTh field="createdAt" label="Date" className="hidden w-[9%] lg:table-cell" />
              <th scope="col" className="w-44 min-w-[11rem] px-3 py-2 text-right text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
            {sortedLeads.length > 0 ? (
              sortedLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/60 dark:hover:bg-gray-800/50 transition-colors duration-150 group">
                  {/* Lead name + avatar */}
                  <td className="px-3 py-2.5 align-middle">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={lead.name} className="h-9 w-9 shrink-0 text-xs" />
                      <span className="min-w-0 truncate text-sm font-bold leading-tight text-slate-900 dark:text-gray-100">
                        {lead.name}
                      </span>
                    </div>
                  </td>

                  {/* Company */}
                  <td className="hidden px-3 py-2.5 align-middle text-sm font-semibold text-slate-500 lg:table-cell dark:text-gray-400">
                    <span className="block truncate max-w-[120px]">{lead.company}</span>
                  </td>

                  {/* Status */}
                  <td className="px-3 py-2.5 align-middle">
                    <StatusBadge status={lead.status} />
                  </td>

                  {/* Email */}
                  <td className="px-3 py-2.5 align-middle text-sm text-slate-600 dark:text-gray-300">
                    <div className="flex min-w-0 items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-gray-500" />
                      <a
                        href={`mailto:${lead.email}`}
                        className="min-w-0 truncate font-semibold focus:outline-none focus:underline"
                        aria-label={`Email ${lead.name}`}
                      >
                        {lead.email}
                      </a>
                    </div>
                  </td>

                  {/* Value */}
                  <td className="hidden px-3 py-2.5 align-middle text-sm font-bold text-slate-700 lg:table-cell dark:text-gray-200">
                    {formatCurrency(lead.value || 0)}
                  </td>

                  {/* Source */}
                  <td className="hidden px-3 py-2.5 align-middle lg:table-cell">
                    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 dark:bg-gray-700 px-2 py-0.5 text-xs font-semibold text-slate-500 dark:text-gray-400">
                      <Globe className="h-3 w-3 text-slate-400 dark:text-gray-500" />
                      {lead.source}
                    </span>
                  </td>

                  {/* Date */}
                  <td className="hidden px-3 py-2.5 align-middle lg:table-cell">
                    <div className="flex items-center gap-1 text-xs font-semibold text-slate-400 dark:text-gray-400">
                      <Calendar className="h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-gray-500" />
                      <span>{formatDate(lead.createdAt)}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="w-44 min-w-[11rem] px-3 py-2.5 align-middle text-right whitespace-nowrap">
                    <div className="flex min-w-max flex-shrink-0 items-center justify-end gap-2">
                      <Tooltip label="View" placement="top">
                        <button
                          onClick={() => (onView ? onView(lead) : onEdit(lead))}
                          className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-gray-500 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                          aria-label={`View ${lead.name}`}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </Tooltip>
                      <Tooltip label="Edit" placement="top">
                        <button
                          onClick={() => onEdit(lead)}
                          className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500/20 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                          aria-label={`Edit ${lead.name}`}
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                      </Tooltip>
                      <Tooltip label="Delete" placement="top">
                        <button
                          onClick={() => onDelete(lead.id)}
                          className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:text-gray-500 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"
                          aria-label={`Delete ${lead.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-3 py-10 text-center text-sm font-semibold text-slate-400 dark:text-gray-500">
                  No prospects matched your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
});

LeadTable.displayName = "LeadTable";

export default LeadTable;
