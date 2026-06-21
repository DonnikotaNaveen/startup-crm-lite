import { useMemo, useState, useEffect, useCallback } from "react";
import { Plus, Mail, Phone, Building, X, Eye, Edit3, Trash2, ChevronUp, ChevronDown, ChevronsUpDown, Contact as ContactIcon } from "lucide-react";
import { Toaster } from "react-hot-toast";

import { useContacts } from "../context/ContactContext";
import ContactForm from "../components/contacts/ContactForm";
import SearchBar from "../components/common/SearchBar";
import Avatar from "../components/common/Avatar";
import ConfirmModal from "../components/common/ConfirmModal";
import Tooltip from "../components/common/Tooltip";
import { toastSuccess, toastError } from "../utils/toast";

/**
 * SortIcon — chevron indicator for sortable column headers.
 */
function SortIcon({ field, sortField, sortDir }) {
  if (sortField !== field) return <ChevronsUpDown className="h-3.5 w-3.5 text-slate-300 dark:text-gray-600" />;
  return sortDir === "asc"
    ? <ChevronUp className="h-3.5 w-3.5 text-blue-500" />
    : <ChevronDown className="h-3.5 w-3.5 text-blue-500" />;
}

/**
 * Contacts directory view — full CRUD with sorting, row actions, and confirmation dialogs.
 *
 * @returns {JSX.Element}
 */
