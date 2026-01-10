"use client";

import {
  GraduationCap,
  BookOpen,
  Award,
  BarChart4,
  ChevronRight,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AcademicFieldProps, CertItemProps, ResultItemProps } from "./types";

export default function AcademicTab() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Current Academic Status */}
      <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-transparent transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg shadow-sm">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h3 className="text-slate-900 dark:text-white text-lg font-bold">
            Academic Status
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AcademicField
            label="Medical School"
            value="Stanford University School of Medicine"
          />
          <AcademicField label="Program" value="M.D. Program" />
          <AcademicField
            label="Current Year"
            value="Year 3 (Clinical Rotations)"
          />
          <AcademicField label="Student ID" value="MED-2024-8921" />
        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-card-dashboard-dark/30">
          <Button
            variant="outline"
            className="flex items-center gap-2 font-bold text-xs"
          >
            <Download className="w-4 h-4 text-primary-dashboard" />
            Download Enrollment Verification
          </Button>
        </div>
      </div>

      {/* Transcript & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-transparent transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">
              Certifications
            </h3>
          </div>

          <div className="space-y-4">
            <CertItem title="ACLS Certification" date="Expires June 2025" />
            <CertItem title="BLS Certification" date="Expires March 2025" />
            <Button
              variant="outline"
              className="w-full border-dashed border-slate-300 dark:border-card-dashboard-dark py-8 flex flex-col items-center gap-2 text-slate-400 hover:text-primary-dashboard hover:border-primary-dashboard hover:bg-primary-dashboard/5 transition-all group"
            >
              <span className="text-lg group-hover:scale-110 transition-transform">
                +
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Add New Certificate
              </span>
            </Button>
          </div>
        </div>

        <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-transparent transition-all duration-300">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg shadow-sm">
              <BarChart4 className="w-5 h-5" />
            </div>
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">
              Latest Results
            </h3>
          </div>

          <div className="space-y-4">
            <ResultItem subject="Clinical Cardiology" score="92%" />
            <ResultItem subject="Respiratory Medicine" score="88%" />
            <ResultItem subject="Medical Ethics" score="95%" />
            <Button
              variant="ghost"
              className="w-full text-primary-dashboard font-bold hover:bg-primary-dashboard/5 text-xs transition-colors"
            >
              View All Academic Records
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AcademicField({ label, value }: AcademicFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-background-dashboard-dark/50 transition-colors">
      <span className="text-xs font-semibold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-wide opacity-70">
        {label}
      </span>
      <span className="text-sm font-bold text-slate-800 dark:text-white">
        {value}
      </span>
    </div>
  );
}

function CertItem({ title, date }: CertItemProps) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 dark:bg-background-dashboard-dark border border-slate-100 dark:border-card-dashboard-dark/20 group cursor-pointer hover:border-primary-dashboard/30 hover:shadow-md transition-all">
      <div className="flex items-center gap-3">
        <div className="size-9 rounded-lg bg-white dark:bg-card-dashboard-dark flex items-center justify-center border border-slate-200 dark:border-card-dashboard-dark shadow-sm group-hover:scale-105 transition-transform">
          <BookOpen className="w-4 h-4 text-slate-500" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">
            {title}
          </p>
          <p className="text-[10px] text-text-dashboard-secondary-light font-medium">
            {date}
          </p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary-dashboard group-hover:translate-x-1 transition-all" />
    </div>
  );
}

function ResultItem({ subject, score }: ResultItemProps) {
  return (
    <div className="flex items-center justify-between p-3.5 rounded-lg bg-slate-50 dark:bg-background-dashboard-dark border border-slate-100 dark:border-card-dashboard-dark/20 group hover:border-slate-200 dark:hover:border-card-dashboard-dark transition-all">
      <span className="text-sm font-bold text-slate-700 dark:text-white group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
        {subject}
      </span>
      <div className="flex items-center gap-2">
        <div className="w-16 bg-slate-200 dark:bg-white/10 rounded-full h-1.5 hidden sm:block">
          <div
            className="bg-primary-dashboard h-1.5 rounded-full"
            style={{ width: score }}
          ></div>
        </div>
        <span className="text-sm font-bold text-primary-dashboard">
          {score}
        </span>
      </div>
    </div>
  );
}
