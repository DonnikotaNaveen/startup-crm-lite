import { Link } from "react-router-dom"; // Import Link component to enable fast routing transition back to home
import { FileQuestion, ArrowLeft } from "lucide-react"; // Import decorative icons to present a 404 state

/**
 * NotFound component renders when the router matches an unregistered route.
 */
export default function NotFound() {
  return (
    // Flexbox viewport wrapper to center the card on screen with fade-in animation
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12 text-center animate-fade-in relative overflow-hidden">
      
      {/* Background radial gradient glow rings for subtle premium depth */}
      {/* Main glassmorphic container card */}
      <div className="max-w-md w-full bg-white border border-slate-200/80 rounded-3xl p-8 shadow-xl shadow-slate-100/40 relative transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800 dark:shadow-none">
        
        {/* Floating circular icon badge */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-rose-500/10 to-amber-500/10 border border-rose-100/50 text-rose-500 mb-6">
          <FileQuestion className="h-8 w-8" />
        </div>

        {/* 404 Status Header */}
        <span className="text-[10px] font-extrabold tracking-widest text-rose-500 uppercase bg-rose-50 px-3 py-1 rounded-full border border-rose-100/40">
          Error 404
        </span>

        {/* Action Title */}
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-4 dark:text-white">CRM Page Not Found</h1>
        
        {/* Explanatory description */}
        <p className="text-sm text-slate-500 font-medium mt-2.5 leading-relaxed dark:text-gray-400">
          The pipeline stage or analytics sheet you are trying to view doesn't exist or has been archived by the administrator.
        </p>

        {/* Dynamic Nav Button linking back to Dashboard */}
        <div className="mt-8">
          <Link 
            to="/" 
            className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold shadow-md shadow-slate-900/10 hover:shadow-lg transition-all duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Dashboard</span>
          </Link>
        </div>

      </div>
      
    </div>
  );
}
