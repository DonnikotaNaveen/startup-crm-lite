/**
 * SkeletonCard — shimmer placeholder for dashboard KPI metric cards.
 */
export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="skeleton h-4 w-24 rounded-lg" />
        <div className="skeleton h-10 w-10 rounded-xl" />
      </div>
      <div className="mt-4 flex items-baseline gap-2.5">
        <div className="skeleton h-8 w-16 rounded-lg" />
        <div className="skeleton h-5 w-14 rounded-full" />
      </div>
      <div className="mt-2">
        <div className="skeleton h-3 w-20 rounded-md" />
      </div>
    </div>
  );
}

/**
 * SkeletonCards — a grid of 4 skeleton cards for the dashboard stats row.
 */
export function SkeletonCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
