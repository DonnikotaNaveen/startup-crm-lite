import React from "react";
import { UserPlus, ArrowRight, Download } from "lucide-react";

/**
 * @typedef {Object} QuickActionsProps
 * @property {function():void} [onAddLead] - Callback function triggered when "Add New Lead" is clicked.
 * @property {function():void} [onViewLeads] - Callback function triggered when "View All Leads" is clicked.
 * @property {function():void} [onExportData] - Callback function triggered when "Export Data" is clicked.
 */

/**
 * QuickActions component displays a list of standard tasks in the workspace.
 * Uses micro-card layouts, colorful Lucide icon badges, and helper text.
 *
 * @component
 * @param {QuickActionsProps} props - Component properties.
 * @returns {React.ReactElement} The QuickActions component.
 */
export default function QuickActions({ onAddLead, onViewLeads, onExportData }) {
  const actions = [
    {
      title: "Add New Lead",
      description: "Register a fresh sales prospect",
      icon: UserPlus,
      colorClass: "bg-blue-50 text-blue-600 border-blue-100/30 group-hover:bg-blue-100/80",
      action: onAddLead,
    },
    {
      title: "View All Leads",
      description: "Examine the full CRM pipeline",
      icon: ArrowRight,
      colorClass: "bg-emerald-50 text-emerald-600 border-emerald-100/30 group-hover:bg-emerald-100/80",
      action: onViewLeads,
    },
    {
      title: "Export Data",
      description: "Download prospect list to CSV",
      icon: Download,
      colorClass: "bg-amber-50 text-amber-600 border-amber-100/30 group-hover:bg-amber-100/80",
      action: onExportData,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
      {/* Title Panel */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900 leading-snug">Quick Actions</h2>
        <p className="text-xs font-semibold text-slate-400 mt-0.5">
          Execute common administrative CRM tasks.
        </p>
      </div>

      {/* Grid of Micro-card Action Buttons */}
      <div className="grid gap-4 sm:grid-cols-3">
        {actions.map((action, idx) => {
          const IconComponent = action.icon;
          return (
            <button
              key={idx}
              onClick={action.action}
              className="group flex flex-col items-start text-left p-4 rounded-xl border border-slate-200/60 bg-white hover:bg-slate-50/50 hover:border-slate-300 hover:shadow-xs transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer w-full"
            >
              {/* Icon container */}
              <div className={`rounded-xl p-2.5 mb-3.5 border transition-colors duration-200 ${action.colorClass}`}>
                <IconComponent className="h-5 w-5 shrink-0" />
              </div>

              {/* Title & Description */}
              <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                {action.title}
              </span>
              <span className="text-xs font-semibold text-slate-400 mt-1 leading-snug">
                {action.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