export default function Contacts() {
  const { contacts, addContact, updateContact, deleteContact } = useContacts();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  // Sorting state
  const [sortField, setSortField] = useState(null);
  const [sortDir, setSortDir] = useState("asc");

  /* ── Sorting ─────────────────────────────────────────────────────────── */
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  };

  /* ── Modal controls ──────────────────────────────────────────────────── */
  const handleOpenAddModal = useCallback(() => {
    setSelectedContact(null);
    setIsModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedContact(null);
    setIsModalOpen(false);
  }, []);

  // Close form modal on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) handleCloseModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, handleCloseModal]);

  /* ── CRUD handlers ───────────────────────────────────────────────────── */
  const handleFormSubmit = useCallback((formData) => {
    if (selectedContact) {
      updateContact(selectedContact.id, formData);
      toastSuccess(`Contact "${formData.name}" updated successfully.`);
    } else {
      addContact(formData);
      toastSuccess(`Contact "${formData.name}" has been added.`);
    }
    handleCloseModal();
  }, [selectedContact, updateContact, addContact, handleCloseModal]);

  const handleRequestDelete = useCallback((id) => {
    setPendingDeleteId(id);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    const contact = contacts.find((c) => c.id === pendingDeleteId);
    deleteContact(pendingDeleteId);
    toastError(`Contact "${contact?.name || ""}" has been removed.`);
    setPendingDeleteId(null);
  }, [contacts, deleteContact, pendingDeleteId]);

  const handleCancelDelete = useCallback(() => setPendingDeleteId(null), []);

  /* ── Filtered + sorted contacts ──────────────────────────────────────── */
  const filteredContacts = useMemo(() => {
    const query = searchTerm.toLowerCase();
    const filtered = contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(query) ||
        c.company.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query)
    );

    if (!sortField) return filtered;

    return [...filtered].sort((a, b) => {
      const valA = String(a[sortField] ?? "").toLowerCase();
      const valB = String(b[sortField] ?? "").toLowerCase();
      if (valA < valB) return sortDir === "asc" ? -1 : 1;
      if (valA > valB) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [contacts, searchTerm, sortField, sortDir]);

  const pendingDeleteName = contacts.find((c) => c.id === pendingDeleteId)?.name ?? "";

  /* ── Sortable TH helper ──────────────────────────────────────────────── */
  const SortableTh = ({ field, label, className = "" }) => (
    <th
      scope="col"
      className={`px-4 py-3 ${className}`}
      aria-sort={sortField === field ? (sortDir === "asc" ? "ascending" : "descending") : "none"}
    >
      <button
        onClick={() => handleSort(field)}
        className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider hover:text-slate-800 dark:hover:text-gray-200 transition-colors focus:outline-none"
        aria-label={`Sort by ${label}`}
      >
        {label}
        <SortIcon field={field} sortField={sortField} sortDir={sortDir} />
      </button>
    </th>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <Toaster position="top-right" />

      {/* ── Confirmation Modal ────────────────────────────────────────────── */}
      <ConfirmModal
        isOpen={pendingDeleteId !== null}
        title="Delete Contact?"
        message={`Are you sure you want to permanently remove "${pendingDeleteName}" from the directory? This action cannot be undone.`}
        confirmLabel="Delete Contact"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

      {/* ── Header Panel ─────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <span>CRM Database</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1 dark:text-white">
            Contacts Directory
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-1 dark:text-gray-400">
            Manage and sync client contacts across active startup accounts.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex min-h-11 items-center justify-center gap-1.5 self-start rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/10 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg sm:self-auto cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          aria-label="Add new contact"
        >
          <Plus className="h-4 w-4" /> Add Contact
        </button>
      </div>

      {/* ── Search ────────────────────────────────────────────────────────── */}
      <div className="flex gap-4 bg-white p-4 border border-slate-200/80 rounded-2xl shadow-xs dark:border-gray-700 dark:bg-gray-800">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search contacts by name, company, or email..."
          ariaLabel="Search contacts"
        />
      </div>

      {/* ── Table ─────────────────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-gray-700 dark:bg-gray-800">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-400">
                <SortableTh field="name" label="Contact" className="w-[28%]" />
                <SortableTh field="company" label="Company" className="hidden w-[20%] lg:table-cell" />
                <th scope="col" className="w-[26%] px-4 py-3 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider lg:w-[20%]">
                  Email
                </th>
                <th scope="col" className="hidden w-[16%] px-4 py-3 text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider md:table-cell">
                  Phone
                </th>
                <SortableTh field="status" label="Status" className="w-[14%] lg:w-[8%]" />
                <th scope="col" className="w-[12%] px-4 py-3 text-right text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-slate-50/60 transition-colors duration-150 group dark:hover:bg-gray-700/40">
                    {/* Contact name */}
                    <td className="px-4 py-3 align-middle">
                      <div className="flex items-center gap-3">
                        <Avatar name={contact.name} className="h-9 w-9 shrink-0 text-sm font-bold" />
                        <span className="min-w-0 truncate text-sm font-bold text-slate-900 dark:text-white">
                          {contact.name}
                        </span>
                      </div>
                    </td>

                    {/* Company */}
                    <td className="hidden px-4 py-3 align-middle text-sm font-semibold text-slate-500 lg:table-cell dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Building className="h-4 w-4 shrink-0 text-slate-400 dark:text-gray-500" />
                        <span className="truncate max-w-[120px]">{contact.company}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-4 py-3 align-middle text-sm text-slate-600 dark:text-gray-300">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-4 w-4 shrink-0 text-slate-400 dark:text-gray-500" />
                        <span className="min-w-0 truncate">{contact.email}</span>
                      </div>
                    </td>

                    {/* Phone */}
                    <td className="hidden px-4 py-3 align-middle text-sm text-slate-600 md:table-cell dark:text-gray-300">
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-4 w-4 shrink-0 text-slate-400 dark:text-gray-500" />
                        <span className="whitespace-nowrap">{contact.phone}</span>
                      </div>
                    </td>

                    {/* Status badge — whitespace-nowrap prevents clipping */}
                    <td className="px-4 py-3 align-middle">
                      <span className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-bold ${
                        contact.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900"
                          : "bg-slate-50 text-slate-700 border-slate-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                      }`}>
                        {contact.status}
                      </span>
                    </td>

                    {/* Row actions */}
                    <td className="px-4 py-3 align-middle text-right">
                      <div className="flex items-center justify-end gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                        <Tooltip label="View" placement="top">
                          <button
                            onClick={() => handleOpenEditModal(contact)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:text-gray-500 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                            aria-label={`View ${contact.name}`}
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </Tooltip>
                        <Tooltip label="Edit" placement="top">
                          <button
                            onClick={() => handleOpenEditModal(contact)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500/20 dark:text-gray-500 dark:hover:bg-gray-700 dark:hover:text-gray-200"
                            aria-label={`Edit ${contact.name}`}
                          >
                            <Edit3 className="h-4 w-4" />
                          </button>
                        </Tooltip>
                        <Tooltip label="Delete" placement="top">
                          <button
                            onClick={() => handleRequestDelete(contact.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-all hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500/20 dark:text-gray-500 dark:hover:bg-rose-950/50 dark:hover:text-rose-400"
                            aria-label={`Delete ${contact.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                /* Professional empty state */
                <tr>
                  <td colSpan={6}>
                    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/40 mb-4">
                        <ContactIcon className="h-7 w-7 text-blue-500 dark:text-blue-400" />
                      </div>
                      <h3 className="text-base font-bold text-slate-800 dark:text-white mb-1.5">
                        {contacts.length === 0 ? "No contacts yet" : "No contacts found"}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-gray-400 max-w-xs leading-relaxed">
                        {contacts.length === 0
                          ? "Add your first contact to start building the directory."
                          : "Your search didn't match any contacts. Try a different query."}
                      </p>
                      {searchTerm && (
                        <button
                          onClick={() => setSearchTerm("")}
                          className="mt-4 inline-flex h-10 items-center rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white transition-all hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Add / Edit Modal ──────────────────────────────────────────────── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-stretch justify-center bg-slate-900/40 backdrop-blur-xs animate-fade-in md:items-center md:p-4 dark:bg-black/60">
          <div className="absolute inset-0" onClick={handleCloseModal} aria-hidden="true" />
          <div
            className="relative z-10 h-full w-full overflow-y-auto border border-slate-200/50 bg-white p-4 shadow-xl transition-transform duration-300 md:h-auto md:max-h-[90vh] md:max-w-lg md:rounded-2xl md:p-5 dark:border-gray-700 dark:bg-gray-900"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            <button
              onClick={handleCloseModal}
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500/20 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              aria-label="Close dialog"
            >
              <X className="h-5 w-5" />
            </button>
            <ContactForm
              key={selectedContact?.id ?? "new-contact"}
              initialData={selectedContact}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
