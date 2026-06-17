import React from "react";
import { Edit3, Trash2, Mail, Calendar, Globe } from "lucide-react";
import StatusBadge from "./StatusBadge";

/**
 * @typedef {Object} Lead
 * @property {number|string} id - Lead identifier.
 * @property {string} name - Contact person name.
 * @property {string} company - Company representing the prospect.
 * @property {string} email - Contact email.
 * @property {string} phone - Contact phone number.
 * @property {"New"|"Contacted"|"Meeting Scheduled"|"Proposal Sent"|"Won"|"Lost"} status - Pipeline status.
 * @property {string} source - Acquisition source.
 * @property {string} createdAt - Date added to the system.
 */

/**
 * @typedef {Object} LeadTableProps
 * @property {Lead[]} leads - Array of leads data to render.
 * @property {function(Lead):void} onEdit - Callback triggered when edit button is clicked.
 * @property {function(number|string):void} onDelete - Callback triggered when delete button is clicked.
 */

/**
 * LeadTable component displays CRM leads in a structured tabular grid.
 * Optimised for desktop monitors with responsive overflow controls.
 *
 * @component
 * @param {LeadTableProps} props - Component properties.
 * @returns {React.ReactElement} The LeadTable component.
 */
export default function LeadTable({ leads = [], onEdit, onDelete }) {
  // Helper to format date strings to user-friendly text
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
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
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th scope="col" className="px-6 py-4">Lead Detail</th>
              <th scope="col" className="px-6 py-4">Company</th>
              <th scope="col" className="px-6 py-4">Status</th>
              <th scope="col" className="px-6 py-4">Email</th>
              <th scope="col" className="px-6 py-4">Source</th>
              <th scope="col" className="px-6 py-4">Date Added</th>
              <th scope="col" className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leads.length > 0 ? (
              leads.map((lead) => {
                const initials = lead.name
                  ? lead.name
                      .split(" ")
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()
                  : "LD";

                return (
                  <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors group">
                    {/* Column 1: Client Name & Initials Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-xs text-blue-600 border border-blue-100/30">
                          {initials}
                        </div>
                        <span className="text-sm font-bold text-slate-900 leading-none">
                          {lead.name}
                        </span>
                      </div>
                    </td>

                    {/* Column 2: Company */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-500">
                      {lead.company}
                    </td>

                    {/* Column 3: Status Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={lead.status} />
                    </td>

                    {/* Column 4: Email */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                      <div className="flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                        <Mail className="h-3.5 w-3.5 text-slate-400" />
                        <a href={`mailto:${lead.email}`} className="font-semibold focus:outline-none focus:underline">
                          {lead.email}
                        </a>
                      </div>
                    </td>

                    {/* Column 5: Source */}
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-slate-500 font-semibold">
                      <span className="bg-slate-100 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                        <Globe className="h-3 w-3 text-slate-400" />
                        {lead.source}
                      </span>
                    </td>

                    {/* Column 6: Date Added */}
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-slate-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-slate-400" />
                        <span>{formatDate(lead.createdAt)}</span>
                      </div>
                    </td>

                    {/* Column 7: Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => onEdit(lead)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
                          aria-label={`Edit ${lead.name}`}
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => onDelete(lead.id)}
                          className="p-1.5 hover:bg-rose-50 rounded-lg text-slate-400 hover:text-rose-600 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500/20 cursor-pointer"
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
                <td colSpan={7} className="px-6 py-12 text-center text-sm font-semibold text-slate-400">
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
