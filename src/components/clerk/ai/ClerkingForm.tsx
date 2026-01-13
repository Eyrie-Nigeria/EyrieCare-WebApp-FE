"use client";

import {
  ArrowLeft,
  Save,
  ChevronDown,
  Bot,
  Mic,
  Send,
  CheckCircle2,
  Circle,
  PlayCircle,
  SkipForward,
  HelpCircle,
  ArrowRight,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { useClerk } from "@/context/ClerkContext";
import { SPECIALTIES } from "@/lib/data/specialties";
import { useState } from "react";
import { QuestionStatus } from "../types";
import { AutoDraft } from "./AutoDraft";

export function ClerkingForm() {
  const {
    specialty,
    sections,
    activeSectionId,
    setActiveSection,
    submitAnswer,
    skipQuestion,
  } = useClerk();

  const selectedSpecialty = SPECIALTIES.find((s) => s.id === specialty);
  const specialtyName = selectedSpecialty
    ? selectedSpecialty.name
    : "Paediatrics";

  const [inputValues, setInputValues] = useState<Record<string, string>>({});
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [isNoteOpen, setIsNoteOpen] = useState(false);

  const handleSend = (questionId: string) => {
    const val = inputValues[questionId];
    if (!val) return;
    submitAnswer(questionId, val);
    setInputValues((prev) => ({ ...prev, [questionId]: "" }));
  };

  const handleSkip = (questionId: string) => {
    skipQuestion(questionId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, questionId: string) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(questionId);
    }
  };

  // Helper to render status icon
  const StatusIcon = ({ status }: { status: QuestionStatus }) => {
    switch (status) {
      case "answered":
        return (
          <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-500/10" />
        );
      case "current":
        return (
          <PlayCircle className="w-5 h-5 text-primary-dashboard fill-primary-dashboard/10 animate-pulse" />
        );
      case "skipped":
        return <SkipForward className="w-5 h-5 text-amber-500" />;
      default:
        return (
          <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
        );
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-background-dashboard-light dark:bg-background-dashboard-dark relative overflow-y-auto custom-scrollbar">
      {/* Header */}
      <header className="flex items-center justify-between p-4 sticky top-0 z-30 bg-background-dashboard-light/95 dark:bg-background-dashboard-dark/95 backdrop-blur-sm border-b border-slate-200/50 dark:border-card-dashboard-dark/50">
        <Link href="/clerk">
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-card-dashboard-dark transition-colors text-slate-900 dark:text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
        </Link>
        <div className="flex flex-col items-center">
          <h2 className="text-base md:text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white capitalize">
            {specialtyName} Clerking
          </h2>
          <span className="text-[10px] md:text-xs font-medium text-primary-dashboard">
            New Admission
          </span>
        </div>
        <div className="flex items-center gap-2">
          {/* Mobile Note Toggle */}
          <button
            onClick={() => setIsNoteOpen(true)}
            className="xl:hidden flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-card-dashboard-dark transition-colors text-slate-600 dark:text-slate-400"
          >
            <FileText className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button className="flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-card-dashboard-dark transition-colors text-primary-dashboard">
            <Save className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </div>
      </header>

      {/* Content Container */}
      <div className="flex-1 w-full max-w-3xl mx-auto px-4 pb-12 lg:pb-12 pt-4">
        {/* Progress Bar */}
        <div className="flex w-full flex-row items-center justify-center gap-1.5 pb-6">
          <div className="h-1 flex-1 rounded-full bg-primary-dashboard"></div>
          <div className="h-1 flex-1 rounded-full bg-slate-200 dark:bg-card-dashboard-dark"></div>
          <div className="h-1 flex-1 rounded-full bg-slate-200 dark:bg-card-dashboard-dark"></div>
        </div>

        {/* Accordions */}
        <div className="flex flex-col gap-4">
          {sections.map((section) => (
            <details
              key={section.id}
              className={cn(
                "group bg-surface-dashboard-light dark:bg-surface-dashboard-dark rounded-xl shadow-sm border border-slate-100 dark:border-card-dashboard-dark overflow-hidden transition-all duration-300",
                activeSectionId === section.id
                  ? "ring-2 ring-primary-dashboard/20"
                  : "",
              )}
              open={activeSectionId === section.id}
              onToggle={(e) => {
                // Simplified toggle logic for now - ideally managed by state but details native behavior is tricky
                if ((e.target as HTMLDetailsElement).open) {
                  setActiveSection(section.id);
                }
              }}
            >
              <summary className="flex items-center justify-between p-4 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden border-b border-transparent group-open:border-slate-50 group-open:dark:border-card-dashboard-dark/30">
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = section.icon;
                    return (
                      <div
                        className={cn(
                          "size-9 md:size-10 rounded-full flex items-center justify-center",
                          section.colorClass,
                          section.iconColor,
                        )}
                      >
                        {Icon && <Icon className="w-4 h-4 md:w-5 md:h-5" />}
                      </div>
                    );
                  })()}
                  <div className="flex flex-col text-left">
                    <h3 className="text-sm md:text-base font-bold text-slate-900 dark:text-white">
                      {section.title}
                    </h3>
                    <span className="text-[10px] md:text-xs text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark">
                      {section.subtitle}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-open:rotate-180 transition-transform duration-200" />
              </summary>

              <div className="p-4 bg-slate-50/50 dark:bg-black/20 flex flex-col gap-6 animate-in fade-in slide-in-from-top-1 duration-200">
                {/* 1. AI Question Checklist */}
                <div className="bg-white dark:bg-card-dashboard-dark rounded-xl p-4 border border-slate-100 dark:border-card-dashboard-dark/50 shadow-sm">
                  <h4 className="text-[10px] md:text-xs font-bold uppercase text-slate-400 mb-3 tracking-wider">
                    Required AI Questions
                  </h4>
                  <div className="space-y-3">
                    {section.questions.map((q) => (
                      <div
                        key={q.id}
                        className={cn(
                          "flex items-start gap-3 p-2 rounded-lg transition-colors",
                          q.status === "current"
                            ? "bg-primary-dashboard/5"
                            : "",
                        )}
                      >
                        <div className="mt-0.5">
                          <StatusIcon status={q.status} />
                        </div>
                        <div className="flex-1">
                          <p
                            className={cn(
                              "text-xs md:text-sm font-medium",
                              q.status === "answered"
                                ? "text-slate-500 line-through decoration-slate-300"
                                : "text-slate-900 dark:text-white",
                            )}
                          >
                            {q.text}
                          </p>
                          {q.answer && (
                            <p className="text-[10px] md:text-xs text-primary-dashboard mt-1 italic">
                              &quot;{q.answer}&quot;
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 2. Active Chat Area */}
                <div className="flex flex-col gap-4">
                  {/* AI Asks Current Question */}
                  {section.questions
                    .filter((q) => q.status === "current")
                    .map((q) => (
                      <div
                        key={q.id}
                        className="flex gap-3 animate-in fade-in slide-in-from-left-2 duration-300"
                      >
                        <div className="size-7 md:size-8 rounded-full bg-primary-dashboard/10 shrink-0 flex items-center justify-center text-primary-dashboard mt-1">
                          <Bot className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        </div>
                        <div className="bg-white dark:bg-card-dashboard-dark rounded-2xl rounded-tl-none p-3 shadow-sm border border-slate-100 dark:border-card-dashboard-dark/50 max-w-[90%]">
                          <p className="text-xs md:text-sm text-slate-700 dark:text-slate-200 font-medium">
                            {q.text}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => handleSkip(q.id)}
                              className="text-[10px] font-bold text-slate-400 hover:text-amber-500 uppercase tracking-wide flex items-center gap-1 transition-colors"
                            >
                              <SkipForward className="w-3 h-3" /> Skip
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}

                  {/* Input Area */}
                  <div className="mt-2">
                    {isCustomMode ? (
                      <div className="bg-amber-50 dark:bg-amber-900/10 p-3 rounded-xl border border-amber-100 dark:border-amber-900/20 mb-3">
                        <p className="text-[10px] md:text-xs text-amber-600 dark:text-amber-400 font-bold mb-2 flex items-center gap-2">
                          <HelpCircle className="w-3.5 h-3.5" /> Asking Custom
                          Question
                        </p>
                        <textarea
                          className="w-full bg-white dark:bg-card-dashboard-dark rounded-lg border border-amber-200 dark:border-amber-800/30 text-slate-900 dark:text-white text-sm p-3 min-h-15 focus:ring-2 focus:ring-amber-500/50"
                          placeholder="Type your own question used to clerk..."
                        ></textarea>
                      </div>
                    ) : (
                      // Normal Answer Input
                      section.questions.find((q) => q.status === "current") && (
                        <div className="relative flex gap-2 items-end">
                          <div className="relative flex-1">
                            <textarea
                              value={
                                inputValues[
                                  section.questions.find(
                                    (q) => q.status === "current",
                                  )!.id
                                ] || ""
                              }
                              onChange={(e) =>
                                setInputValues((prev) => ({
                                  ...prev,
                                  [section.questions.find(
                                    (q) => q.status === "current",
                                  )!.id]: e.target.value,
                                }))
                              }
                              onKeyDown={(e) =>
                                handleKeyDown(
                                  e,
                                  section.questions.find(
                                    (q) => q.status === "current",
                                  )!.id,
                                )
                              }
                              className="w-full bg-white dark:bg-card-dashboard-dark rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-medium p-3 pr-10 focus:ring-2 focus:ring-primary-dashboard focus:border-transparent text-sm shadow-sm min-h-12.5 resize-none"
                              placeholder="Type answer here..."
                              rows={1}
                            />
                            <button className="absolute right-2 top-2.5 text-slate-400 hover:text-primary-dashboard transition-colors">
                              <Mic className="w-5 h-5" />
                            </button>
                          </div>
                          <button
                            onClick={() =>
                              handleSend(
                                section.questions.find(
                                  (q) => q.status === "current",
                                )!.id,
                              )
                            }
                            disabled={
                              !inputValues[
                                section.questions.find(
                                  (q) => q.status === "current",
                                )!.id
                              ]
                            }
                            className="bg-primary-dashboard disabled:opacity-50 text-white size-11 rounded-xl flex items-center justify-center shadow-lg shadow-primary-dashboard/20 hover:bg-primary-dashboard-hover transition-colors shrink-0 mb-0.5"
                          >
                            <Send className="w-5 h-5" />
                          </button>
                        </div>
                      )
                    )}

                    <div className="flex justify-between items-center mt-3">
                      <button
                        onClick={() => setIsCustomMode(!isCustomMode)}
                        className="text-[10px] md:text-xs font-bold text-slate-500 hover:text-primary-dashboard transition-colors flex items-center gap-1.5"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        {isCustomMode
                          ? "Back to AI Questions"
                          : "Ask Custom Question"}
                      </button>

                      <button className="text-[10px] md:text-xs font-bold text-primary-dashboard bg-primary-dashboard/10 px-3 py-1.5 rounded-full hover:bg-primary-dashboard hover:text-white transition-all flex items-center gap-1">
                        Next Section <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </details>
          ))}

          {/* Final Generate Button */}
          <div className="pt-8 pb-12">
            <button className="w-full bg-slate-900 dark:bg-primary-dashboard text-white dark:text-surface-dashboard-dark h-14 rounded-2xl font-bold text-base shadow-xl shadow-slate-900/10 dark:shadow-primary-dashboard/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3">
              <span>Generate Clinical Note</span>
              <CheckCircle2 className="w-5 h-5" />
            </button>
            <p className="text-center text-[10px] text-slate-400 mt-4">
              Finish answering all sections before generating.
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Note Drawer */}
      {isNoteOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsNoteOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-[85%] max-w-md bg-surface-dashboard-light dark:bg-card-dashboard-dark shadow-2xl animate-in slide-in-from-right duration-300">
            <AutoDraft onClose={() => setIsNoteOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
