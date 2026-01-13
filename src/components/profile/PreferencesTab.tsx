import {
  Bell,
  Globe,
  Palette,
  ChevronDown,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { SettingItemProps } from "./types";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

export function PreferencesTab() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Monitor },
  ];

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Visual Preferences */}
      <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-transparent transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg">
            <Palette className="w-5 h-5" />
          </div>
          <h3 className="text-slate-900 dark:text-white text-lg font-bold">
            Appearance
          </h3>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 group">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800 dark:text-white">
                Theme Mode
              </span>
              <span className="text-xs text-text-dashboard-secondary-light">
                Switch between light, dark and system themes.
              </span>
            </div>
            <div className="flex items-center p-1 bg-slate-100 dark:bg-background-dashboard-dark rounded-xl border border-slate-200 dark:border-card-dashboard-dark shadow-inner w-fit">
              {themes.map((t) => {
                const isActive = theme === t.id;
                const Icon = t.icon;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={cn(
                      "flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg transition-all transform active:scale-95 cursor-pointer",
                      isActive
                        ? "bg-white dark:bg-card-dashboard-dark shadow-sm text-primary-dashboard dark:text-white"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
                    )}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between group">
            <div className="flex flex-col">
              <span className="text-sm font-bold text-slate-800 dark:text-white">
                Reduced Motion
              </span>
              <span className="text-xs text-text-dashboard-secondary-light">
                Minimize UI animations for accessibility.
              </span>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-slate-200 dark:bg-card-dashboard-dark/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-dashboard transition-colors"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Notifications Settings */}
      <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-transparent transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
            <Bell className="w-5 h-5" />
          </div>
          <h3 className="text-slate-900 dark:text-white text-lg font-bold">
            Notifications
          </h3>
        </div>

        <div className="space-y-5">
          <SettingItem
            title="Email Notifications"
            description="Receive updates about your academic progress via email."
            defaultChecked
          />
          <SettingItem
            title="Push Notifications"
            description="Get real-time alerts on your mobile device."
            defaultChecked
          />
          <SettingItem
            title="SMS Alerts"
            description="Important emergency updates via text message."
          />
        </div>
      </div>

      {/* Language & Regional */}
      <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-transparent transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-slate-900 dark:text-white text-lg font-bold">
            Localization
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-wide">
              Interface Language
            </label>
            <div className="relative">
              <select className="w-full rounded-lg border border-slate-200 dark:border-card-dashboard-dark bg-slate-50/50 dark:bg-background-dashboard-dark text-slate-900 dark:text-white h-11 px-4 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-primary-dashboard/20 focus:border-primary-dashboard transition-all font-medium text-sm">
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>French</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-wide">
              Time Zone
            </label>
            <div className="relative">
              <select className="w-full rounded-lg border border-slate-200 dark:border-card-dashboard-dark bg-slate-50/50 dark:bg-background-dashboard-dark text-slate-900 dark:text-white h-11 px-4 outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-primary-dashboard/20 focus:border-primary-dashboard transition-all font-medium text-sm">
                <option>(GMT+01:00) West Central Africa</option>
                <option>(GMT-08:00) Pacific Time</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingItem({
  title,
  description,
  defaultChecked = false,
}: SettingItemProps) {
  return (
    <div className="flex items-center justify-between py-1 group cursor-pointer">
      <div className="flex flex-col">
        <span className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-primary-dashboard transition-colors">
          {title}
        </span>
        <span className="text-xs text-text-dashboard-secondary-light">
          {description}
        </span>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          defaultChecked={defaultChecked}
        />
        <div className="w-11 h-6 bg-slate-200 dark:bg-card-dashboard-dark/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-dashboard transition-colors"></div>
      </label>
    </div>
  );
}
