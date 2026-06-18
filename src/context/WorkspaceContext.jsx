/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const WorkspaceContext = createContext(undefined);

const DEFAULT_PROFILE = {
  name: "Donnikota Naveen",
  email: "admin@crmlite.io",
  role: "Senior Administrator",
};

const DEFAULT_PREFERENCES = {
  emailNotifications: true,
  weeklyDigest: false,
  mfaEnabled: true,
  pipelineAlerts: true,
};

/**
 * WorkspaceProvider wraps the application hierarchy to make workspace preferences
 * and admin profile configurations accessible across components.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
export const WorkspaceProvider = ({ children }) => {
  const [profile, setProfile] = useLocalStorage("startup-crm-lite-profile", DEFAULT_PROFILE);
  const [preferences, setPreferences] = useLocalStorage("startup-crm-lite-preferences", DEFAULT_PREFERENCES);

  const value = useMemo(() => ({
    profile,
    setProfile,
    preferences,
    setPreferences,
  }), [profile, setProfile, preferences, setPreferences]);

  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
};

/**
 * Custom hook to consume the Workspace context.
 *
 * @returns {{ profile: typeof DEFAULT_PROFILE, setProfile: Function, preferences: typeof DEFAULT_PREFERENCES, setPreferences: Function }}
 */
export const useWorkspace = () => {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
};
