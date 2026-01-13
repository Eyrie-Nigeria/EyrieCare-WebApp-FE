"use client";

import React from "react";
import Link from "next/link";
import { User, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { CaseCardProps } from "./types";

export function CaseCard({ caseItem }: CaseCardProps) {
  return (
    <Link
      href={`/saved/${caseItem.id}`}
      className="block p-5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white leading-none">
              {caseItem.patientName}
            </h3>
            <span className="text-[10px] font-bold text-primary-dashboard uppercase tracking-widest">
              {caseItem.specialtyId}
            </span>
          </div>
        </div>
        <span
          className={cn(
            "px-2.5 py-0.5 rounded-full text-[10px] font-bold",
            caseItem.status === "Finalized"
              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
              : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400",
          )}
        >
          {caseItem.status}
        </span>
      </div>
      <p className="text-sm text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark italic mb-4 px-3 border-l-2 border-primary-dashboard/20 line-clamp-2 opacity-90">
        "{caseItem.chiefComplaint}"
      </p>
      <div className="flex items-center justify-between text-[10px] font-bold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-widest pl-1 opacity-70">
        <span>
          {caseItem.date} • {caseItem.time}
        </span>
        <div className="flex items-center gap-1 text-primary-dashboard">
          <span>Details</span>
          <ChevronRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  );
}
