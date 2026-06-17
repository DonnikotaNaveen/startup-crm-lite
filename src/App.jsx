import React from "react"; // Import React core library
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter component to handle browser-side routing history
import AppRoutes from "./routes"; // Import the routes mapping index containing all of the route definitions

/**
 * Root App component initialization.
 * Configures the router history provider across all subcomponents.
 */
function App() {
  return (
    // Wrap application routing inside BrowserRouter to capture browser address bar history changes
    <BrowserRouter>
      {/* Render the core routing hierarchy of CRM views */}
      <AppRoutes />
    </BrowserRouter>
  );
}

// Export the App component as default for main.jsx mounting
export default App;
