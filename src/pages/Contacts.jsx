import React, { useState, useMemo } from "react";
import { Search, Plus, Mail, Phone, Building } from "lucide-react";

const initialContacts = [
  { id: 1, name: "Alice Vance", company: "CyberSpace Tech", email: "alice@cyberspace.io", phone: "+1 (555) 019-2834", status: "Active" },
  { id: 2, name: "David Miller", company: "Alpha Systems", email: "david@alphasys.com", phone: "+1 (555) 014-9382", status: "Active" },
  { id: 3, name: "Emma Watson", company: "DevLink Solutions", email: "emma@devlink.co", phone: "+1 (555) 017-4729", status: "Active" },
  { id: 4, name: "Frank Wright", company: "Global Corp", email: "frank@globalcorp.net", phone: "+1 (555) 012-3849", status: "Inactive" },
  { id: 5, name: "Grace Hopper", company: "Quantum Labs", email: "grace@quantum.edu", phone: "+1 (555) 015-8392", status: "Active" },
  { id: 6, name: "Irene Adler", company: "Bohemia Media", email: "irene@bohemiamedia.cz", phone: "+1 (555) 019-2043", status: "Active" },
  { id: 7, name: "John Smith", company: "TechNova", email: "john@technova.io", phone: "+1 (555) 011-3829", status: "Inactive" },
];

export default function Contacts() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredContacts = useMemo(() => {
    return initialContacts.filter((c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <span>CRM Database</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1 dark:text-white">Contacts Directory</h1>
          <p className="text-sm text-slate-500 font-medium mt-1 dark:text-gray-400">Manage and sync client contacts across active startup accounts.</p>
        </div>
        <button className="flex items-center justify-center gap-1.5 px-4.5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 hover:shadow-lg transition-all duration-200 self-start sm:self-auto">
          <Plus className="h-4 w-4" /> Add Contact
        </button>
      </div>

      <div className="flex gap-4 bg-white p-4 border border-slate-200/80 rounded-2xl shadow-xs dark:border-gray-700 dark:bg-gray-800">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400 dark:text-gray-500" />
          <input
            type="text"
            placeholder="Search contacts by name, company, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 focus:bg-white border border-slate-200/60 focus:border-blue-500 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:bg-gray-950"
          />
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden dark:border-gray-700 dark:bg-gray-800">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-slate-50/75 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider dark:border-gray-700 dark:bg-gray-900/80 dark:text-gray-400">
                <th className="px-6 py-4">Contact Detail</th>
                <th className="px-6 py-4">Company</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-gray-700">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-slate-50/50 transition-colors dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 font-bold text-sm text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
                          {contact.name.split(" ").map(w => w[0]).join("")}
                        </div>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{contact.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-500 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Building className="h-4 w-4 text-slate-400 dark:text-gray-500" />
                        <span>{contact.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-gray-300">
                      <div className="flex items-center gap-1.5">
                        <Mail className="h-4 w-4 text-slate-400 dark:text-gray-500" />
                        <span>{contact.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-gray-300">
                      <div className="flex items-center gap-1.5">
                        <Phone className="h-4 w-4 text-slate-400 dark:text-gray-500" />
                        <span>{contact.phone}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
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
    </div>
  );
}
