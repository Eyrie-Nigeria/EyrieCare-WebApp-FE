"use client";

import { FileText, X } from "lucide-react";
import { AutoDraftProps } from "../types";
import { useClerk } from "@/context/ClerkContext";

export default function AutoDraft({ onClose }: AutoDraftProps) {
  const { sections, answers } = useClerk();

  // Helper to get all non-empty answers for a section
  const getSectionAnswers = (sectionId: string) => {
    const section = sections.find((s) => s.id === sectionId);
    if (!section) return [];
    return section.questions
      .filter((q) => q.status === "answered" && q.answer)
      .map((q) => ({ question: q.text, answer: q.answer }));
  };

  return (
    <div className="w-full h-full flex flex-col bg-surface-dashboard-light dark:bg-card-dashboard-dark border-l border-slate-200 dark:border-card-dashboard-dark/50 shadow-sm relative">
      <div className="p-6 border-b border-slate-200 dark:border-card-dashboard-dark/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 -ml-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <h3 className="font-bold text-slate-900 dark:text-white">
            Live Clinical Note
          </h3>
        </div>
        <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded uppercase border border-blue-200 dark:border-blue-800 animate-pulse">
          Generating
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {sections.map((section) => {
          const sectionAnswers = getSectionAnswers(section.id);
          if (sectionAnswers.length === 0) return null;

          return (
            <div key={section.id}>
              <h4 className="text-xs font-bold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-widest mb-3">
                {section.title}
              </h4>
              <div className="bg-slate-50 dark:bg-surface-dashboard-dark rounded-lg border border-slate-100 dark:border-card-dashboard-dark overflow-hidden">
                {sectionAnswers.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 border-b border-slate-100 dark:border-card-dashboard-dark last:border-0"
                  >
                    <p className="text-[10px] text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark mb-1">
                      {item.question}
                    </p>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {Object.keys(answers).length === 0 && (
          <div className="text-center py-12 px-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
            <p className="text-slate-400 text-sm">
              Start answering questions to see the clinical note build up here.
            </p>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-slate-200 dark:border-card-dashboard-dark/50 mt-auto">
        <button
          disabled={Object.keys(answers).length === 0}
          className="w-full bg-slate-900 dark:bg-primary-dashboard disabled:opacity-50 disabled:cursor-not-allowed text-white dark:text-surface-dashboard-dark py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg"
        >
          Generate Final Report
          <FileText className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
