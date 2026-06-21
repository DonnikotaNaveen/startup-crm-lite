/**
 * StatsCard displays a key performance indicator with dark mode support.
 * Renders as a div to avoid browser-specific native button layout and height/width bugs,
 * while maintaining keyboard and screen-reader accessibility when clickable.
 *
 * @param {{ title: string, value: string|number, icon: React.ComponentType, change: string, color: string, onClick?: Function }} props
 */
export default function StatsCard({ title, value, icon: IconComponent, change, color, onClick }) {
  const changeStr = String(change);
  const isPositive = changeStr.startsWith("+");
  const isNegative = changeStr.startsWith("-");

  const getColorClasses = (colorName) => {
    switch (colorName) {
      case "blue":
      case "primary":
        return "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100/50 dark:border-blue-900/50 group-hover:bg-blue-100/80 dark:group-hover:bg-blue-900/50";
      case "green":
      case "success":
        return "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/50 group-hover:bg-emerald-100/80 dark:group-hover:bg-emerald-900/50";
      case "yellow":
      case "warning":
        return "bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-100/50 dark:border-amber-900/50 group-hover:bg-amber-100/80 dark:group-hover:bg-amber-900/50";
      case "red":
      case "danger":
        return "bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-100/50 dark:border-rose-900/50 group-hover:bg-rose-100/80 dark:group-hover:bg-rose-900/50";
      case "purple":
        return "bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 border border-purple-100/50 dark:border-purple-900/50 group-hover:bg-purple-100/80 dark:group-hover:bg-purple-900/50";
      case "indigo":
        return "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/50 group-hover:bg-indigo-100/80 dark:group-hover:bg-indigo-900/50";
      default:
        return "bg-slate-50 dark:bg-gray-800 text-slate-600 dark:text-gray-300 border border-slate-100/50 dark:border-gray-700 group-hover:bg-slate-100/80 dark:group-hover:bg-gray-700";
    }
  };

  let changeBadgeClasses = "bg-slate-50 dark:bg-gray-800 text-slate-700 dark:text-gray-300 border-slate-100 dark:border-gray-700";
  if (isPositive) changeBadgeClasses = "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-emerald-100/80 dark:border-emerald-900/50";
  else if (isNegative) changeBadgeClasses = "bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 border-rose-100/80 dark:border-rose-900/50";

  const handleKeyDown = (e) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`group flex h-full flex-col rounded-2xl border border-slate-200/80 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-xs hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-all duration-300 text-left w-full ${onClick ? "cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20" : ""}`}
      aria-label={onClick ? `Navigate to ${title}` : undefined}
    >
      {/* Top row: title + icon */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-slate-500 dark:text-gray-400 tracking-wide">{title}</span>
        <div className={`rounded-xl p-2.5 transition-colors duration-200 ${getColorClasses(color)}`}>
          <IconComponent className="h-5 w-5 shrink-0" />
        </div>
      </div>

      {/* Value + change badge */}
      <div className="mt-4 flex items-baseline gap-2.5">
        <span className="text-3xl font-extrabold text-slate-900 dark:text-gray-100 tracking-tight leading-none">
          {value}
        </span>
        <span className={`inline-flex items-center gap-0.5 rounded-full px-2.5 py-0.5 text-xs font-bold border ${changeBadgeClasses}`}>
          {change}
        </span>
      </div>

      {/* Footer label */}
      <p className="mt-2 text-xs font-semibold text-slate-400 dark:text-gray-500">vs last month</p>
    </div>
  );
}
