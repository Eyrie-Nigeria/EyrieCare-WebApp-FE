"use client";

import { TrendingUp } from "lucide-react";
import { cn } from "@/lib/cn";
import { StatCardProps } from "./types";

export function StatCard({
  label,
  value,
  percentage,
  icon: Icon,
  trend,
  colorClass = "bg-primary-dashboard",
  iconBgClass = "bg-green-100 dark:bg-green-900/30",
  iconColorClass = "text-green-600 dark:text-green-400",
}: StatCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-xl p-6 bg-card-dashboard-light dark:bg-card-dashboard-dark border border-slate-200 dark:border-transparent shadow-sm hover:shadow-md transition-all duration-300 group">
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-1">
          <p className="text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark text-xs font-bold uppercase tracking-widest opacity-80">
            {label}
          </p>
          <h3 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight">
            {value}
          </h3>
        </div>
        <div
          className={cn(
            "p-2.5 rounded-lg border transition-colors",
            iconBgClass,
          )}
        >
          <Icon className={cn("w-6 h-6", iconColorClass)} />
        </div>
      </div>

      <div className="w-full bg-slate-100 dark:bg-black/20 rounded-full h-2 mb-3 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            colorClass,
          )}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <div className="flex items-center gap-1">
        {trend ? (
          <p className="text-green-600 dark:text-primary-dashboard text-sm font-semibold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            {trend}
          </p>
        ) : (
          <p className="text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark text-sm font-medium">
            Progress tracked daily
          </p>
        )}
      </div>
    </div>
  );
}
