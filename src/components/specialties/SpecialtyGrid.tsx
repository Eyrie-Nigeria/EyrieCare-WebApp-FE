"use client";

import React from "react";
import { Search, Filter, FolderKanban } from "lucide-react";
import { SpecialtyCard } from "./SpecialtyCard";
import { Pagination } from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { SpecialtyGridProps } from "./types";

// Adding totalItems to props if we want to show it in the UI
interface ExtendedSpecialtyGridProps extends SpecialtyGridProps {
  totalItems?: number;
  totalPages?: number;
}

export function SpecialtyGrid({
  specialties,
  searchQuery,
  onSearchChange,
  currentPage,
  onPageChange,
  totalPages = 1,
}: ExtendedSpecialtyGridProps) {
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
            placeholder="Search specialties or clinical categories..."
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
      {specialties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 transition-all">
          {specialties.map((spec, index) => (
            <SpecialtyCard key={spec.id} specialty={spec} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-20 text-center gap-4 bg-slate-50 dark:bg-card-dashboard-dark/30 rounded-[2.5rem] border border-dashed border-slate-200 dark:border-white/5">
          <div className="size-16 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center text-slate-400 shadow-sm">
            <FolderKanban className="w-8 h-8 opacity-20" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No specialties found
            </h3>
            <p className="text-sm text-slate-500 max-w-xs">
              We couldn't find any specialties matching your search criteria.
            </p>
          </div>
        </div>
      )}

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
