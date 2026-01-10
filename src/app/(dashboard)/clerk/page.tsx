"use client";

import {
  Brain,
  Sparkles,
  ClipboardEdit,
  UserCog,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function ClerkSelectionPage() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-4 text-gradient">
          Start New Clerking Session
        </h1>
        <p className="text-lg text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark max-w-2xl mx-auto">
          Select your preferred method to document patient history and clinical
          examination.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* AI-Assisted Card */}
        <button className="group text-left flex flex-col p-8 bg-card-dashboard-light dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark rounded-2xl shadow-sm hover:shadow-xl hover:border-primary-dashboard dark:hover:border-primary-dashboard transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Brain
              className="w-32 h-32 text-slate-900 dark:text-white"
              strokeWidth={1}
            />
          </div>
          <div className="size-16 rounded-xl bg-primary-dashboard/10 flex items-center justify-center text-primary-dashboard-hover dark:text-primary-dashboard mb-6 group-hover:scale-110 transition-transform">
            <Sparkles className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            AI-Assisted Clerking
          </h2>
          <p className="text-slate-600 dark:text-text-dashboard-secondary-dark leading-relaxed mb-8 flex-1">
            Accelerate your workflow with AI-led sections. Interactive guidance
            helps you cover all necessary clinical points with the ability to
            ask custom diagnostic questions.
          </p>
          <div className="flex items-center text-primary-dashboard-hover dark:text-primary-dashboard font-bold gap-2 group-hover:translate-x-1 transition-transform">
            <span>Launch Assistant</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </button>

        {/* Manual Card */}
        <button className="group text-left flex flex-col p-8 bg-card-dashboard-light dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark rounded-2xl shadow-sm hover:shadow-xl hover:border-primary-dashboard dark:hover:border-primary-dashboard transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <ClipboardEdit
              className="w-32 h-32 text-slate-900 dark:text-white"
              strokeWidth={1}
            />
          </div>
          <div className="size-16 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-600 dark:text-gray-300 mb-6 group-hover:scale-110 transition-transform">
            <UserCog className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
            Student-Led Clerking
          </h2>
          <p className="text-slate-600 dark:text-text-dashboard-secondary-dark leading-relaxed mb-8 flex-1">
            Traditional manual form entry. Full control over every field and
            data point. Best for structured exams and formal clinical
            documentation practice.
          </p>
          <div className="flex items-center text-slate-600 dark:text-gray-300 font-bold gap-2 group-hover:translate-x-1 transition-transform">
            <span>Start Manual Entry</span>
            <ArrowRight className="w-5 h-5" />
          </div>
        </button>
      </div>

      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-card-dashboard-light dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark text-sm text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark/80">
          <ShieldCheck className="w-5 h-5 text-primary-dashboard" />
          Both modes comply with clinical data privacy standards.
        </div>
      </div>
    </div>
  );
}
