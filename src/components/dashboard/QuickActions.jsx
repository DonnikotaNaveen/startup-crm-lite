import { UserPlus, ArrowRight, Download } from "lucide-react";

/**
 * QuickActions displays common administrative CRM task buttons with dark mode support.
 */
export default function QuickActions({ onAddLead, onViewLeads, onExportData }) {
  const actions = [
    {
      title: "Add New Lead",
      description: "Register a fresh sales prospect",
      icon: UserPlus,
      colorClass: "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-100/30 dark:border-blue-900/40 group-hover:bg-blue-100/80 dark:group-hover:bg-blue-900/50",
      action: onAddLead,
    },
    {
      title: "View All Leads",
      description: "Examine the full CRM pipeline",
      icon: ArrowRight,
      colorClass: "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-100/30 dark:border-emerald-900/40 group-hover:bg-emerald-100/80 dark:group-hover:bg-emerald-900/50",
      action: onViewLeads,
    },
    {
      title: "Export Data",
      description: "Download prospect list to CSV",
      icon: Download,
      colorClass: "bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-100/30 dark:border-amber-900/40 group-hover:bg-amber-100/80 dark:group-hover:bg-amber-900/50",
      action: onExportData,
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-xs">
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900 dark:text-gray-100 leading-snug">Quick Actions</h2>
        <p className="text-xs font-semibold text-slate-400 dark:text-gray-500 mt-0.5">
          Execute common administrative CRM tasks.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {actions.map((action, idx) => {
          const IconComponent = action.icon;
          return (
            <button
              key={idx}
              onClick={action.action}
              className="group flex flex-col items-start text-left p-4 rounded-xl
                border border-slate-200/60 dark:border-gray-700
                bg-white dark:bg-gray-800
                hover:bg-slate-50/50 dark:hover:bg-gray-700
                hover:border-slate-300 dark:hover:border-gray-600
                hover:shadow-xs transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer w-full"
            >
              <div className={`rounded-xl p-2.5 mb-3.5 border transition-colors duration-200 ${action.colorClass}`}>
                <IconComponent className="h-5 w-5 shrink-0" />
              </div>
              <span className="text-sm font-bold text-slate-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {action.title}
              </span>
              <span className="text-xs font-semibold text-slate-400 dark:text-gray-500 mt-1 leading-snug">
                {action.description}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
