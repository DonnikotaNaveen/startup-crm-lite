import { useState, useMemo, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Plus, LayoutGrid, List, X } from "lucide-react";

import LeadForm from "../components/leads/LeadForm";
import LeadCard from "../components/leads/LeadCard";
import LeadTable from "../components/leads/LeadTable";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import EmptyState from "../components/common/EmptyState";
import { useLeads } from "../context/LeadContext";

/**
 * Leads page component maps all prospect cards and tabular layouts together.
 * Manages parent leads CRUD state, search queries, filters, and modal transitions.
 *
 * @component
 * @returns {React.ReactElement} The Leads page view.
 */
export default function Leads() {
  const { leads, addLead, updateLead, deleteLead } = useLeads();
  const [viewMode, setViewMode] = useState("table"); // "table" or "card"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const handleCloseModal = () => {
    setSelectedLead(null);
    setIsModalOpen(false);
  };

  // Accessibility: Close modal on Esc press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  /**
   * Derived filtered list — recomputed only when leads, searchQuery or
   * activeFilter change.  Status filter is applied first (cheaper), then
   * the text search across name / company / email.
   */
  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => activeFilter === "All" || lead.status === activeFilter)
      .filter((lead) =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
  }, [leads, searchQuery, activeFilter]);

  /** Reset both search and filter to defaults. */
  const handleClearFilters = () => {
    setSearchQuery("");
    setActiveFilter("All");
  };

  const handleOpenAddModal = () => {
    setSelectedLead(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  /**
   * CREATE or UPDATE lead handler.
   * @param {Object} formData - Validated data from LeadForm.
   */
  const handleFormSubmit = (formData) => {
    if (selectedLead) {
      // UPDATE mode
      updateLead(selectedLead.id, formData);
      toast.success(`Prospect "${formData.name}" details updated.`, {
        style: {
          borderRadius: "12px",
          background: "#0F172A",
          color: "#FFF",
          fontSize: "14px",
          fontWeight: "600",
        },
      });
    } else {
      // CREATE mode
      addLead(formData);
      toast.success(`Prospect "${formData.name}" has been registered.`, {
        style: {
          borderRadius: "12px",
          background: "#0F172A",
          color: "#FFF",
          fontSize: "14px",
          fontWeight: "600",
        },
      });
    }
    handleCloseModal();
  };

  /**
   * DELETE lead handler.
   * @param {number|string} id - Lead identifier to remove.
   */
  const handleDeleteLead = (id) => {
    const leadToDelete = leads.find((l) => l.id === id);
    deleteLead(id);
    toast.error(`Lead "${leadToDelete?.name || ""}" removed from database.`, {
      style: {
        borderRadius: "12px",
        background: "#EF4444",
        color: "#FFF",
        fontSize: "14px",
        fontWeight: "600",
      },
    });
  };

  return (
    <div className="w-full max-w-full overflow-hidden space-y-6 animate-fade-in">
      <Toaster position="top-right" />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex w-full max-w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
        
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1 dark:text-white">
            Lead Management
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1 dark:text-gray-400">
            Track, segment, and progress client deals through the sales pipeline stages.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center justify-center gap-1.5 px-4.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 hover:shadow-lg transition-all duration-200 cursor-pointer self-start sm:self-auto focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <Plus className="h-4.5 w-4.5" /> Add Lead
        </button>
      </div>

      {/* ── Search + View toggle ────────────────────────────────────────── */}
      <div className="flex w-full max-w-full flex-col gap-3 overflow-hidden bg-white p-4 border border-slate-200/80 rounded-2xl shadow-xs md:flex-row dark:border-gray-700 dark:bg-gray-800">

        {/* SearchBar component — debounced */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Table / Card view toggle */}
        <div className="flex items-center border border-slate-200/60 rounded-xl p-0.5 bg-slate-50 shrink-0 dark:border-gray-700 dark:bg-gray-900">
          <button
            onClick={() => setViewMode("table")}
            className={`p-1.5 rounded-lg transition-all focus:outline-none cursor-pointer ${
              viewMode === "table"
                ? "bg-white text-blue-600 shadow-xs border-slate-200/20 dark:bg-gray-800 dark:text-blue-400"
                : "text-slate-400 hover:text-slate-700 dark:text-gray-500 dark:hover:text-gray-200"
            }`}
            title="Table View"
          >
            <List className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`p-1.5 rounded-lg transition-all focus:outline-none cursor-pointer ${
              viewMode === "card"
                ? "bg-white text-blue-600 shadow-xs border-slate-200/20 dark:bg-gray-800 dark:text-blue-400"
                : "text-slate-400 hover:text-slate-700 dark:text-gray-500 dark:hover:text-gray-200"
            }`}
            title="Card View"
          >
            <LayoutGrid className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* ── FilterBar ───────────────────────────────────────────────────── */}
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        leads={leads}
      />

      {/* ── Main content grid ────────────────────────────────────────────── */}
      <div className="w-full max-w-full overflow-hidden transition-all duration-300">

        {/* Table view (hidden on mobile) */}
        {viewMode === "table" && (
          <div className="hidden w-full max-w-full overflow-hidden md:block">
            {filteredLeads.length > 0 ? (
              <LeadTable
                leads={filteredLeads}
                onEdit={handleOpenEditModal}
                onDelete={handleDeleteLead}
              />
            ) : (
              <EmptyState
                totalLeads={leads.length}
                onClearFilters={handleClearFilters}
              />
            )}
          </div>
        )}

        {/* Card view — always rendered on mobile, or when toggled */}
        <div className={viewMode === "table" ? "md:hidden" : ""}>
          {filteredLeads.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteLead}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              totalLeads={leads.length}
              onClearFilters={handleClearFilters}
            />
          )}
        </div>
      </div>

      {/* ── Add / Edit Modal ────────────────────────────────────────────── */}
      {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in dark:bg-black/60">
          {/* Backdrop close */}
          <div className="absolute inset-0" onClick={handleCloseModal} aria-hidden="true" />

          {/* Modal content */}
          <div
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-xl border border-slate-200/50 p-5 z-10 transform scale-100 transition-transform duration-300 max-h-[90vh] overflow-y-auto dark:border-gray-700 dark:bg-gray-900"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/20 cursor-pointer dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            <LeadForm
              key={selectedLead?.id || "new-lead"}
              initialData={selectedLead}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
