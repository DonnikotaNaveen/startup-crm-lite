/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * @typedef {Object} Lead
 * @property {string} id
 * @property {string} name
 * @property {string} company
 * @property {string} email
 * @property {string} phone
 * @property {'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost'} status
 * @property {number} value
 * @property {'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Other'} source
 * @property {string} createdAt ISO date string
 */

const LEADS_STORAGE_KEY = 'startup-crm-lite-leads';

export const LeadContext = createContext(undefined);

/**
 * Safely reads saved leads from localStorage.
 * @returns {Lead[]} The saved leads array, or an empty array when no valid data exists.
 */
const getInitialLeads = () => {
  try {
    const savedLeads = localStorage.getItem(LEADS_STORAGE_KEY);
    return savedLeads ? JSON.parse(savedLeads) : [];
  } catch (error) {
    console.error('Failed to load leads from localStorage:', error);
    return [];
  }
};

/**
 * Creates a unique lead identifier.
 * @returns {string} A unique ID for a lead.
 */
const createLeadId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  return String(Date.now());
};

/**
 * Provides lead state and lead management actions to child components.
 * @param {{ children: React.ReactNode }} props Provider props.
 * @returns {JSX.Element} Lead context provider.
 */
export const LeadProvider = ({ children }) => {
  const [leads, setLeads] = useState(getInitialLeads);

  useEffect(() => {
    try {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    } catch (error) {
      console.error('Failed to save leads to localStorage:', error);
    }
  }, [leads]);

  /**
   * Adds a new lead with an ID and creation timestamp.
   * @param {Omit<Lead, 'id' | 'createdAt'>} lead Lead data entered by the user.
   * @returns {Lead} The created lead.
   */
  const addLead = (lead) => {
    const newLead = {
      ...lead,
      id: createLeadId(),
      createdAt: new Date().toISOString(),
    };

    setLeads((currentLeads) => [...currentLeads, newLead]);
    return newLead;
  };

  /**
   * Updates an existing lead by ID.
   * @param {string} id ID of the lead to update.
   * @param {Partial<Omit<Lead, 'id' | 'createdAt'>>} updatedLead Fields to update.
   * @returns {void}
   */
  const updateLead = (id, updatedLead) => {
    setLeads((currentLeads) =>
      currentLeads.map((lead) => (lead.id === id ? { ...lead, ...updatedLead } : lead)),
    );
  };

  /**
   * Deletes a lead by ID.
   * @param {string} id ID of the lead to delete.
   * @returns {void}
   */
  const deleteLead = (id) => {
    setLeads((currentLeads) => currentLeads.filter((lead) => lead.id !== id));
  };

  /**
   * Finds one lead by ID.
   * @param {string} id ID of the lead to retrieve.
   * @returns {Lead | undefined} The matching lead when found.
   */
  const getLeadById = useCallback((id) => leads.find((lead) => lead.id === id), [leads]);

  const value = useMemo(
    () => ({
      leads,
      addLead,
      updateLead,
      deleteLead,
      getLeadById,
    }),
    [leads, getLeadById],
  );

  return <LeadContext.Provider value={value}>{children}</LeadContext.Provider>;
};

/**
 * Reads the lead context for the current component.
 * @returns {{ leads: Lead[], addLead: Function, updateLead: Function, deleteLead: Function, getLeadById: Function }} Lead context value.
 * @throws {Error} When used outside LeadProvider.
 */
export const useLeads = () => {
  const context = useContext(LeadContext);

  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadProvider.');
  }

  return context;
};
