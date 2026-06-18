import { Edit3, Trash2, Mail, Calendar, Globe } from "lucide-react";
import StatusBadge from "./StatusBadge";
import { formatCurrency } from "../../utils/analyticsHelpers";

/**
 * LeadTable displays CRM leads in a responsive table with dark mode support.
 */
export default function LeadTable({ leads = [], onEdit, onDelete }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch { return dateStr; }
  };

  return (
    <div className="w-full max-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-gray-700 dark:bg-gray-900">
      <div className="w-full max-w-full overflow-hidden">
        <table className="w-full table-fixed border-collapse text-left text-sm">
          <thead>
            <tr className="bg-slate-50/75 dark:bg-gray-800/80 border-b border-slate-200 dark:border-gray-700 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
              <th scope="col" className="w-[20%] px-3 py-2 lg:w-[18%]">Lead Detail</th>
              <th scope="col" className="hidden w-[14%] px-3 py-2 lg:table-cell">Company</th>
              <th scope="col" className="w-[18%] px-3 py-2 lg:w-[13%]">Status</th>
              <th scope="col" className="w-[38%] px-3 py-2 lg:w-[20%]">Email</th>
              <th scope="col" className="hidden w-[10%] px-3 py-2 lg:table-cell">Value</th>
              <th scope="col" className="hidden w-[10%] px-3 py-2 lg:table-cell">Source</th>
              <th scope="col" className="hidden w-[9%] px-3 py-2 lg:table-cell">Date Added</th>
              <th scope="col" className="w-[24%] px-3 py-2 text-right lg:w-[6%]">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
            {leads.length > 0 ? (
              leads.map((lead) => {
                const initials = lead.name
                  ? lead.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
                  : "LD";
                return (
                  <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/50 transition-colors group">
                    <td className="px-3 py-2 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 font-bold text-xs text-blue-600 dark:text-blue-400 border border-blue-100/30 dark:border-blue-900/40">
                          {initials}
                        </div>
                        <span className="min-w-0 break-words text-sm font-bold leading-tight text-slate-900 dark:text-gray-100">
                          {lead.name}
                        </span>
                      </div>
                    </td>

                    <td className="hidden px-3 py-2 align-middle text-sm font-semibold text-slate-500 break-words lg:table-cell dark:text-gray-400">
                      {lead.company}
                    </td>

                    <td className="px-3 py-2 align-middle">
                      <StatusBadge status={lead.status} />
                    </td>

                    <td className="px-3 py-2 align-middle text-sm text-slate-600 dark:text-gray-300">
                      <div className="flex min-w-0 items-center gap-1.5 break-words transition-colors hover:text-blue-600 dark:hover:text-blue-400">
                        <Mail className="h-3.5 w-3.5 text-slate-400 dark:text-gray-500" />
                        <a href={`mailto:${lead.email}`} className="min-w-0 break-words font-semibold focus:outline-none focus:underline">
                          {lead.email}
                        </a>
                      </div>
                    </td>

                    <td className="hidden px-3 py-2 align-middle text-sm font-bold text-slate-700 lg:table-cell dark:text-gray-200">
                      {formatCurrency(lead.value || 0)}
                    </td>

                    <td className="hidden px-3 py-2 align-middle text-xs font-semibold text-slate-500 lg:table-cell dark:text-gray-400">
                      <span className="bg-slate-100 dark:bg-gray-700 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                        <Globe className="h-3 w-3 text-slate-400 dark:text-gray-500" />
                        {lead.source}
                      </span>
                    </td>

                    <td className="hidden px-3 py-2 align-middle text-xs font-semibold text-slate-400 lg:table-cell dark:text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-400 dark:text-gray-500" />
                        <span>{formatDate(lead.createdAt)}</span>
                      </div>
                    </td>

                    <td className="px-3 py-2 align-middle text-right">
                      <div className="flex items-center justify-end gap-1.5 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100">
                        <button
                          onClick={() => onEdit(lead)}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-blue-400"
                          aria-label={`Edit ${lead.name}`}
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(lead.id)}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:text-gray-500 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"
                          aria-label={`Delete ${lead.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
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
}
