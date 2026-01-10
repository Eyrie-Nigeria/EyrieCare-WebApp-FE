"use client";

import { Play, PlusCircle, BarChart3 } from "lucide-react";
import { QuickAction } from "./types";

const actions: QuickAction[] = [
  {
    title: "Resume Last Case",
    description: "Continue where you left off in Cardiology.",
    icon: Play,
    color: "text-primary-dashboard",
    bgColor: "bg-primary-dashboard/10",
    hoverBg: "hover:bg-primary-dashboard",
  },
  {
    title: "Create Custom Quiz",
    description: "Start a new practice session based on your weak areas.",
    icon: PlusCircle,
    color: "text-slate-600 dark:text-white",
    bgColor: "bg-slate-100 dark:bg-card-dashboard-dark",
    hoverBg: "hover:bg-primary-dashboard",
  },
  {
    title: "Review Analytics",
    description: "Check your performance history and trends.",
    icon: BarChart3,
    color: "text-slate-600 dark:text-white",
    bgColor: "bg-slate-100 dark:bg-card-dashboard-dark",
    hoverBg: "hover:bg-primary-dashboard",
  },
];

export default function QuickActions() {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-slate-900 dark:text-white text-2xl font-bold leading-tight tracking-tight">
          Quick Actions
        </h2>
        <p className="text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark text-base font-normal opacity-90">
          Jump back into your studies immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action, idx) => (
          <button
            key={idx}
            className="flex flex-col items-start gap-4 p-6 rounded-xl border border-slate-200 dark:border-card-dashboard-dark bg-card-dashboard-light dark:bg-card-dashboard-dark hover:border-primary-dashboard hover:shadow-lg hover:shadow-primary-dashboard/5 transition-all duration-300 group text-left"
          >
            <div
              className={`p-3 rounded-full ${action.bgColor} ${action.color} group-hover:bg-primary-dashboard group-hover:text-surface-dashboard-dark transition-all duration-300`}
            >
              <action.icon className="w-7 h-7" />
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="text-slate-900 dark:text-white text-lg font-bold">
                {action.title}
              </h3>
              <p className="text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark text-sm leading-relaxed">
                {action.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
