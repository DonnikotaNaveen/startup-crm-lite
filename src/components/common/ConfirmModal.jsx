import { useEffect, useRef } from "react";
import { AlertTriangle, X } from "lucide-react";

/**
 * ConfirmModal — reusable confirmation dialog for destructive actions.
 *
 * @param {Object}   props
 * @param {boolean}  props.isOpen       - Controls visibility.
 * @param {string}   props.title        - Modal heading text.
 * @param {string}   props.message      - Supporting message body.
 * @param {string}   [props.confirmLabel="Delete"] - Text on the confirm button.
 * @param {Function} props.onConfirm    - Called when the user confirms.
 * @param {Function} props.onCancel     - Called when the user cancels.
 * @param {boolean}  [props.isDestructive=true] - Use red styling for confirm button.
 */
export default function ConfirmModal({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmLabel = "Delete",
  onConfirm,
  onCancel,
  isDestructive = true,
}) {
  const cancelRef = useRef(null);

  // Auto-focus cancel button for safety; close on Escape
  useEffect(() => {
    if (!isOpen) return;
    cancelRef.current?.focus();
    const handleKey = (e) => { if (e.key === "Escape") onCancel(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-fade-in p-4 dark:bg-black/60"
      aria-modal="true"
      role="dialog"
      aria-labelledby="confirm-modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onCancel} aria-hidden="true" />

      {/* Dialog card */}
      <div className="relative z-10 w-full max-w-sm rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900">
        {/* Close button */}
        <button
          onClick={onCancel}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500/20 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-200"
          aria-label="Close dialog"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon */}
        <div className={`flex h-12 w-12 items-center justify-center rounded-xl mb-4 ${isDestructive ? "bg-rose-50 dark:bg-rose-950/40" : "bg-blue-50 dark:bg-blue-950/40"}`}>
          <AlertTriangle className={`h-6 w-6 ${isDestructive ? "text-rose-500" : "text-blue-500"}`} />
        </div>

        {/* Text */}
        <h2
          id="confirm-modal-title"
          className="text-base font-bold text-slate-900 dark:text-gray-100 mb-1.5"
        >
          {title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-gray-400 leading-relaxed mb-6">
          {message}
        </p>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            ref={cancelRef}
            onClick={onCancel}
            className="flex h-10 items-center rounded-xl border border-slate-200/80 bg-white px-4 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex h-10 items-center rounded-xl px-4 text-sm font-bold text-white transition-all focus:outline-none focus:ring-2 ${
              isDestructive
                ? "bg-rose-600 hover:bg-rose-700 shadow-md shadow-rose-500/20 focus:ring-rose-500/20"
                : "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 focus:ring-blue-500/20"
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
