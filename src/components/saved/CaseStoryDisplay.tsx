"use client";

import { ClinicalStory } from "@/lib/types/cases";
import { Activity, History, Stethoscope } from "lucide-react";

interface CaseStoryDisplayProps {
  story: ClinicalStory;
}

export function CaseStoryDisplay({ story }: CaseStoryDisplayProps) {
  // Styles aligned with ProfileInfoCard.tsx
  // Key: bg-card-dashboard-light/dark, border-slate-200/transparent
  const cardClass =
    "bg-card-dashboard-light dark:bg-card-dashboard-dark rounded-2xl p-8 md:p-12 shadow-sm border border-slate-200 dark:border-transparent transition-all duration-300";
  const sectionHeaderClass =
    "flex items-center gap-2 text-primary-dashboard font-bold text-lg mb-4";

  // Sub-cards use bg-slate-50 (light) and bg-background-dashboard-dark (dark) to allow transparency/contrast
  // Based on specific feedback to avoid "navy blue" defaults
  const subCardClass =
    "bg-slate-50 dark:bg-background-dashboard-dark p-5 rounded-lg border border-slate-200 dark:border-transparent";
  const subHeaderClass =
    "text-slate-900 dark:text-white font-bold text-sm uppercase tracking-wide mb-4 border-b border-slate-200 dark:border-slate-800 pb-2";

  return (
    <div className={cardClass}>
      {/* Chief Complaint */}
      <div className="mb-8 border-b border-slate-200 dark:border-slate-800 pb-6">
        <h3 className="text-xs uppercase tracking-[0.15em] text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark font-bold mb-3">
          Chief Complaint
        </h3>
        <p className="text-xl md:text-2xl font-serif italic text-slate-900 dark:text-white leading-relaxed">
          "I feel like an elephant is sitting on my chest, and the pain is going
          down my left arm."
        </p>
      </div>

      <div className="space-y-10">
        {/* HPI */}
        <section>
          <h4 className={sectionHeaderClass}>
            <History className="w-5 h-5" />
            History of Present Illness (HPI)
          </h4>
          <div className="space-y-4 text-lg leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">
            {story.hpi}
          </div>
        </section>

        {/* Vitals and PMH Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={subCardClass}>
            <h4 className={subHeaderClass}>Vitals on Arrival</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-text-dashboard-secondary-dark font-medium">
                  Blood Pressure
                </span>
                <span className="font-mono font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded">
                  {story.vitals.bp} mmHg
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-text-dashboard-secondary-dark font-medium">
                  Heart Rate
                </span>
                <span className="font-mono font-bold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 px-2 py-0.5 rounded">
                  {story.vitals.heartRate} bpm
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-text-dashboard-secondary-dark font-medium">
                  Respiration Rate
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {story.vitals.respiratoryRate} bpm
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-text-dashboard-secondary-dark font-medium">
                  Temperature
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {story.vitals.temp}
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-text-dashboard-secondary-dark font-medium">
                  SpO2
                </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {story.vitals.spo2}
                </span>
              </li>
            </ul>
          </div>

          <div className={subCardClass}>
            <h4 className={subHeaderClass}>Past Medical History</h4>
            <ul className="list-disc list-inside space-y-2 text-sm marker:text-primary-dashboard text-slate-700 dark:text-slate-300">
              <li>Hypertension (Diagnosed 2018)</li>
              <li>Hyperlipidemia</li>
              <li>Obesity (BMI 31)</li>
              <li>Smoking (10 pack-year history, quit 2 years ago)</li>
              <li>Father had MI at age 52</li>
            </ul>
          </div>
        </section>

        {/* Physical Exam */}
        <section>
          <h4 className={sectionHeaderClass}>
            <Stethoscope className="w-5 h-5" />
            Physical Exam Findings
          </h4>
          <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            {story.physicalExam}
          </p>
        </section>

        {/* Diagnostics */}
        <section>
          <h4 className={sectionHeaderClass}>
            <Activity className="w-5 h-5" />
            Initial Diagnostics
          </h4>
          <div className="space-y-4 text-slate-700 dark:text-slate-300">
            {story.diagnostics?.map((diag, index) => (
              <p key={index} className="text-lg leading-relaxed font-medium">
                {diag}
              </p>
            ))}

            <div className="mt-4 p-8 rounded-lg bg-slate-50 dark:bg-background-dashboard-dark flex items-center justify-center border border-slate-200 dark:border-transparent">
              <div className="text-center text-slate-400 dark:text-slate-500">
                <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-xs font-semibold uppercase tracking-widest">
                  ECG Strip Image Placeholder
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
