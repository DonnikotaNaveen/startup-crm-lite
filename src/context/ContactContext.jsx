/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useCallback } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ContactContext = createContext(undefined);

const INITIAL_CONTACTS = [
  { id: 1, name: "Alice Vance", company: "CyberSpace Tech", email: "alice@cyberspace.io", phone: "+1 (555) 019-2834", status: "Active" },
  { id: 2, name: "David Miller", company: "Alpha Systems", email: "david@alphasys.com", phone: "+1 (555) 014-9382", status: "Active" },
  { id: 3, name: "Emma Watson", company: "DevLink Solutions", email: "emma@devlink.co", phone: "+1 (555) 017-4729", status: "Active" },
  { id: 4, name: "Frank Wright", company: "Global Corp", email: "frank@globalcorp.net", phone: "+1 (555) 012-3849", status: "Inactive" },
  { id: 5, name: "Grace Hopper", company: "Quantum Labs", email: "grace@quantum.edu", phone: "+1 (555) 015-8392", status: "Active" },
  { id: 6, name: "Irene Adler", company: "Bohemia Media", email: "irene@bohemiamedia.cz", phone: "+1 (555) 019-2043", status: "Active" },
  { id: 7, name: "John Smith", company: "TechNova", email: "john@technova.io", phone: "+1 (555) 011-3829", status: "Inactive" },
];

/**
 * ContactProvider manages contacts state list and registration functions.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
export const ContactProvider = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage("startup-crm-lite-contacts", INITIAL_CONTACTS);

  const addContact = useCallback((contact) => {
    const newContact = {
      ...contact,
      id: Date.now(),
      status: contact.status || "Active",
    };
    setContacts((prev) => [...prev, newContact]);
    return newContact;
  }, [setContacts]);

  const value = useMemo(() => ({ contacts, addContact }), [contacts, addContact]);

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
};

/**
 * Custom hook to consume the Contacts context.
 *
 * @returns {{ contacts: typeof INITIAL_CONTACTS, addContact: Function }}
 */
export const useContacts = () => {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactProvider");
  }
  return context;
};
