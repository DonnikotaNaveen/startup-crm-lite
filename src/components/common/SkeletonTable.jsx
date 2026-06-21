/**
 * SkeletonTableRow — a single shimmer table row placeholder.
 * @param {{ cols: number }} props
 */
function SkeletonTableRow({ cols = 6 }) {
  return (
    <tr>
      {[...Array(cols)].map((_, i) => (
        <td key={i} className="px-3 py-3">
          <div className={`skeleton rounded-lg h-4 ${i === 0 ? "w-32" : i === cols - 1 ? "w-16" : "w-20"}`} />
        </td>
      ))}
    </tr>
  );
}

/**
 * SkeletonTable — shimmer placeholder rows for Leads / Contacts tables.
 *
 * @param {Object} props
 * @param {number} [props.rows=5]  - How many skeleton rows to show.
 * @param {number} [props.cols=6]  - How many columns per row.
 */
export default function SkeletonTable({ rows = 5, cols = 6 }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-gray-700 dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-slate-50/75 dark:bg-gray-800/80 border-b border-slate-200 dark:border-gray-700">
              {[...Array(cols)].map((_, i) => (
                <th key={i} className="px-3 py-3">
                  <div className="skeleton h-3 w-16 rounded-md" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
            {[...Array(rows)].map((_, i) => (
              <SkeletonTableRow key={i} cols={cols} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
