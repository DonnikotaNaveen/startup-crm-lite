import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LeadProvider } from './context/LeadContext'
import { ThemeProvider } from './context/ThemeContext'
import { WorkspaceProvider } from './context/WorkspaceContext'
import { ContactProvider } from './context/ContactContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LeadProvider>
      <ThemeProvider>
        <WorkspaceProvider>
          <ContactProvider>
            <App />
          </ContactProvider>
        </WorkspaceProvider>
      </ThemeProvider>
    </LeadProvider>
  </StrictMode>,
)
