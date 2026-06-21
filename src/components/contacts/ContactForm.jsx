import { useState } from "react";

/**
 * ContactForm component handles adding and editing contact records.
 * Implements form validation rules matching the design system guidelines.
 *
 * @param {{ onSubmit: Function, onCancel: Function, initialData?: Object }} props
 * @returns {JSX.Element}
 */
export default function ContactForm({ onSubmit, onCancel, initialData = null }) {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState({
    name: initialData?.name ?? "",
    company: initialData?.company ?? "",
    email: initialData?.email ?? "",
    phone: initialData?.phone ?? "",
    status: initialData?.status ?? "Active",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const inputBase = "min-h-11 w-full px-3.5 py-2 bg-slate-50 border focus:bg-white rounded-xl text-sm font-medium focus:outline-none transition-all dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:bg-gray-900";
  const inputNormal = "border-slate-200 focus:border-blue-500 dark:border-gray-700 dark:focus:border-blue-500";
  const inputError = "border-rose-500 focus:border-rose-500";

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Title */}
      <h2 id="modal-title" className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3 dark:border-gray-700 dark:text-white">
        {isEditing ? "Edit Contact" : "Add New Contact"}
      </h2>

      {/* Grid wrapper */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {/* Input: Name */}
        <div className="space-y-1">
          <label htmlFor="contact-name" className="text-xs font-bold text-slate-500 uppercase tracking-wide dark:text-gray-400">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className={`${inputBase} ${errors.name ? inputError : inputNormal}`}
          />
          {errors.name && <p className="text-xs font-semibold text-rose-500">{errors.name}</p>}
        </div>

        {/* Input: Company */}
        <div className="space-y-1">
          <label htmlFor="contact-company" className="text-xs font-bold text-slate-500 uppercase tracking-wide dark:text-gray-400">
            Company <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-company"
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Innovate Tech"
            className={`${inputBase} ${errors.company ? inputError : inputNormal}`}
          />
          {errors.company && <p className="text-xs font-semibold text-rose-500">{errors.company}</p>}
        </div>

        {/* Input: Email */}
        <div className="space-y-1">
          <label htmlFor="contact-email" className="text-xs font-bold text-slate-500 uppercase tracking-wide dark:text-gray-400">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="jane@innovate.co"
            className={`${inputBase} ${errors.email ? inputError : inputNormal}`}
          />
          {errors.email && <p className="text-xs font-semibold text-rose-500">{errors.email}</p>}
        </div>

        {/* Input: Phone */}
        <div className="space-y-1">
          <label htmlFor="contact-phone" className="text-xs font-bold text-slate-500 uppercase tracking-wide dark:text-gray-400">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
            className={`${inputBase} ${errors.phone ? inputError : inputNormal}`}
          />
          {errors.phone && <p className="text-xs font-semibold text-rose-500">{errors.phone}</p>}
        </div>

        {/* Selection: Status */}
        <div className="space-y-1 md:col-span-2">
          <label htmlFor="contact-status" className="text-xs font-bold text-slate-500 uppercase tracking-wide dark:text-gray-400">
            Status
          </label>
          <select
            id="contact-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="min-h-11 w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 cursor-pointer focus:outline-none focus:border-blue-500 transition-all dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:focus:bg-gray-900 dark:focus:border-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-gray-700">
        <button
          type="button"
          onClick={onCancel}
          className="min-h-11 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-all focus:outline-none focus:ring-2 focus:ring-slate-500/20 cursor-pointer dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="min-h-11 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer"
        >
          {isEditing ? "Save Changes" : "Create Contact"}
        </button>
      </div>
    </form>
  );
}
