import React from "react";
import { BarChart3, TrendingUp, Calendar, ArrowUpRight, Award, ShieldAlert, Sparkles } from "lucide-react";

export default function Reports() {
  const reportsList = [
    {
      title: "Monthly Lead Sourcing Performance",
      description: "Detailed evaluation of lead volumes generated across website channels, outbound sales, and advertising campaigns.",
      date: "Updated 2 hours ago",
      status: "Ready",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    {
      title: "Sales Funnel Velocity Report",
      description: "Aggregates timelines from first prospect touchpoint to successful won closing. Helps isolate pipeline bottlenecks.",
      date: "Updated 1 day ago",
      status: "Ready",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-100",
    },
    {
      title: "Quarterly Revenue Potential Audit",
      description: "Financial projection comparing closed deal volumes against qualified pipelines. Essential for planning milestones.",
      date: "Updated 3 days ago",
      status: "Review Pending",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-100",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Business Intelligence</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">CRM Analytics & Reports</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Generate and export pipeline performance audits and deal projections.</p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500">Pipeline Velocity</span>
            <TrendingUp className="h-5 w-5 text-blue-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">14.2 Days</span>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-100/50">
              -1.8d
            </span>
          </div>
          <p className="mt-1 text-xs font-semibold text-slate-400">Avg prospect progression speed</p>
        </div>

        <div className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500">Conversion Rate</span>
            <Award className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">30.0%</span>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-100/50">
              +2.4%
            </span>
          </div>
          <p className="mt-1 text-xs font-semibold text-slate-400">Qualified vs total prospects</p>
        </div>

        <div className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-500">Active Audit Alerts</span>
            <ShieldAlert className="h-5 w-5 text-amber-500" />
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900">1 Active</span>
            <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700 border border-amber-100/50">
              Pending
            </span>
          </div>
          <p className="mt-1 text-xs font-semibold text-slate-400">Pipeline bottlenecks flag count</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Ready Performance Reports</h2>
        <div className="grid gap-4">
          {reportsList.map((rep, idx) => (
            <div
              key={idx}
              className="group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border border-slate-200/80 bg-white hover:border-blue-300 transition-all duration-200 shadow-xs"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-sm font-bold text-slate-900">{rep.title}</span>
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${rep.badgeColor}`}>
                    {rep.status}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-400 leading-relaxed">{rep.description}</p>
              </div>

              <div className="mt-4 md:mt-0 flex items-center justify-between gap-4 border-t border-slate-50 pt-3 md:border-t-0 md:pt-0">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{rep.date}</span>
                </div>
                <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:border-slate-300 hover:text-blue-600 transition-all cursor-pointer">
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
