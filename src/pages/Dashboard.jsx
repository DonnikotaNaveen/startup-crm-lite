import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { 
  Users, 
  UserCheck, 
  Percent, 
  DollarSign, 
  Calendar, 
  Menu,
  Sparkles
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import StatsCard from "../components/dashboard/StatsCard";
import PipelineOverview from "../components/dashboard/PipelineOverview";
import RecentLeads from "../components/dashboard/RecentLeads";
import QuickActions from "../components/dashboard/QuickActions";
import { useLeads } from "../context/LeadContext";

// Potential mock prospects for the "Add Lead" quick action trigger
const mockProspectPool = [
  { name: "Sarah Connor", company: "Skynet Systems", value: 45000, status: "New" },
  { name: "Bruce Wayne", company: "Wayne Enterprises", value: 85000, status: "Qualified" },
  { name: "Clark Kent", company: "Daily Planet", value: 12000, status: "Contacted" },
  { name: "Tony Stark", company: "Stark Industries", value: 95000, status: "Qualified" },
  { name: "Peter Parker", company: "Daily Bugle", value: 3500, status: "New" },
  { name: "Diana Prince", company: "Themyscira Exports", value: 28000, status: "Contacted" },
  { name: "Barry Allen", company: "Central City Lab", value: 7500, status: "Lost" },
];

/**
 * Dashboard Page component representing the administrative CRM control center.
 *
 * @component
 * @returns {React.ReactElement} The Dashboard page.
 */
export default function Dashboard() {
  const navigate = useNavigate();
  const { leads, addLead } = useLeads();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Compute stats metrics dynamically based on current CRM lead state
  const stats = useMemo(() => {
    const totalLeads = leads.length;
    // Context status mappings: "Meeting Scheduled", "Proposal Sent", and "Won" qualify as high-value leads
    const qualifiedLeads = leads.filter((l) => ["Meeting Scheduled", "Proposal Sent", "Won"].includes(l.status)).length;
    
    // Conversion rate defined as percentage of qualified leads out of total leads
    const conversionRate = totalLeads > 0 
      ? ((qualifiedLeads / totalLeads) * 100).toFixed(1) + "%" 
      : "0.0%";

    // Revenue Potential calculated as total deal values of Qualified prospects
    const totalRevenuePotential = leads
      .filter((l) => ["Meeting Scheduled", "Proposal Sent", "Won"].includes(l.status))
      .reduce((sum, current) => sum + (current.value || 5000), 0);

    return {
      totalLeads,
      qualifiedLeads,
      conversionRate,
      revenuePotential: "$" + totalRevenuePotential.toLocaleString(),
    };
  }, [leads]);

  // Formats current calendar date to display in the header widget
  const formattedDate = useMemo(() => {
    return new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  /**
   * Action Handler: Register a new prospect randomly selected from the seed pool.
   */
  const handleAddLead = () => {
    const randomProspect = mockProspectPool[Math.floor(Math.random() * mockProspectPool.length)];
    
    // Map status 'Qualified' to 'Proposal Sent' to match LeadContext constraints
    const mappedStatus = randomProspect.status === "Qualified" ? "Proposal Sent" : randomProspect.status;
    
    // Generate mock details for the new prospect
    const email = `${randomProspect.name.toLowerCase().replace(/\s+/g, ".")}@${randomProspect.company.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`;
    const phone = `+1 (555) 01${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`;
    const source = ["Website", "Referral", "LinkedIn", "Cold Call"][Math.floor(Math.random() * 4)];

    addLead({
      name: randomProspect.name,
      company: randomProspect.company,
      email,
      phone,
      status: mappedStatus,
      source,
      value: randomProspect.value
    });

    toast.success(`Prospect "${randomProspect.name}" added to ${randomProspect.company}!`, {
      style: {
        borderRadius: "12px",
        background: "#0F172A",
        color: "#FFF",
        fontSize: "14px",
        fontWeight: "600",
      },
    });
  };

  /**
   * Action Handler: Redirects view layout to leads management dashboard.
   */
  const handleViewLeads = () => {
    navigate("/leads");
  };

  /**
   * Action Handler: Mock data exporter. Generates a mock download action of CRM records.
   */
  const handleExportData = () => {
    // Generate CSV contents
    const headers = ["ID", "Name", "Company", "Value ($)", "Status", "Date Added"];
    const rows = leads.map((l) => [l.id, l.name, l.company, l.value, l.status, l.createdAt]);
    const csvContent = 
      "data:text/csv;charset=utf-8," + 
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `startup_crm_leads_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success("CSV file downloaded successfully!", {
      icon: "💾",
      style: {
        borderRadius: "12px",
        background: "#0F172A",
        color: "#FFF",
        fontSize: "14px",
        fontWeight: "600",
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] transition-colors duration-200 dark:bg-gray-950">
      {/* Toast Notification Container */}
      <Toaster position="top-right" />

      {/* Main Sidebar Navigation Layout */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content Area shifted left on desktop screen widths */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64 transition-all duration-300">
        
        {/* Mobile Header Bar */}
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/90 backdrop-blur-md px-6 shadow-xs lg:hidden dark:border-gray-700 dark:bg-gray-900/90">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-expanded={sidebarOpen}
              aria-controls="main-sidebar"
              aria-label="Open navigation sidebar"
            >
              <Menu className="h-5.5 w-5.5" />
            </button>
            <span className="text-base font-extrabold text-slate-900 tracking-tight dark:text-white">
              Startup CRM Lite
            </span>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200">
            DN
          </div>
        </header>

        {/* Dashboard Views Container */}
        <main className="flex-1 p-6 md:p-8 space-y-8 animate-fade-in max-w-7xl w-full mx-auto">
          
          {/* Header Panel */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                
                <span></span>
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1 dark:text-white">
                Welcome Back, Naveen
              </h1>
              <p className="text-sm font-semibold text-slate-400 mt-1 dark:text-gray-400">
                Here is a quick overview of your sales performance for this period.
              </p>
            </div>

            {/* Date Widget */}
            <div className="flex items-center gap-2.5 px-4.5 py-2.5 bg-white border border-slate-200/80 rounded-xl shadow-xs self-start md:self-auto dark:border-gray-700 dark:bg-gray-800">
              <Calendar className="h-4.5 w-4.5 text-slate-400" />
              <span className="text-xs font-extrabold text-slate-600 dark:text-gray-300">{formattedDate}</span>
            </div>
          </div>

          {/* Stats Cards Dashboard Section */}
          <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title="Total Leads"
              value={stats.totalLeads}
              icon={Users}
              change="+15.2%"
              color="blue"
            />
            <StatsCard
              title="Qualified Leads"
              value={stats.qualifiedLeads}
              icon={UserCheck}
              change="+8.3%"
              color="green"
            />
            <StatsCard
              title="Conversion Rate"
              value={stats.conversionRate}
              icon={Percent}
              change="+2.4%"
              color="yellow"
            />
            <StatsCard
              title="Revenue Potential"
              value={stats.revenuePotential}
              icon={DollarSign}
              change="+18.4%"
              color="indigo"
            />
          </section>

          {/* Secondary Layout Section: Pipeline breakdown and Quick Actions */}
          <section className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <PipelineOverview leads={leads} />
            </div>
            <div>
              <QuickActions 
                onAddLead={handleAddLead}
                onViewLeads={handleViewLeads}
                onExportData={handleExportData}
              />
            </div>
          </section>

          {/* Recent Leads Table list */}
          <section>
            <RecentLeads leads={leads} />
          </section>

        </main>
      </div>
    </div>
  );
}
