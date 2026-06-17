import React from "react"; // Import React core
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from "recharts"; // Import Recharts components for data visualisations
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Layers, 
  ArrowUpRight, 
  Award 
} from "lucide-react"; // Import icons to signify CRM parameters

// Mock conversion data representing stages of the CRM funnel
const pipelineFunnelData = [
  { stage: "Lead Capture", leads: 500, fill: "#3B82F6" }, // Blue
  { stage: "Contacted", leads: 380, fill: "#8B5CF6" },   // Purple
  { stage: "Qualified", leads: 240, fill: "#EC4899" },   // Pink
  { stage: "Proposal", leads: 120, fill: "#F59E0B" },    // Amber
  { stage: "Won Deals", leads: 48, fill: "#10B981" },    // Emerald
];

// Mock distribution data of lead generation channels
const leadSources = [
  { name: "Website Inbound", percentage: 42, count: 62, trend: "+8%" },
  { name: "Client Referrals", percentage: 26, count: 38, trend: "+14%" },
  { name: "LinkedIn Campaigns", percentage: 18, count: 27, trend: "+2%" },
  { name: "Partner Channels", percentage: 10, count: 15, trend: "Stable" },
  { name: "Cold Outbound", percentage: 4, count: 6, trend: "-3%" },
];

export default function Analytics() {
  return (
    // Animation-fade-in applies transition animations on mount
    <div className="space-y-8 animate-fade-in">
      
      {/* Header element */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">CRM Analytics</h1>
        <p className="text-sm text-slate-500 font-medium mt-1">Deep-dive assessment of funnel stages, transaction values, and sourcing pipelines.</p>
      </div>

      {/* Grid containing 3 premium indicators */}
      <div className="grid gap-6 sm:grid-cols-3">
        
        {/* Metric Card 1: Average Deal Value */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Average Deal Size</span>
            <div className="rounded-xl bg-blue-50 p-2.5 text-blue-600 transition-colors group-hover:bg-blue-100">
              <Award className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">$6,550</span>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              +4.8%
            </span>
          </div>
          <p className="mt-1 text-xs font-medium text-slate-400">vs Q1 Average ($6,250)</p>
        </div>

        {/* Metric Card 2: Sales Velocity */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Sales Velocity</span>
            <div className="rounded-xl bg-purple-50 p-2.5 text-purple-600 transition-colors group-hover:bg-purple-100">
              <Clock className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">14.2 Days</span>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              -1.8 Days
            </span>
          </div>
          <p className="mt-1 text-xs font-medium text-slate-400">Avg time from capture to won</p>
        </div>

        {/* Metric Card 3: CAC metric */}
        <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-slate-500">Acquisition Cost (CAC)</span>
            <div className="rounded-xl bg-pink-50 p-2.5 text-pink-600 transition-colors group-hover:bg-pink-100">
              <Target className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">$182</span>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
              -6.5%
            </span>
          </div>
          <p className="mt-1 text-xs font-medium text-slate-400">Optimised inbound efficiency</p>
        </div>

      </div>

      {/* Main visualization row */}
      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* Left Column: Recharts Funnel visualization */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-slate-900">CRM Conversion Funnel</h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">Leads volume tracking across distinct workspace deal phases.</p>
          </div>

          {/* Container for the Horizontal Bar Chart */}
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical" // Layout vertical creates horizontal bars
                data={pipelineFunnelData}
                margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
              >
                {/* Y-axis displays descriptive stage strings */}
                <YAxis 
                  dataKey="stage" 
                  type="category" 
                  stroke="#64748B" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                {/* X-axis displays numeric values */}
                <XAxis 
                  type="number" 
                  stroke="#94A3B8" 
                  fontSize={11} 
                  tickLine={false} 
                  axisLine={false} 
                />
                {/* Tooltip styling matching Dashboard dark aesthetics */}
                <Tooltip 
                  cursor={{ fill: "#F8FAFC" }} // Soft hover background on rows
                  contentStyle={{ backgroundColor: "#0F172A", border: "none", borderRadius: "12px", color: "#F8FAFC" }}
                  itemStyle={{ fontSize: "12px", color: "#38BDF8" }}
                />
                {/* Render bars and apply individual colors using Cell maps */}
                <Bar dataKey="leads" name="Leads Count" radius={[0, 8, 8, 0]} barSize={24}>
                  {pipelineFunnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column: Lead source listing card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Lead Sources</h2>
                <p className="text-xs text-slate-400 font-medium mt-0.5">Performance share by channel.</p>
              </div>
              <Layers className="h-4.5 w-4.5 text-slate-400" />
            </div>

            {/* List entries for each sourcing channel with responsive progress bar charts */}
            <div className="space-y-4.5">
              {leadSources.map((src, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-700">{src.name}</span>
                    <div className="flex gap-2">
                      <span className="text-slate-400">{src.count} leads</span>
                      <span className={`text-[10px] ${src.trend.startsWith("+") ? "text-emerald-600" : src.trend.startsWith("-") ? "text-rose-500" : "text-slate-400"}`}>
                        ({src.trend})
                      </span>
                    </div>
                  </div>
                  
                  {/* Outer bar container */}
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    {/* Inner dynamic width coloring bar */}
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full transition-all duration-500"
                      style={{ width: `${src.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick link button to exports */}
          <button className="w-full mt-6 flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-bold transition-all">
            <span>Download Detailed Export</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
