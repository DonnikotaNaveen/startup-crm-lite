import React, { useState, useMemo, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { 
  Plus, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  X,
  ChevronDown,
  Sparkles
} from "lucide-react";

import LeadForm from "../components/leads/LeadForm";
import LeadCard from "../components/leads/LeadCard";
import LeadTable from "../components/leads/LeadTable";

// Predefined default prospects for seed database
const initialLeads = [
  { id: 1, name: "Alice Vance", company: "CyberSpace Tech", email: "alice@cyberspace.io", phone: "+1 (555) 019-2834", status: "Won", source: "Website", createdAt: "2026-06-15" },
  { id: 2, name: "David Miller", company: "Alpha Systems", email: "david@alphasys.com", phone: "+1 (555) 014-9382", status: "Contacted", source: "Cold Call", createdAt: "2026-06-14" },
  { id: 3, name: "Emma Watson", company: "DevLink Solutions", email: "emma@devlink.co", phone: "+1 (555) 017-4729", status: "Won", source: "Referral", createdAt: "2026-06-13" },
  { id: 4, name: "Frank Wright", company: "Global Corp", email: "frank@globalcorp.net", phone: "+1 (555) 012-3849", status: "Proposal Sent", source: "LinkedIn", createdAt: "2026-06-12" },
  { id: 5, name: "Grace Hopper", company: "Quantum Labs", email: "grace@quantum.edu", phone: "+1 (555) 015-8392", status: "New", source: "Email Campaign", createdAt: "2026-06-11" },
  { id: 6, name: "Henry Jekyll", company: "Hydra Labs", email: "henry@hydralabs.org", phone: "+1 (555) 018-9382", status: "Lost", source: "Other", createdAt: "2026-06-10" },
  { id: 7, name: "Irene Adler", company: "Bohemia Media", email: "irene@bohemiamedia.cz", phone: "+1 (555) 019-2043", status: "Meeting Scheduled", source: "Referral", createdAt: "2026-06-09" },
];

/**
 * Leads page component maps all prospect cards and tabular layouts together.
 * Manages parent leads CRUD state, search queries, filters, and modal transitions.
 *
 * @component
 * @returns {React.ReactElement} The Leads page view.
 */
export default function Leads() {
  const [leads, setLeads] = useState(initialLeads);
  const [viewMode, setViewMode] = useState("table"); // "table" or "card"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  
  // Search and status filter inputs
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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

  // Compute filtered array
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch = 
        lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || lead.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [leads, searchTerm, statusFilter]);

  const handleOpenAddModal = () => {
    setSelectedLead(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedLead(null);
    setIsModalOpen(false);
  };

  /**
   * CREATE or UPDATE lead handler.
   * @param {Object} formData - Validated data from LeadForm.
   */
  const handleFormSubmit = (formData) => {
    if (selectedLead) {
      // UPDATE mode
      setLeads((prev) =>
        prev.map((lead) => (lead.id === formData.id ? { ...lead, ...formData } : lead))
      );
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
      const newLead = {
        ...formData,
        id: Date.now(),
        createdAt: new Date().toISOString().split("T")[0],
      };
      setLeads((prev) => [newLead, ...prev]);
      toast.success(`Prospect "${newLead.name}" has been registered.`, {
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
    setLeads((prev) => prev.filter((lead) => lead.id !== id));
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
    <div className="space-y-6 animate-fade-in">
      <Toaster position="top-right" />

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Workspace Funnel</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">Lead Management</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">
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

      {/* Search, Filter & Layout toggle bar */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 border border-slate-200/80 rounded-2xl shadow-xs">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search leads by name, email, or company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 focus:bg-white border border-slate-200/60 focus:border-blue-500 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
          />
        </div>

        {/* Filters & Layout Toggles */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Status Dropdown */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-9 pr-8 py-2 bg-slate-50 hover:bg-slate-100/50 border border-slate-200/60 rounded-xl text-sm font-semibold text-slate-600 appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50 transition-all"
            >
              <option value="All">All Stages</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Meeting Scheduled">Meeting Scheduled</option>
              <option value="Proposal Sent">Proposal Sent</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center border border-slate-200/60 rounded-xl p-0.5 bg-slate-50 shrink-0">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg transition-all focus:outline-none cursor-pointer ${
                viewMode === "table"
                  ? "bg-white text-blue-600 shadow-xs border-slate-200/20"
                  : "text-slate-400 hover:text-slate-700"
              }`}
              title="Table View"
            >
              <List className="h-4.5 w-4.5" />
            </button>
            <button
              onClick={() => setViewMode("card")}
              className={`p-1.5 rounded-lg transition-all focus:outline-none cursor-pointer ${
                viewMode === "card"
                  ? "bg-white text-blue-600 shadow-xs border-slate-200/20"
                  : "text-slate-400 hover:text-slate-700"
              }`}
              title="Card View"
            >
              <LayoutGrid className="h-4.5 w-4.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main representation grid */}
      <div className="transition-all duration-300">
        {viewMode === "table" ? (
          <div className="hidden md:block">
            <LeadTable
              leads={filteredLeads}
              onEdit={handleOpenEditModal}
              onDelete={handleDeleteLead}
            />
          </div>
        ) : null}

        {/* Fallback to Card view on mobile or if toggled */}
        <div className={viewMode === "table" ? "md:hidden" : ""}>
          {filteredLeads.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            <div className="bg-white border border-slate-200 rounded-2xl shadow-xs py-12 text-center text-sm font-semibold text-slate-400">
              No prospects matched your criteria.
            </div>
          )}
        </div>
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fade-in">
          {/* Modal Backdrop close link */}
          <div className="absolute inset-0" onClick={handleCloseModal} aria-hidden="true" />
          
          {/* Modal Content container */}
          <div 
            className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-slate-200/50 p-6 z-10 transform scale-100 transition-transform duration-300 max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Modal close cross button */}
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500/20 cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Render core form */}
            <LeadForm
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
