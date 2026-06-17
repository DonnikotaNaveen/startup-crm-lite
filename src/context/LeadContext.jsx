/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from "react";

/**
 * TypeScript-style shape of the lead object:
 *
 * interface Lead {
 *   id: string;
 *   name: string;
 *   company: string;
 *   email: string;
 *   phone: string;
 *   status: 'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost';
 *   source: 'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Other';
 *   createdAt: string; // ISO date string
 * }
 */

/**
 * @typedef {Object} Lead
 * @property {string} id - Unique identifier.
 * @property {string} name - Contact person name.
 * @property {string} company - Company representing the prospect.
 * @property {string} email - Contact email address.
 * @property {string} phone - Contact phone number.
 * @property {'New' | 'Contacted' | 'Meeting Scheduled' | 'Proposal Sent' | 'Won' | 'Lost'} status - Pipeline stage.
 * @property {'Website' | 'Referral' | 'LinkedIn' | 'Cold Call' | 'Email Campaign' | 'Other'} source - Acquisition source.
 * @property {string} createdAt - Creation timestamp in ISO date format.
 */

/** localStorage key used to persist the leads collection. */
const STORAGE_KEY = "startup-crm-leads";

/** Seed data used when localStorage is empty or unavailable. */
const defaultLeads = [
  { id: "1", name: "Alice Vance", company: "CyberSpace Tech", email: "alice@cyberspace.io", phone: "+1 (555) 019-2834", status: "Won", source: "Website", createdAt: "2026-06-15T12:00:00.000Z" },
  { id: "2", name: "David Miller", company: "Alpha Systems", email: "david@alphasys.com", phone: "+1 (555) 014-9382", status: "Contacted", source: "Cold Call", createdAt: "2026-06-14T12:00:00.000Z" },
  { id: "3", name: "Emma Watson", company: "DevLink Solutions", email: "emma@devlink.co", phone: "+1 (555) 017-4729", status: "Won", source: "Referral", createdAt: "2026-06-13T12:00:00.000Z" },
  { id: "4", name: "Frank Wright", company: "Global Corp", email: "frank@globalcorp.net", phone: "+1 (555) 012-3849", status: "Proposal Sent", source: "LinkedIn", createdAt: "2026-06-12T12:00:00.000Z" },
  { id: "5", name: "Grace Hopper", company: "Quantum Labs", email: "grace@quantum.edu", phone: "+1 (555) 015-8392", status: "New", source: "Email Campaign", createdAt: "2026-06-11T12:00:00.000Z" },
  { id: "6", name: "Henry Jekyll", company: "Hydra Labs", email: "henry@hydralabs.org", phone: "+1 (555) 018-9382", status: "Lost", source: "Other", createdAt: "2026-06-10T12:00:00.000Z" },
  { id: "7", name: "Irene Adler", company: "Bohemia Media", email: "irene@bohemiamedia.cz", phone: "+1 (555) 019-2043", status: "Meeting Scheduled", source: "Referral", createdAt: "2026-06-09T12:00:00.000Z" },
];

export const LeadContext = createContext(null);

/**
 * Generates a unique identifier for a new lead.
 *
 * @returns {string} A UUID string, or a timestamp-based fallback.
 */
function generateLeadId() {
  return crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
}

/**
 * Loads leads from localStorage, falling back to seed data on error or invalid data.
 *
 * @returns {Lead[]} The initial leads array.
 */
function loadLeadsFromStorage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return defaultLeads;
    }

    const parsed = JSON.parse(stored);
    if (!Array.isArray(parsed)) {
      console.warn("Invalid leads data in localStorage; using defaults.");
      return defaultLeads;
    }

    return parsed;
  } catch (error) {
    console.error("Failed to retrieve leads from localStorage:", error);
    return defaultLeads;
  }
}

/**
 * LeadProvider component wraps the application and provides the global leads state.
 *
 * @param {Object} props - React props.
 * @param {React.ReactNode} props.children - Child components to render.
 * @returns {React.ReactElement} The LeadContext.Provider element.
 */
export function LeadProvider({ children }) {
  const [leads, setLeads] = useState(loadLeadsFromStorage);

  /**
   * Persists the leads array to localStorage whenever it changes.
   *
   * @returns {void}
   */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (error) {
      console.error("Failed to sync leads state to localStorage:", error);
    }
  }, [leads]);

  /**
   * Add a new lead to the CRM database.
   * Generates a unique string ID and adds a creation timestamp.
   *
   * @param {Omit<Lead, 'id' | 'createdAt'>} leadData - Lead details to create.
   * @returns {void}
   */
  const addLead = (leadData) => {
    const newLead = {
      ...leadData,
      id: generateLeadId(),
      createdAt: new Date().toISOString(),
    };
    setLeads((prevLeads) => [newLead, ...prevLeads]);
  };

  /**
   * Update details of an existing lead in the CRM database.
   *
   * @param {Partial<Lead> & Pick<Lead, 'id'>} updatedLead - Lead fields to update (must include id).
   * @returns {void}
   * @throws {Error} If the lead id is missing or the lead is not found.
   */
  const updateLead = (updatedLead) => {
    if (!updatedLead?.id) {
      throw new Error("updateLead requires a lead object with a valid id");
    }

    setLeads((prevLeads) => {
      const exists = prevLeads.some((lead) => lead.id === updatedLead.id);
      if (!exists) {
        throw new Error(`updateLead: no lead found with id "${updatedLead.id}"`);
      }

      return prevLeads.map((lead) =>
        lead.id === updatedLead.id ? { ...lead, ...updatedLead } : lead
      );
    });
  };

  /**
   * Delete a lead from the CRM database by identifier.
   *
   * @param {string} id - Unique identifier of the lead to remove.
   * @returns {void}
   */
  const deleteLead = (id) => {
    setLeads((prevLeads) => prevLeads.filter((lead) => lead.id !== id));
  };

  /**
   * Search for a lead by its unique identifier.
   *
   * @param {string} id - Unique identifier of the lead.
   * @returns {Lead | undefined} The matching lead object if found.
   */
  const getLeadById = (id) => {
    return leads.find((lead) => lead.id === id);
  };

  return (
    <LeadContext.Provider value={{ leads, addLead, updateLead, deleteLead, getLeadById }}>
      {children}
    </LeadContext.Provider>
  );
}

/**
 * Custom hook to access leads context state and CRUD actions.
 * Throws an error if invoked outside of a LeadProvider context.
 *
 * @returns {{ leads: Lead[], addLead: Function, updateLead: Function, deleteLead: Function, getLeadById: Function }}
 * @throws {Error} If hook is used outside LeadProvider.
 */
export function useLeads() {
  const context = useContext(LeadContext);
  if (!context) {
    throw new Error("useLeads must be used within a LeadProvider");
  }
  return context;
}
