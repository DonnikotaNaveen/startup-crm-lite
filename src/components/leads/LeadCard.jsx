import React from "react";
import { Edit3, Trash2, Mail, Phone, Calendar, Globe } from "lucide-react";
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
 * @typedef {Object} LeadCardProps
 * @property {Lead} lead - Lead object data.
 * @property {function(Lead):void} onEdit - Callback triggered when the edit button is clicked.
 * @property {function(number|string):void} onDelete - Callback triggered when the delete button is clicked.
 */

/**
 * LeadCard component displays a grid card layout representing a prospect lead.
 * Features inline action triggers for editing and deleting, status pill highlight,
 * and clickable communication quick-links.
 *
 * @component
 * @param {LeadCardProps} props - Component properties.
 * @returns {React.ReactElement} The LeadCard component.
 */
export default function LeadCard({ lead, onEdit, onDelete }) {
  // Extract initials for the contact badge
  const initials = lead.name
    ? lead.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "LD";

  // Formats date string to friendly text
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
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
      <div className="space-y-4">
        {/* Top bar: Initials and Actions */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Initials Badge */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-sm text-blue-600 border border-blue-100/30">
              {initials}
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-slate-900 truncate">{lead.name}</h3>
              <p className="text-xs font-semibold text-slate-400 truncate mt-0.5">{lead.company}</p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
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
        </div>

        {/* Status Badge */}
        <div className="pt-1">
          <StatusBadge status={lead.status} />
        </div>

        {/* Contact details */}
        <div className="space-y-2.5 pt-2 border-t border-slate-50 text-xs">
          {/* Email */}
          <div className="flex items-center gap-2 text-slate-500">
            <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <a
              href={`mailto:${lead.email}`}
              className="font-semibold hover:text-blue-600 truncate transition-colors focus:outline-none focus:underline"
            >
              {lead.email}
            </a>
          </div>

          {/* Phone */}
          {lead.phone && (
            <div className="flex items-center gap-2 text-slate-500">
              <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" />
              <a
                href={`tel:${lead.phone}`}
                className="font-semibold hover:text-blue-600 transition-colors focus:outline-none focus:underline"
              >
                {lead.phone}
              </a>
            </div>
          )}

          {/* Source */}
          <div className="flex items-center gap-2 text-slate-500">
            <Globe className="h-3.5 w-3.5 shrink-0 text-slate-400" />
            <span className="font-semibold bg-slate-100 px-2 py-0.5 rounded-md">
              {lead.source}
            </span>
          </div>
        </div>
      </div>

      {/* Footer: Date Added */}
      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 pt-4 border-t border-slate-50 mt-4">
        <Calendar className="h-3.5 w-3.5 shrink-0" />
        <span>Added {formatDate(lead.createdAt)}</span>
      </div>
    </div>
  );
}
