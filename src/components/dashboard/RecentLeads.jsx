import React, { useMemo } from "react";

/**
 * @typedef {Object} Lead
 * @property {number|string} id - Unique identifier of the lead.
 * @property {string} name - Full name of the lead contact.
 * @property {string} company - Name of the lead's company.
 * @property {"New"|"Contacted"|"Qualified"|"Lost"} status - CRM Pipeline status stage.
 * @property {string} createdAt - Date string when lead was created.
 */

/**
 * @typedef {Object} RecentLeadsProps
 * @property {Lead[]} leads - Array of lead data objects.
 */

/**
 * RecentLeads component displays a tabular list of the latest 5 added prospects.
 * Integrates responsive tables, status badge indicators, and clear typography.
 *
 * @component
 * @param {RecentLeadsProps} props - Component properties.
 * @returns {React.ReactElement} The RecentLeads component.
 */
export default function RecentLeads({ leads = [] }) {
  // Extract and sort the latest 5 leads by creation date descending
  const recentLeads = useMemo(() => {
    return [...leads]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [leads]);

  // Map lead status to status badge CSS class styling
  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case "New":
        return "bg-blue-50 text-blue-700 border-blue-100/80";
      case "Contacted":
        return "bg-amber-50 text-amber-700 border-amber-100/80";
      case "Qualified":
        return "bg-emerald-50 text-emerald-700 border-emerald-100/80";
      case "Lost":
        return "bg-rose-50 text-rose-700 border-rose-100/80";
      default:
        return "bg-slate-50 text-slate-700 border-slate-100/80";
    }
  };

  // Helper function to format date string to reader-friendly format
  const formatDate = (dateStr) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs overflow-hidden">
      {/* Table Header Section */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-snug">Recent Activity</h2>
          <p className="text-xs font-semibold text-slate-400 mt-0.5">
            Latest prospects added to the sales database.
          </p>
        </div>
      </div>

      {/* Table Container with Overflow Protection */}
      <div className="overflow-x-auto -mx-6">
        <div className="inline-block min-w-full align-middle px-6">
          <table className="min-w-full divide-y divide-slate-100">
            <thead>
              <tr className="text-left text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th scope="col" className="pb-3.5 pt-1">Name</th>
                <th scope="col" className="pb-3.5 pt-1">Company</th>
                <th scope="col" className="pb-3.5 pt-1">Status</th>
                <th scope="col" className="pb-3.5 pt-1">Date Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentLeads.length > 0 ? (
                recentLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Column 1: Client Name & Initials Badge */}
                    <td className="py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-xs text-blue-600 border border-blue-100/30">
                          {lead.name
                            .split(" ")
                            .map((w) => w[0])
                            .join("")}
                        </div>
                        <span className="text-sm font-bold text-slate-900 leading-none">
                          {lead.name}
                        </span>
                      </div>
                    </td>

                    {/* Column 2: Client Company */}
                    <td className="py-4 whitespace-nowrap text-sm font-semibold text-slate-500">
                      {lead.company}
                    </td>

                    {/* Column 3: Lead Pipeline Badge */}
                    <td className="py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold ${getStatusBadgeStyles(lead.status)}`}>
                        {lead.status}
                      </span>
                    </td>

                    {/* Column 4: Creation Timestamp */}
                    <td className="py-4 whitespace-nowrap text-xs font-bold text-slate-400">
                      {formatDate(lead.createdAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-sm font-semibold text-slate-400">
                    No leads recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
