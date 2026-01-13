"use client";

import React from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { MOCK_CASES } from "@/lib/data/cases";
import { CaseLibrary } from "@/components/saved";

export default function SavedCasesPage() {
  return (
    <div className="flex flex-col gap-6 md:gap-8 pb-20 font-sans">
      {/* Header Section */}
      <div className="flex flex-col gap-4">
        <nav className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all">
          <Link
            href="/dashboard"
            className="text-slate-400 hover:text-primary-dashboard transition-colors"
          >
            Dashboard
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-900 dark:text-white">Case Library</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Clinical <span className="text-primary-dashboard">Library</span>
            </h1>
            <p className="text-slate-500 dark:text-text-dashboard-secondary-dark text-xs md:text-sm font-medium opacity-80">
              Review and manage your documented patient encounters.
            </p>
          </div>
        </div>
      </div>

      <CaseLibrary cases={MOCK_CASES} />
    </div>
  );
}
