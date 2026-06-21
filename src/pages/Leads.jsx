import { useState, useMemo, useEffect, useCallback } from "react";
import { Toaster } from "react-hot-toast";
import { Plus, LayoutGrid, List, X } from "lucide-react";

import LeadForm from "../components/leads/LeadForm";
import LeadCard from "../components/leads/LeadCard";
import LeadTable from "../components/leads/LeadTable";
import SearchBar from "../components/common/SearchBar";
import FilterBar from "../components/common/FilterBar";
import EmptyState from "../components/common/EmptyState";
import ConfirmModal from "../components/common/ConfirmModal";
import { useLeads } from "../context/LeadContext";
import { toastSuccess, toastError } from "../utils/toast";

/**
 * Leads page component maps all prospect cards and tabular layouts together.
 * Manages parent leads CRUD state, search queries, filters, modal transitions,
 * and a confirmation dialog before destructive deletes.
 *
 * @component
 * @returns {React.ReactElement} The Leads page view.
 */
export default function Leads() {
  const { leads, addLead, updateLead, deleteLead } = useLeads();
  const [viewMode, setViewMode] = useState("table"); // "table" or "card"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  // Confirmation modal state
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const handleCloseModal = useCallback(() => {
    setSelectedLead(null);
    setIsModalOpen(false);
  }, []);

  // Accessibility: Close form modal on Esc press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, handleCloseModal]);

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
  const handleClearFilters = useCallback(() => {
    setSearchQuery("");
    setActiveFilter("All");
  }, []);

  const handleOpenAddModal = useCallback(() => {
    setSelectedLead(null);
    setIsModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  }, []);

  /**
   * CREATE or UPDATE lead handler.
   * @param {Object} formData - Validated data from LeadForm.
   */
  const handleFormSubmit = useCallback((formData) => {
    if (selectedLead) {
      updateLead(selectedLead.id, formData);
      toastSuccess(`Prospect "${formData.name}" details updated.`);
    } else {
      addLead(formData);
      toastSuccess(`Prospect "${formData.name}" has been registered.`);
    }
    handleCloseModal();
  }, [selectedLead, updateLead, addLead, handleCloseModal]);

  /**
   * Initiates delete flow — shows confirmation modal instead of deleting immediately.
   * @param {number|string} id - Lead identifier to stage for deletion.
   */
  const handleRequestDelete = useCallback((id) => {
    setPendingDeleteId(id);
  }, []);

  /**
   * Confirmed DELETE handler — called when user confirms in the modal.
   */
  const handleConfirmDelete = useCallback(() => {
    const leadToDelete = leads.find((l) => l.id === pendingDeleteId);
    deleteLead(pendingDeleteId);
    toastError(`Lead "${leadToDelete?.name || ""}" removed from database.`);
    setPendingDeleteId(null);
  }, [leads, deleteLead, pendingDeleteId]);

  const handleCancelDelete = useCallback(() => {
    setPendingDeleteId(null);
  }, []);

  const pendingDeleteName = leads.find((l) => l.id === pendingDeleteId)?.name ?? "";

  return (
    <div className="w-full max-w-full overflow-hidden space-y-6 animate-fade-in">
      <Toaster position="top-right" />

      {/* ── Confirmation Modal ─────────────────────────────────────────────── */}
      <ConfirmModal
        isOpen={pendingDeleteId !== null}
        title="Delete Lead?"
        message={`Are you sure you want to permanently remove "${pendingDeleteName}" from the pipeline? This action cannot be undone.`}
        confirmLabel="Delete Lead"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* ── Header ─────────────────────────────────────────────────────────── */}
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
          className="flex min-h-11 items-center justify-center gap-1.5 self-start rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/10 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 sm:self-auto"
          aria-label="Add new lead"
        >
          <Plus className="h-4.5 w-4.5" /> Add Lead
        </button>
      </div>

      {/* ── Search + View toggle ─────────────────────────────────────────────── */}
      <div className="flex w-full max-w-full flex-col gap-3 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs md:flex-row dark:border-gray-700 dark:bg-gray-800">
        {/* SearchBar component — debounced */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Table / Card view toggle */}
        <div className="hidden shrink-0 items-center rounded-xl border border-slate-200/60 bg-slate-50 p-0.5 md:flex lg:hidden dark:border-gray-700 dark:bg-gray-900">
          <button
            onClick={() => setViewMode("table")}
            className={`flex h-11 w-11 items-center justify-center rounded-lg transition-all focus:outline-none ${
              viewMode === "table"
                ? "bg-white text-blue-600 shadow-xs border-slate-200/20 dark:bg-gray-800 dark:text-blue-400"
                : "text-slate-400 hover:text-slate-700 dark:text-gray-500 dark:hover:text-gray-200"
            }`}
            title="Table View"
            aria-label="Switch to table view"
          >
            <List className="h-4.5 w-4.5" />
          </button>
          <button
            onClick={() => setViewMode("card")}
            className={`flex h-11 w-11 items-center justify-center rounded-lg transition-all focus:outline-none ${
              viewMode === "card"
                ? "bg-white text-blue-600 shadow-xs border-slate-200/20 dark:bg-gray-800 dark:text-blue-400"
                : "text-slate-400 hover:text-slate-700 dark:text-gray-500 dark:hover:text-gray-200"
            }`}
            title="Card View"
            aria-label="Switch to card view"
          >
            <LayoutGrid className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* ── FilterBar ──────────────────────────────────────────────────────────── */}
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        leads={leads}
      />

      {/* ── Main content grid ──────────────────────────────────────────────────── */}
      <div className="w-full max-w-full overflow-hidden transition-all duration-300">

        {/* Table view (hidden on mobile) */}
        <div className={`hidden w-full max-w-full ${viewMode === "table" ? "md:block" : "md:hidden"} lg:block`}>
          {filteredLeads.length > 0 ? (
            <LeadTable
              leads={filteredLeads}
              onEdit={handleOpenEditModal}
              onDelete={handleRequestDelete}
            />
          ) : (
            <EmptyState
              totalLeads={leads.length}
              onClearFilters={handleClearFilters}
            />
          )}
        </div>

        {/* Card view — always rendered on mobile, or when toggled */}
        <div className={viewMode === "table" ? "md:hidden lg:hidden" : "lg:hidden"}>
          {filteredLeads.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {filteredLeads.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onEdit={handleOpenEditModal}
                  onDelete={handleRequestDelete}
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

      {/* ── Add / Edit Modal ──────────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-slate-900/40 backdrop-blur-xs animate-fade-in md:items-center md:p-4 dark:bg-black/60">
          {/* Backdrop close */}
          <div className="absolute inset-0" onClick={handleCloseModal} aria-hidden="true" />

          {/* Modal content */}
          <div
            className="relative z-10 h-full w-full overflow-y-auto border border-slate-200/50 bg-white p-4 shadow-xl transition-transform duration-300 md:h-auto md:max-h-[90vh] md:max-w-lg md:rounded-2xl md:p-5 dark:border-gray-700 dark:bg-gray-900"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Close button */}
            <button
              onClick={handleCloseModal}
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500/20 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-200"
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
