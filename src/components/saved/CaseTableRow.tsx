"use client";

import React from "react";
import { User, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { CaseTableRowProps } from "./types";

export function CaseTableRow({ caseItem }: CaseTableRowProps) {
  return (
    <tr
      className="hover:bg-slate-50/80 dark:hover:bg-white/[0.03] transition-all duration-200 group cursor-pointer"
      onClick={() => (window.location.href = `/saved/${caseItem.id}`)}
    >
      <td className="px-6 py-4.5">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-primary-dashboard/10 group-hover:text-primary-dashboard transition-all border border-transparent group-hover:border-primary-dashboard/20">
            <User className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 dark:text-white group-hover:text-primary-dashboard transition-colors truncate max-w-[150px] tracking-tight">
              {caseItem.patientName}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider opacity-70">
              ID: {caseItem.id.substring(0, 8)}
            </span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4.5 text-slate-600 dark:text-slate-400 font-semibold tracking-tight text-xs uppercase">
        {caseItem.specialtyId}
      </td>
      <td className="px-6 py-4.5 max-w-xs truncate text-slate-600 dark:text-slate-400 font-medium italic opacity-90 text-sm">
        "{caseItem.chiefComplaint}"
      </td>
      <td className="px-6 py-4.5">
        <span
          className={cn(
            "inline-flex items-center rounded-lg px-2.5 py-1 text-[10px] font-black uppercase tracking-wider",
            caseItem.status === "Finalized"
              ? "bg-green-100/50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20"
              : "bg-yellow-100/50 dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-500/20",
          )}
        >
          {caseItem.status}
        </span>
      </td>
      <td className="px-6 py-4.5 text-slate-500 dark:text-slate-500 font-bold text-xs tabular-nums opacity-80">
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
