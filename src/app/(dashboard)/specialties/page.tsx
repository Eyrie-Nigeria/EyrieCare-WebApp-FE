"use client";

import React, { useState } from "react";
import { SPECIALTIES } from "@/lib/data/specialties";
import { ChevronRight, Calendar, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SpecialtyGrid } from "@/components/specialties";

export default function SpecialtyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSpecialties = SPECIALTIES.filter(
    (spec) =>
      spec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spec.desc.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex flex-col gap-6 md:gap-10 pb-20 font-sans">
      {/* Page Heading & Breadcrumbs */}
      <div className="flex flex-col gap-4">
        <nav className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all">
          <Link
            href="/dashboard"
            className="text-slate-400 hover:text-primary-dashboard transition-colors"
          >
            Dashboard
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300 dark:text-card-dashboard-dark" />
          <span className="text-slate-900 dark:text-white">Specialties</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none transition-all">
              Clinical <span className="text-primary-dashboard">Rotations</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl text-sm md:text-base font-medium leading-relaxed transition-all">
              Manage your rotation cycles, assigned cases and logbooks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-white/5 px-4 py-3 rounded-xl text-slate-500 dark:text-slate-400 shadow-sm transition-all text-nowrap">
              <Calendar className="w-4 h-4 text-primary-dashboard" />
              <span>AY 2024/25</span>
            </div>
            <Button
              variant="dashboard"
              className="gap-2 shadow-lg shadow-primary-dashboard/10 h-11 md:h-12 px-5 md:px-7 rounded-xl text-sm font-bold transition-all whitespace-nowrap"
            >
              <Plus className="w-4 h-4 md:w-5 md:h-5" />
              Add Rotation
            </Button>
          </div>
        </div>
      </div>

      <SpecialtyGrid
        specialties={filteredSpecialties}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      <footer className="mt-12 py-10 text-center border-t border-slate-100 dark:border-white/5 transition-all">
        <p className="text-xs font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">
          © {new Date().getFullYear()} EyrieCare Clinical Registry • Rotation
          Cycle V2
        </p>
      </footer>
    </div>
  );
}
