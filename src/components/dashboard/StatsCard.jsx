import React from "react";

/**
 * @typedef {Object} StatsCardProps
 * @property {string} title - The name of the metric (e.g., "Total Leads").
 * @property {string|number} value - The formatted value of the metric (e.g., "$45,200", "148").
 * @property {React.ComponentType<{className?: string}>} icon - The Lucide React icon component to render.
 * @property {string|number} change - The percentage change vs last period, including prefix (e.g., "+12.5%", "-3.2%").
 * @property {"blue"|"green"|"yellow"|"red"|"purple"|"indigo"|"success"|"warning"|"danger"} color - Theme color key mapping for the icon container.
 */

/**
 * StatsCard component displays a key performance indicator (KPI) metric.
 * Includes a descriptor title, large metric value, colored thematic icon,
 * and a stylized badge signaling positive or negative performance trend.
 *
 * @component
 * @param {StatsCardProps} props - Component properties.
 * @returns {React.ReactElement} The StatsCard component.
 */
export default function StatsCard({ title, value, icon: IconComponent, change, color }) {
  // Determine if the trend change is positive, negative, or stable
  const changeStr = String(change);
  const isPositive = changeStr.startsWith("+");
  const isNegative = changeStr.startsWith("-");

  // Map theme colors to CSS style tags
  const getColorClasses = (colorName) => {
    switch (colorName) {
      case "blue":
      case "primary":
        return "bg-blue-50 text-blue-600 border border-blue-100/50 group-hover:bg-blue-100/80";
      case "green":
      case "success":
        return "bg-emerald-50 text-emerald-600 border border-emerald-100/50 group-hover:bg-emerald-100/80";
      case "yellow":
      case "warning":
        return "bg-amber-50 text-amber-600 border border-amber-100/50 group-hover:bg-amber-100/80";
      case "red":
      case "danger":
        return "bg-rose-50 text-rose-600 border border-rose-100/50 group-hover:bg-rose-100/80";
      case "purple":
        return "bg-purple-50 text-purple-600 border border-purple-100/50 group-hover:bg-purple-100/80";
      case "indigo":
        return "bg-indigo-50 text-indigo-600 border border-indigo-100/50 group-hover:bg-indigo-100/80";
      default:
        return "bg-slate-50 text-slate-600 border border-slate-100/50 group-hover:bg-slate-100/80";
    }
  };

  // Determine change indicator styling
  let changeBadgeClasses = "bg-slate-50 text-slate-700 border-slate-100";
  if (isPositive) {
    changeBadgeClasses = "bg-emerald-50 text-emerald-700 border-emerald-100/80";
  } else if (isNegative) {
    changeBadgeClasses = "bg-rose-50 text-rose-700 border-rose-100/80";
  }

  return (
    <div className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs hover:-translate-y-1 hover:shadow-md transition-all duration-300">
      <div className="flex items-center justify-between">
        {/* Metric Label */}
        <span className="text-sm font-bold text-slate-500 tracking-wide">{title}</span>
        
        {/* Icon Container */}
        <div className={`rounded-xl p-2.5 transition-colors duration-200 ${getColorClasses(color)}`}>
          <IconComponent className="h-5 w-5 shrink-0" />
        </div>
      </div>

      {/* Main Metric Value and Trend */}
      <div className="mt-4 flex items-baseline gap-2.5">
        <span className="text-3xl font-extrabold text-slate-900 tracking-tight leading-none">
          {value}
        </span>
        <span className={`inline-flex items-center gap-0.5 rounded-full px-2.5 py-0.5 text-xs font-bold border ${changeBadgeClasses}`}>
          {change}
        </span>
      </div>

      {/* Timeline context */}
      <p className="mt-2 text-xs font-semibold text-slate-400">
        vs last month
      </p>
    </div>
  );
}
