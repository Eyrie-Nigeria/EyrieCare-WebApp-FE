"use client";

import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Dynamic logic for elegant pagination navigation
  const renderPages = () => {
    if (totalPages <= 7) return pages;

    const shownPages: (number | string)[] = [];
    if (currentPage <= 4) {
      shownPages.push(...pages.slice(0, 5), "...", totalPages);
    } else if (currentPage >= totalPages - 3) {
      shownPages.push(1, "...", ...pages.slice(totalPages - 5));
    } else {
      shownPages.push(
        1,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages,
      );
    }
    return shownPages;
  };

  return (
    <nav className={cn("flex items-center justify-center gap-2", className)}>
      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="size-10 md:size-11 flex items-center justify-center rounded-xl bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-white/10 hover:border-primary-dashboard hover:text-primary-dashboard dark:hover:border-primary-dashboard disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-inherit transition-all shadow-sm"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <div className="flex items-center gap-2">
        {renderPages().map((page, i) => (
          <React.Fragment key={i}>
            {typeof page === "number" ? (
              <button
                onClick={() => onPageChange(page)}
                className={cn(
                  "size-10 md:size-11 rounded-xl text-xs md:text-sm font-black transition-all border",
                  currentPage === page
                    ? "bg-primary-dashboard border-primary-dashboard text-slate-900 shadow-lg shadow-primary-dashboard/20 translate-y-[-2px]"
                    : "bg-white dark:bg-card-dashboard-dark border-slate-200 dark:border-white/10 text-slate-500 hover:border-primary-dashboard hover:text-primary-dashboard shadow-sm",
                )}
              >
                {page}
              </button>
            ) : (
              <span className="px-1 text-slate-400">
                <MoreHorizontal className="w-4 h-4" />
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Next Page Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="size-10 md:size-11 flex items-center justify-center rounded-xl bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-white/10 hover:border-primary-dashboard hover:text-primary-dashboard dark:hover:border-primary-dashboard disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-inherit transition-all shadow-sm"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </nav>
  );
}
