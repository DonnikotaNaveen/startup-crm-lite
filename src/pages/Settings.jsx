import { useState } from "react";
import toast from "react-hot-toast";
import { Settings as SettingsIcon, Bell, Shield, User, Save } from "lucide-react";

export default function Settings() {
  const [profile, setProfile] = useState({
    name: "Donnikota Naveen",
    email: "admin@crmlite.io",
    role: "Senior Administrator",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    weeklyDigest: false,
    mfaEnabled: true,
    pipelineAlerts: true,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    toast.success("Workspace settings updated successfully!", {
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
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div>
        <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
          <SettingsIcon className="h-3.5 w-3.5" />
          <span>System Configurations</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1 dark:text-white">Workspace Settings</h1>
        <p className="text-sm text-slate-500 font-medium mt-1 dark:text-gray-400">Configure your CRM workspace, profile preferences, and account security rules.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Profile */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4 transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-gray-700">
            <User className="h-5 w-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Administrator Profile</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide dark:text-gray-400">Full Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-200/80 focus:border-blue-500 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none transition-all dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:bg-gray-950"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide dark:text-gray-400">Email Address</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full px-3.5 py-2.5 bg-slate-50 focus:bg-white border border-slate-200/80 focus:border-blue-500 rounded-xl text-sm font-semibold text-slate-800 focus:outline-none transition-all dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 dark:focus:bg-gray-950"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Notifications */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4 transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-gray-700">
            <Bell className="h-5 w-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Communication Preferences</h2>
          </div>

          <div className="space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-gray-100">Email Notifications</p>
                <p className="text-xs font-semibold text-slate-400 mt-0.5 dark:text-gray-500">Receive instant alerts for newly captured inbound leads.</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("emailNotifications")}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  preferences.emailNotifications ? "bg-blue-600" : "bg-slate-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    preferences.emailNotifications ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800 dark:text-gray-100">Weekly Performance Digest</p>
                <p className="text-xs font-semibold text-slate-400 mt-0.5 dark:text-gray-500">Receive a summary of deal progressions and conversion rate changes.</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle("weeklyDigest")}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  preferences.weeklyDigest ? "bg-blue-600" : "bg-slate-200 dark:bg-gray-700"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                    preferences.weeklyDigest ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Security */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-4 transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 dark:border-gray-700">
            <Shield className="h-5 w-5 text-blue-600" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Security Policies</h2>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-gray-100">Two-Factor Authentication (MFA)</p>
              <p className="text-xs font-semibold text-slate-400 mt-0.5 dark:text-gray-500">Secure your administrator login sessions using verification keys.</p>
            </div>
            <button
              type="button"
              onClick={() => handleToggle("mfaEnabled")}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                preferences.mfaEnabled ? "bg-blue-600" : "bg-slate-200 dark:bg-gray-700"
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs ring-0 transition duration-200 ease-in-out ${
                  preferences.mfaEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Save button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold shadow-md shadow-blue-500/10 hover:shadow-lg transition-all duration-200 cursor-pointer"
          >
            <Save className="h-4.5 w-4.5" /> Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
