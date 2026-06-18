import { useMemo, useState, useEffect, useCallback } from "react";
import { Plus, Mail, Phone, Building, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import { useContacts } from "../context/ContactContext";
import ContactForm from "../components/contacts/ContactForm";
import SearchBar from "../components/common/SearchBar";
import Avatar from "../components/common/Avatar";

/**
 * Contacts directory view maps the people list and handles contact creation modal.
 *
 * @returns {JSX.Element}
 */
export default function Contacts() {
  const { contacts, addContact } = useContacts();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenAddModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleFormSubmit = useCallback((formData) => {
    addContact(formData);
    toast.success(`Contact "${formData.name}" has been added.`, {
      style: {
        borderRadius: "12px",
        background: "#0F172A",
        color: "#FFF",
        fontSize: "14px",
        fontWeight: "600",
      },
    });
    setIsModalOpen(false);
  }, [addContact]);

  // Accessibility: Close modal on Esc press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isModalOpen) {
        handleCloseModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, handleCloseModal]);

  const filteredContacts = useMemo(() => {
    return contacts.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [contacts, searchTerm]);

  return (
    <div className="space-y-6 animate-fade-in">
      <Toaster position="top-right" />

      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <span>CRM Database</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1 dark:text-white">Contacts Directory</h1>
          <p className="text-sm text-slate-500 font-medium mt-1 dark:text-gray-400">Manage and sync client contacts across active startup accounts.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex min-h-11 items-center justify-center gap-1.5 self-start rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-500/10 transition-all duration-200 hover:bg-blue-700 hover:shadow-lg sm:self-auto cursor-pointer"
        >
          <Plus className="h-4 w-4" /> Add Contact
        </button>
      </div>

      {/* Search Input using reusable SearchBar */}
      <div className="flex gap-4 bg-white p-4 border border-slate-200/80 rounded-2xl shadow-xs dark:border-gray-700 dark:bg-gray-800">
        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search contacts by name, company, or email..."
          ariaLabel="Search contacts"
        />
      </div>

      {/* Table grid listing */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-gray-700 dark:bg-gray-800">
        <div className="w-full max-w-full overflow-hidden">
          <table className="w-full table-fixed border-collapse text-left text-sm">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-400">
                <th scope="col" className="w-[34%] px-3 py-3">Contact Detail</th>
                <th scope="col" className="hidden w-[20%] px-3 py-3 lg:table-cell">Company</th>
                <th scope="col" className="w-[42%] px-3 py-3 lg:w-[24%]">Email</th>
                <th scope="col" className="hidden w-[16%] px-3 py-3 md:table-cell">Phone</th>
                <th scope="col" className="w-[24%] px-3 py-3 lg:w-[6%]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-slate-50/50 transition-colors dark:hover:bg-gray-700/50">
                    <td className="px-3 py-3 align-middle">
                      <div className="flex items-center gap-3">
                        <Avatar name={contact.name} className="h-10 w-10 text-sm font-bold" />
                        <span className="min-w-0 break-words text-sm font-bold text-slate-900 dark:text-white">{contact.name}</span>
                      </div>
                    </td>
                    <td className="hidden px-3 py-3 align-middle text-sm font-semibold text-slate-500 lg:table-cell dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Building className="h-4 w-4 text-slate-400 dark:text-gray-500" />
                        <span className="break-words">{contact.company}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 align-middle text-sm text-slate-600 dark:text-gray-300">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-4 w-4 text-slate-400 dark:text-gray-500" />
                        <span className="min-w-0 break-words">{contact.email}</span>
                      </div>
                    </td>
                    <td className="hidden px-3 py-3 align-middle text-sm text-slate-600 md:table-cell dark:text-gray-300">
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-4 w-4 text-slate-400 dark:text-gray-500" />
                        <span>{contact.phone}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 align-middle">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        contact.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900"
                          : "bg-slate-50 text-slate-700 border-slate-100 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                      }`}>
                        {contact.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm font-semibold text-slate-400 dark:text-gray-500">
                    No contacts matched your search query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Contact Modal Dialog */}
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
              onSubmit={handleFormSubmit}
              onCancel={handleCloseModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}
