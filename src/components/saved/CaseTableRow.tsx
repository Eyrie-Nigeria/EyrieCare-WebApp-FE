"use client";

import React from "react";
import { User, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { CaseTableRowProps } from "./types";

export function CaseTableRow({ caseItem }: CaseTableRowProps) {
  return (
    <tr
      className="hover:bg-slate-50/50 dark:hover:bg-white/2 transition-colors group cursor-pointer"
      onClick={() => (window.location.href = `/saved/${caseItem.id}`)}
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-primary-dashboard/10 group-hover:text-primary-dashboard transition-all">
            <User className="w-4.5 h-4.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-dashboard transition-colors truncate max-w-[150px]">
              {caseItem.patientName}
            </span>
            <span className="text-[10px] text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark font-medium uppercase opacity-70">
              {caseItem.id}
            </span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark font-medium">
        {caseItem.specialtyId}
      </td>
      <td className="px-6 py-4 max-w-xs truncate text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark italic opacity-90">
        "{caseItem.chiefComplaint}"
      </td>
      <td className="px-6 py-4">
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold",
            caseItem.status === "Finalized"
              ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400"
              : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400",
          )}
        >
          {caseItem.status}
        </span>
      </td>
      <td className="px-6 py-4 text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark text-sm opacity-80 tabular-nums">
        {caseItem.date}
      </td>
      <td className="px-6 py-4 text-right">
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:text-primary-dashboard"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="w-4.5 h-4.5" />
        </Button>
      </td>
    </tr>
  );
}
