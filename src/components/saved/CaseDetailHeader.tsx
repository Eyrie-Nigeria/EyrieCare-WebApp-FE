"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClinicalStory } from "@/lib/types/cases";
import {
  Calendar,
  User,
  Share2,
  FileText,
  Copy,
  Eye,
  IdCard,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface CaseDetailHeaderProps {
  caseData: ClinicalStory;
}

export function CaseDetailHeader({ caseData }: CaseDetailHeaderProps) {
  return (
    <div className="flex flex-col gap-8">
      {/* Navigation Context */}
      <div className="flex flex-col gap-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all">
          <Link
            href="/dashboard"
            className="text-slate-400 hover:text-primary-dashboard transition-colors"
          >
            Dashboard
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <Link
            href="/saved"
            className="text-slate-400 hover:text-primary-dashboard transition-colors"
          >
            Case Library
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-900 dark:text-white">
            Case #{caseData.id.split("-")[1]}
          </span>
        </nav>

        {/* Page Heading & Metadata */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              {caseData.chiefComplaint}
            </h1>
            <div className="flex flex-wrap gap-4 items-center text-sm text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark">
              <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-card-dashboard-dark border border-slate-200 dark:border-transparent px-2 py-1 rounded">
                <IdCard className="w-4 h-4" />
                ID: {caseData.id.replace("case", "PT")}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {caseData.date}
              </span>
              <span className="flex items-center gap-1.5 text-primary-dashboard font-bold">
                <User className="w-4 h-4" />
                {caseData.gender === "Male" ? "Male" : "Female"}, {caseData.age}
                y
              </span>
            </div>
          </div>

          {/* Chips/Tags */}
          <div className="flex flex-wrap gap-2 md:justify-end max-w-md">
            <Badge
              variant="outline"
              className="capitalize bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-900/50"
            >
              {caseData.specialtyId}
            </Badge>
            <Badge
              variant="outline"
              className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-900/50"
            >
              Emergency
            </Badge>
            <Badge
              variant="outline"
              className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-900/50"
            >
              Intermediate
            </Badge>
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center justify-between p-4 bg-card-dashboard-light dark:bg-card-dashboard-dark rounded-xl border border-slate-200 dark:border-transparent shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark text-sm font-medium">
            <Eye className="w-5 h-5" />
            <span>Read-only View</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="hidden md:flex gap-2 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-white/5"
          >
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex gap-2 text-slate-700 dark:text-white border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-white/5"
          >
            <FileText className="w-4 h-4" />
            PDF
          </Button>
          <Button className="gap-2 font-bold shadow-lg shadow-primary-dashboard/20 bg-primary-dashboard hover:bg-primary-dashboard-hover text-white">
            <Copy className="w-4 h-4" />
            Copy Story
          </Button>
        </div>
      </div>
    </div>
  );
}
