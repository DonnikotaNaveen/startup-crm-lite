import { useMemo } from "react";

/**
 * RecentLeads displays the latest 5 prospects with dark mode support.
 */
export default function RecentLeads({ leads = [] }) {
  const recentLeads = useMemo(() => {
    return [...leads]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [leads]);

  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case "New":           return "bg-slate-50 dark:bg-gray-700 text-slate-700 dark:text-gray-300 border-slate-200/80 dark:border-gray-600";
      case "Contacted":     return "bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border-amber-200/80 dark:border-amber-900/50";
      case "Meeting Scheduled": return "bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400 border-purple-200/80 dark:border-purple-900/50";
      case "Proposal Sent": return "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-400 border-indigo-200/80 dark:border-indigo-900/50";
      case "Won":           return "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-200/80 dark:border-emerald-900/50";
      case "Lost":          return "bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border-rose-200/80 dark:border-rose-900/50";
      default:              return "bg-slate-50 dark:bg-gray-700 text-slate-700 dark:text-gray-300 border-slate-200/80 dark:border-gray-600";
    }
  };

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
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 font-bold text-xs text-blue-600 dark:text-blue-400 border border-blue-100/30 dark:border-blue-900/40">
                          {lead.name.split(" ").map((w) => w[0]).join("")}
                        </div>
                        <span className="min-w-0 break-words text-sm font-bold leading-tight text-slate-900 dark:text-gray-100">
                          {lead.name}
                        </span>
                      </div>
                    </td>
                    <td className="hidden py-3 pr-2 align-middle text-sm font-semibold text-slate-500 break-words md:table-cell dark:text-gray-400">
                      {lead.company}
                    </td>
                    <td className="py-3 pr-2 align-middle">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${getStatusBadgeStyles(lead.status)}`}>
                        {lead.status}
                      </span>
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
