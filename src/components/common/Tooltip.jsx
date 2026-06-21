import { useState, useRef, useId } from "react";

/**
 * Tooltip — lightweight CSS-based hover tooltip wrapper.
 *
 * @param {Object}        props
 * @param {React.ReactNode} props.children - The trigger element.
 * @param {string}        props.label     - Tooltip text content.
 * @param {"top"|"bottom"|"left"|"right"} [props.placement="top"] - Tooltip placement.
 * @param {string}        [props.className] - Extra classes on the wrapper.
 */
export default function Tooltip({ children, label, placement = "top", className = "" }) {
  const [visible, setVisible] = useState(false);
  const id = useId();
  const timerRef = useRef(null);

  const show = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setVisible(true), 120);
  };
  const hide = () => {
    clearTimeout(timerRef.current);
    setVisible(false);
  };

  const placementClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <span
      className={`relative inline-flex ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {/* Clone child with aria-describedby */}
      <span aria-describedby={visible ? id : undefined}>
        {children}
      </span>

      {/* Tooltip bubble */}
      {visible && label && (
        <span
          id={id}
          role="tooltip"
          className={`pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-slate-900 px-2.5 py-1.5 text-xs font-semibold text-white shadow-lg dark:bg-gray-700 ${placementClasses[placement]}`}
        >
          {label}
        </span>
      )}
    </span>
  );
}
