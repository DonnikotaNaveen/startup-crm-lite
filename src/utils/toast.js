/**
 * Shared toast notification helpers for consistent styling across all CRM pages.
 * Wraps react-hot-toast with pre-configured dark/light styles.
 */
import toast from "react-hot-toast";

const DARK_STYLE = {
  borderRadius: "12px",
  background: "#0F172A",
  color: "#FFF",
  fontSize: "14px",
  fontWeight: "600",
};

const ERROR_STYLE = {
  borderRadius: "12px",
  background: "#EF4444",
  color: "#FFF",
  fontSize: "14px",
  fontWeight: "600",
};

/** Shows a success toast with the shared dark style. */
export const toastSuccess = (message, icon) =>
  toast.success(message, { style: DARK_STYLE, ...(icon ? { icon } : {}) });

/** Shows an error/destructive toast with the red style. */
export const toastError = (message) =>
  toast.error(message, { style: ERROR_STYLE });

/** Shows a neutral info toast. */
export const toastInfo = (message) =>
  toast(message, { style: DARK_STYLE });
