"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FileEdit, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function CaseNotes() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="rounded-xl border border-slate-200 dark:border-transparent overflow-hidden shadow-sm bg-card-dashboard-light dark:bg-card-dashboard-dark">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-50 dark:bg-black/20 hover:bg-slate-100 dark:hover:bg-black/30 transition-colors text-left border-b border-slate-200 dark:border-transparent"
      >
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <FileEdit className="w-5 h-5 text-primary-dashboard" />
          Student Reasoning & Notes
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 bg-card-dashboard-light dark:bg-card-dashboard-dark animate-in slide-in-from-top-2 duration-200">
          <Textarea
            className="min-h-[150px] resize-none text-base p-4 bg-slate-50 dark:bg-background-dashboard-dark border-slate-200 dark:border-transparent text-slate-900 dark:text-white placeholder:text-slate-400"
            placeholder="Add your clinical differential and reasoning notes here..."
          />
          <div className="flex justify-end mt-4">
            <Button
              variant="secondary"
              className="font-bold bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-gray-300 hover:bg-slate-200 dark:hover:bg-white/10"
            >
              Save Progress
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
