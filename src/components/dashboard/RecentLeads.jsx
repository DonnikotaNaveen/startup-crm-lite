import { useMemo } from "react";
import StatusBadge from "../leads/StatusBadge";
import Avatar from "../common/Avatar";

/**
 * RecentLeads displays the latest 5 prospects with dark mode support.
 * Refactored to reuse global StatusBadge and Avatar components.
 *
 * @param {{ leads: Array }} props
 * @returns {JSX.Element}
 */
export default function RecentLeads({ leads = [] }) {
  const recentLeads = useMemo(() => {
    return [...leads]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [leads]);

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs sm:p-6 dark:border-gray-700 dark:bg-gray-900">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-gray-100 leading-snug">Recent Activity</h2>
          <p className="text-xs font-semibold text-slate-400 dark:text-gray-500 mt-0.5">
            Latest prospects added to the sales database.
          </p>
        </div>
      </div>

      <div className="w-full max-w-full overflow-hidden">
        <table className="w-full table-fixed divide-y divide-slate-100 text-sm dark:divide-gray-700">
          <thead>
            <tr className="text-left text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-wider">
              <th scope="col" className="w-[44%] pb-3.5 pt-1">Name</th>
              <th scope="col" className="hidden w-[24%] pb-3.5 pt-1 md:table-cell">Company</th>
              <th scope="col" className="w-[32%] pb-3.5 pt-1 md:w-[20%]">Status</th>
              <th scope="col" className="hidden w-[12%] pb-3.5 pt-1 lg:table-cell">Date Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
            {recentLeads.length > 0 ? (
              recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="py-3 pr-2 align-middle">
                    <div className="flex items-center gap-3">
                      <Avatar name={lead.name} className="h-9 w-9 text-xs" />
                      <span className="min-w-0 break-words text-sm font-bold leading-tight text-slate-900 dark:text-gray-100">
                        {lead.name}
                      </span>
                    </div>
                  </td>
                  <td className="hidden py-3 pr-2 align-middle text-sm font-semibold text-slate-500 break-words md:table-cell dark:text-gray-400">
                    {lead.company}
                  </td>
                  <td className="py-3 pr-2 align-middle">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="hidden py-3 align-middle text-xs font-bold text-slate-400 lg:table-cell dark:text-gray-500">
                    {formatDate(lead.createdAt)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-8 text-center text-sm font-semibold text-slate-400 dark:text-gray-500">
                  No leads recorded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
