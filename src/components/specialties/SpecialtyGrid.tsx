"use client";

import React from "react";
import { Search, Filter } from "lucide-react";
import { SpecialtyCard } from "./SpecialtyCard";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { SpecialtyGridProps } from "./types";

export function SpecialtyGrid({
  specialties,
  searchQuery,
  onSearchChange,
  currentPage,
  onPageChange,
}: SpecialtyGridProps) {
  const itemsPerPage = 8;
  const totalPages = Math.ceil(specialties.length / itemsPerPage);
  const currentSpecialties = specialties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 transition-all">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-dashboard transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search specialties or condition tags..."
            className="w-full bg-white dark:bg-card-dashboard-dark/50 border border-slate-200 dark:border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm font-medium focus:ring-2 ring-primary-dashboard/10 outline-none transition-all dark:text-white placeholder:text-slate-400"
          />
        </div>
        <Button
          variant="outline"
          className="w-full sm:w-auto gap-2 border-slate-200 dark:border-white/10 h-11 md:h-12 px-6 rounded-2xl text-sm transition-all font-bold"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 transition-all">
        {currentSpecialties.map((spec, index) => (
          <SpecialtyCard key={spec.id} specialty={spec} index={index} />
        ))}
      </div>

      {/* Pagination Integration */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col items-center gap-4 py-6 border-t border-slate-100 dark:border-white/5">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Showing page{" "}
            <span className="text-primary-dashboard">{currentPage}</span> of{" "}
            {totalPages}
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}
