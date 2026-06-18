import { Edit3, Trash2, Mail, Calendar, Globe } from "lucide-react";
import StatusBadge from "./StatusBadge";

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
    <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-700 rounded-2xl shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-50/75 dark:bg-gray-800/80 border-b border-slate-200 dark:border-gray-700 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
              <th scope="col" className="px-6 py-4">Lead Detail</th>
              <th scope="col" className="px-6 py-4">Company</th>
              <th scope="col" className="px-6 py-4">Status</th>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">Source</th>
              <th scope="col" className="px-6 py-4">Date Added</th>
              <th scope="col" className="px-6 py-4 text-right">Actions</th>
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
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 font-bold text-xs text-blue-600 dark:text-blue-400 border border-blue-100/30 dark:border-blue-900/40">
                          {initials}
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-gray-100 leading-none">
                          {lead.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-500 dark:text-gray-400">
                      {lead.company}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={lead.status} />
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-gray-300">
                      <div className="flex items-center gap-1.5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        <Mail className="h-3.5 w-3.5 text-slate-400 dark:text-gray-500" />
                        <a href={`mailto:${lead.email}`} className="font-semibold focus:outline-none focus:underline">
                          {lead.email}
                        </a>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 dark:text-gray-400 font-semibold">
                      <span className="bg-slate-100 dark:bg-gray-700 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                        <Globe className="h-3 w-3 text-slate-400 dark:text-gray-500" />
                        {lead.source}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-slate-400 dark:text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-400 dark:text-gray-500" />
                        <span>{formatDate(lead.createdAt)}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-sm font-semibold text-slate-400 dark:text-gray-500">
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
