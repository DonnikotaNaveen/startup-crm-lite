import React, { useState, useEffect } from "react";

/**
 * @typedef {Object} LeadData
 * @property {number|string} [id] - Lead identifier (only exists in Edit mode).
 * @property {string} name - Contact person name.
 * @property {string} company - Company representing the prospect.
 * @property {string} email - Contact email.
 * @property {string} phone - Contact phone number.
 * @property {string} status - Pipeline status.
 * @property {string} source - Acquisition source.
 */

/**
 * @typedef {Object} LeadFormProps
 * @property {LeadData} [initialData] - Baseline lead data if configuring the form for Edit mode.
 * @property {function(LeadData):void} onSubmit - Handler triggered when a valid form is submitted.
 * @property {function():void} onCancel - Handler triggered when user cancels editing.
 */

const STATUS_OPTIONS = ["New", "Contacted", "Meeting Scheduled", "Proposal Sent", "Won", "Lost"];
const SOURCE_OPTIONS = ["Website", "Referral", "LinkedIn", "Cold Call", "Email Campaign", "Other"];

/**
 * LeadForm component handles the CRUD form interface for creating or editing leads.
 * Implements validation rules for required inputs and matches visual theme cues.
 *
 * @component
 * @param {LeadFormProps} props - Component properties.
 * @returns {React.ReactElement} The LeadForm component.
 */
export default function LeadForm({ initialData, onSubmit, onCancel }) {
  const isEditMode = !!initialData;

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    status: "New",
    source: "Website",
  });

  const [errors, setErrors] = useState({});

  // Sync form inputs when initialData loads or updates
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        company: initialData.company || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        status: initialData.status || "New",
        source: initialData.source || "Website",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error message when user begins typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const tempErrors = {};
    if (!formData.name.trim()) {
      tempErrors.name = "Full Name is required.";
    }
    if (!formData.company.trim()) {
      tempErrors.company = "Company is required.";
    }
    if (!formData.email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Please enter a valid email address.";
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        id: initialData?.id, // Keep original ID if in Edit mode
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Title */}
      <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
        {isEditMode ? "Modify Lead Details" : "Register New Prospect"}
      </h2>

      {/* Grid wrapper */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Input: Name */}
        <div className="space-y-1">
          <label htmlFor="lead-name" className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="lead-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`w-full px-3.5 py-2 bg-slate-50 border focus:bg-white rounded-xl text-sm font-medium focus:outline-none transition-all ${
              errors.name 
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20" 
                : "border-slate-200 focus:border-blue-500"
            }`}
          />
          {errors.name && <p className="text-xs font-semibold text-rose-500">{errors.name}</p>}
        </div>

        {/* Input: Company */}
        <div className="space-y-1">
          <label htmlFor="lead-company" className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            Company <span className="text-rose-500">*</span>
          </label>
          <input
            id="lead-company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Acme Corp"
            className={`w-full px-3.5 py-2 bg-slate-50 border focus:bg-white rounded-xl text-sm font-medium focus:outline-none transition-all ${
              errors.company 
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20" 
                : "border-slate-200 focus:border-blue-500"
            }`}
          />
          {errors.company && <p className="text-xs font-semibold text-rose-500">{errors.company}</p>}
        </div>

        {/* Input: Email */}
        <div className="space-y-1">
          <label htmlFor="lead-email" className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            id="lead-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={`w-full px-3.5 py-2 bg-slate-50 border focus:bg-white rounded-xl text-sm font-medium focus:outline-none transition-all ${
              errors.email 
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20" 
                : "border-slate-200 focus:border-blue-500"
            }`}
          />
          {errors.email && <p className="text-xs font-semibold text-rose-500">{errors.email}</p>}
        </div>

        {/* Input: Phone */}
        <div className="space-y-1">
          <label htmlFor="lead-phone" className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            Phone Number
          </label>
          <input
            id="lead-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 rounded-xl text-sm font-medium focus:outline-none transition-all"
          />
        </div>

        {/* Selection: Status */}
        <div className="space-y-1">
          <label htmlFor="lead-status" className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            Pipeline Stage
          </label>
          <select
            id="lead-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 cursor-pointer focus:outline-none focus:border-blue-500 transition-all"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Selection: Source */}
        <div className="space-y-1">
          <label htmlFor="lead-source" className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            Acquisition Source
          </label>
          <select
            id="lead-source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 cursor-pointer focus:outline-none focus:border-blue-500 transition-all"
          >
            {SOURCE_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onCancel}
          className="px-4.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-slate-500/20 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
        >
          {isEditMode ? "Save Changes" : "Create Lead"}
        </button>
      </div>
    </form>
  );
}
