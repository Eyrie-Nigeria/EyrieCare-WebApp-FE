"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Activity } from "./types";
import { MOCK_CASES } from "@/lib/data/cases";

export function RecentActivity() {
  // Use the 3 most recent cases as the activity for demonstration of "linked data"
  const activities: Activity[] = MOCK_CASES.slice(0, 3).map((c) => ({
    title: c.patientName,
    type: "Clinical Case",
    status: c.status,
    statusColor:
      c.status === "Finalized"
        ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
        : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400",
    date: c.date,
  }));
  return (
    <section className="mt-4 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-slate-900 dark:text-white text-2xl font-bold tracking-tight">
          Recent Activity
        </h2>
        <Link
          href="/dashboard/activity"
          className="text-primary-dashboard text-sm font-bold hover:opacity-80 transition-all flex items-center gap-1 group"
        >
          View All
          <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="overflow-x-auto rounded-[1.25rem] border border-slate-200/60 dark:border-white/5 bg-white/50 dark:bg-card-dashboard-dark/30 shadow-sm backdrop-blur-sm custom-scrollbar">
        <table className="w-full text-left text-sm border-collapse min-w-[600px]">
          <thead className="bg-slate-50/40 dark:bg-white/[0.02] text-[10px] uppercase text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-white/5">
            <tr>
              <th
                className="px-6 py-5 font-black tracking-[0.15em]"
                scope="col"
              >
                Activity
              </th>
              <th
                className="px-6 py-5 font-black tracking-[0.15em]"
                scope="col"
              >
                Type
              </th>
              <th
                className="px-6 py-5 font-black tracking-[0.15em]"
                scope="col"
              >
                Status
              </th>
              <th
                className="px-6 py-5 font-black tracking-[0.15em] text-right"
                scope="col"
              >
                Date
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/60 dark:divide-white/5">
            {activities.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-slate-50/80 dark:hover:bg-white/[0.03] transition-all duration-200 group"
              >
                <td className="px-6 py-4.5 font-bold text-slate-900 dark:text-white tracking-tight">
                  {item.title}
                </td>
                <td className="px-6 py-4.5 text-slate-600 dark:text-slate-400 font-medium">
                  {item.type}
                </td>
                <td className="px-6 py-4.5">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
                      item.statusColor,
                    )}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4.5 text-right text-slate-500 dark:text-slate-500 font-bold text-xs italic opacity-80">
                  {item.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
