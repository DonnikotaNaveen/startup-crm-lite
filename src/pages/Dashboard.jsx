import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { 
  Users, 
  UserCheck, 
  Percent, 
  DollarSign, 
  Calendar
} from "lucide-react";

import StatsCard from "../components/dashboard/StatsCard";
import PipelineOverview from "../components/dashboard/PipelineOverview";
import RecentLeads from "../components/dashboard/RecentLeads";
import QuickActions from "../components/dashboard/QuickActions";
import { useLeads } from "../context/LeadContext";
import { toastSuccess } from "../utils/toast";
import { calculateConversionRate } from "../utils/analyticsHelpers";

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

  // Compute stats metrics dynamically based on current CRM lead state
  const stats = useMemo(() => {
    const totalLeads = leads.length;
    // Context status mappings: "Meeting Scheduled", "Proposal Sent", and "Won" qualify as high-value leads
    const qualifiedLeads = leads.filter((l) => ["Meeting Scheduled", "Proposal Sent", "Won"].includes(l.status)).length;
    
    // Conversion rate defined as percentage of Won leads out of total leads, matching the Analytics page formula
    const conversionRate = calculateConversionRate(leads).toFixed(1) + "%";

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

    toastSuccess(`Prospect "${randomProspect.name}" added to ${randomProspect.company}!`);
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

    toastSuccess("CSV file downloaded successfully!", "💾");
  };

  return (
    <div className="space-y-6 animate-fade-in md:space-y-8">
      {/* Toast Notification Container */}
      <Toaster position="top-right" />

      {/* Header Panel */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <span></span>
          </div>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Welcome Back, Naveen
          </h1>
          <p className="text-sm font-semibold text-slate-400 mt-1 dark:text-gray-400">
            Here is a quick overview of your sales performance for this period.
          </p>
        </div>

        {/* Date Widget */}
        <div className="flex min-h-11 items-center gap-2.5 self-start rounded-xl border border-slate-200/80 bg-white px-4 py-2.5 shadow-xs md:self-auto dark:border-gray-700 dark:bg-gray-800">
          <Calendar className="h-4.5 w-4.5 text-slate-400" />
          <span className="text-xs font-extrabold text-slate-600 dark:text-gray-300">{formattedDate}</span>
        </div>
      </div>

      {/* Stats Cards Dashboard Section — items-stretch ensures equal heights */}
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 items-stretch">
        <StatsCard
          title="Total Leads"
          value={stats.totalLeads}
          icon={Users}
          change="+15.2%"
          color="blue"
          onClick={() => navigate("/leads")}
        />
        <StatsCard
          title="Qualified Leads"
          value={stats.qualifiedLeads}
          icon={UserCheck}
          change="+8.3%"
          color="green"
          onClick={() => navigate("/leads")}
        />
        <StatsCard
          title="Conversion Rate"
          value={stats.conversionRate}
          icon={Percent}
          change="+2.4%"
          color="yellow"
          onClick={() => navigate("/analytics")}
        />
        <StatsCard
          title="Revenue Potential"
          value={stats.revenuePotential}
          icon={DollarSign}
          change="+18.4%"
          color="indigo"
          onClick={() => navigate("/analytics")}
        />
      </section>

      {/* Secondary Layout Section: Pipeline breakdown and Quick Actions */}
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2 items-stretch">
        <PipelineOverview leads={leads} />
        <QuickActions 
          onAddLead={handleAddLead}
          onViewLeads={handleViewLeads}
          onExportData={handleExportData}
        />
      </section>

      {/* Recent Leads Table list */}
      <section>
        <RecentLeads leads={leads} />
      </section>

    </div>
  );
}
