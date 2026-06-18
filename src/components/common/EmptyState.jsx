import React from "react";
import { SearchX, Users } from "lucide-react";

/**
 * Friendly empty state shown inside the Leads page when the filtered result
 * set is empty.
 *
 * Two distinct messages are rendered:
 *  - Zero leads total   → prompt the user to add their first lead.
 *  - Zero after filters → suggest clearing the active search / filter.
 *
 * @param {Object}   props
 * @param {number}   props.totalLeads     - Raw (unfiltered) leads count.
 * @param {Function} props.onClearFilters - Called when the user clicks "Clear filters".
 */
export default function EmptyState({ totalLeads = 0, onClearFilters }) {
  const isFiltered = totalLeads > 0;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 bg-white border border-slate-200/80 rounded-2xl shadow-xs text-center transition-all duration-300 animate-fade-in">
      {/* Icon */}
      <div
        className={`
          flex items-center justify-center h-16 w-16 rounded-2xl mb-5
          ${isFiltered ? "bg-amber-50 text-amber-500" : "bg-blue-50 text-blue-500"}
        `}
      >
        {isFiltered ? (
          <SearchX className="h-8 w-8" aria-hidden="true" />
        ) : (
          <Users className="h-8 w-8" aria-hidden="true" />
        )}
      </div>

      {/* Heading */}
      <h3 className="text-base font-bold text-slate-800 mb-1.5">
        {isFiltered ? "No leads found" : "No leads yet"}
      </h3>

      {/* Supporting message */}
      <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
        {isFiltered
          ? "Your search or filter didn't match any prospects. Try adjusting your criteria or clear the filters to see all leads."
          : "You haven't added any leads yet. Click \"Add Lead\" to register your first prospect and start building your pipeline."}
      </p>

      {/* Action button — only shown when a filter is active */}
      {isFiltered && (
        <button
          onClick={onClearFilters}
          className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm shadow-blue-500/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 cursor-pointer"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
