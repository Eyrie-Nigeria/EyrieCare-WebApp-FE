"use client";

import React, { useState, useMemo } from "react";
import { Search, Filter, ChevronDown, Bookmark } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/pagination";
import { CaseTableRow } from "./CaseTableRow";
import { CaseCard } from "./CaseCard";
import { CaseLibraryProps } from "./types";

export function CaseLibrary({ cases }: CaseLibraryProps) {
  const searchParams = useSearchParams();
  const specialtyFilter = searchParams.get("specialty");

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredCases = useMemo(() => {
    return cases.filter((c) => {
      const matchesSearch =
        c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.chiefComplaint.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSpecialty =
        !specialtyFilter || c.specialtyId === specialtyFilter;
      return matchesSearch && matchesSpecialty;
    });
  }, [cases, searchQuery, specialtyFilter]);

  const totalPages = Math.ceil(filteredCases.length / itemsPerPage);
  const currentCases = filteredCases.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="flex flex-col gap-6 md:gap-8">
      {/* Toolbar / Filters */}
      <div className="flex flex-col lg:flex-row items-center gap-4 transition-all">
        <div className="relative flex-1 w-full group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-dashboard transition-colors" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search patient, ID or complaint..."
            className="w-full bg-white dark:bg-card-dashboard-dark/50 border border-slate-200 dark:border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm font-medium focus:ring-2 ring-primary-dashboard/10 outline-none transition-all dark:text-white placeholder:text-slate-400"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <Button
            variant="outline"
            className="w-full lg:w-auto h-11 md:h-12 px-6 rounded-2xl text-sm transition-all font-bold border-slate-200 dark:border-white/10 gap-2"
          >
            <Filter className="w-4 h-4" />
            {specialtyFilter
              ? specialtyFilter.toUpperCase()
              : "All Specialties"}
            <ChevronDown className="w-3.5 h-3.5 opacity-50 transition-transform group-hover:translate-y-0.5" />
          </Button>
        </div>
      </div>

      {/* Main List Container */}
      <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-card-dashboard-light dark:bg-card-dashboard-dark shadow-sm overflow-hidden text-slate-900 dark:text-white">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/40 text-xs uppercase text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark border-b border-slate-200 dark:border-white/10">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider">
                  Patient Details
                </th>
                <th className="px-6 py-4 font-bold tracking-wider">
                  Specialty
                </th>
                <th className="px-6 py-4 font-bold tracking-wider">
                  Chief Complaint
                </th>
                <th className="px-6 py-4 font-bold tracking-wider">Status</th>
                <th className="px-6 py-4 font-bold tracking-wider">Date</th>
                <th className="px-6 py-4 font-bold tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-white/20">
              {currentCases.map((caseItem) => (
                <CaseTableRow key={caseItem.id} caseItem={caseItem} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-slate-200 dark:divide-white/20">
          {currentCases.map((caseItem) => (
            <CaseCard key={caseItem.id} caseItem={caseItem} />
          ))}
        </div>

        {/* Empty State */}
        {filteredCases.length === 0 && (
          <div className="py-24 text-center">
            <div className="size-20 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-200 mx-auto mb-6">
              <Bookmark className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              No encounters found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8 font-medium leading-relaxed">
              Try adjusting your search terms or filters to find the clinical
              cases you're looking for.
            </p>
            <Button
              variant="outline"
              className="rounded-xl px-8 h-12 font-bold"
              onClick={() => {
                setSearchQuery("");
                setCurrentPage(1);
              }}
            >
              Clear All
            </Button>
          </div>
        )}
      </div>

      {/* GLOBAL PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-8 flex flex-col items-center gap-4 py-8 border-t border-slate-100 dark:border-white/5">
          <p className="text-xs font-bold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-widest text-center opacity-70">
            Displaying{" "}
            <span className="text-primary-dashboard font-black">
              {(currentPage - 1) * itemsPerPage + 1} -{" "}
              {Math.min(currentPage * itemsPerPage, filteredCases.length)}
            </span>{" "}
            of {filteredCases.length} Patient Case History
          </p>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      )}
    </div>
  );
}
