import React from "react";

/**
 * Reusable Avatar component that displays initials computed from a given name.
 * Uses React.memo to prevent unnecessary re-renders.
 */
const Avatar = React.memo(({ name = "User", className = "" }) => {
  const initials = name
    ? name
        .trim()
        .split(/\s+/)
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "US";

  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50 font-bold text-xs text-blue-600 dark:text-blue-400 border border-blue-100/30 dark:border-blue-900/40 ${className}`}
    >
      {initials}
    </div>
  );
});

Avatar.displayName = "Avatar";

export default Avatar;
