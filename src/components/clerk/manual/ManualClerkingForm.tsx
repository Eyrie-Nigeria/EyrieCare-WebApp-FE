"use client";

import {
  Mic,
  CheckCircle2,
  ChevronDown,
  Activity,
  Heart,
  Thermometer,
  Percent,
  CreditCard,
  ClipboardList,
  History,
  Stethoscope,
  Baby,
  Utensils,
  Syringe,
  Puzzle,
  Users,
  Pill,
  Info,
  Check,
  Plus,
} from "lucide-react";
import React, { useState } from "react";
import { cn } from "@/lib/cn";
import { SessionInitModal } from "./SessionInitModal"; // Import the modal

// --- Components ---

const DictationCard = () => {
  return (
    <div className="relative overflow-hidden flex flex-col md:flex-row items-center md:items-stretch justify-between gap-4 rounded-xl bg-white dark:bg-card-dashboard-dark p-5 shadow-sm border border-slate-200 dark:border-card-dashboard-dark/50 group hover:shadow-md transition-all mb-6">
      {/* Decorative bg */}
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-dashboard/20 rounded-full blur-3xl pointer-events-none group-hover:bg-primary-dashboard/30 transition-all"></div>

      <div className="flex flex-1 flex-col gap-2 z-10 text-center md:text-left">
        <div>
          <p className="text-slate-900 dark:text-white text-lg font-bold leading-tight">
            Dictate Full History
          </p>
          <p className="text-slate-500 dark:text-text-dashboard-secondary-dark text-sm font-normal">
            Tap to activate AI voice scribe
          </p>
        </div>
        <button className="flex items-center justify-center md:justify-start gap-2 bg-primary-dashboard hover:bg-primary-dashboard-hover text-white px-5 py-2.5 rounded-full w-fit mx-auto md:mx-0 transition-all active:scale-95 shadow-lg shadow-primary-dashboard/20 group-hover:shadow-primary-dashboard/30 mt-2">
          <Mic className="w-4 h-4 group-hover:animate-pulse" />
          <span className="text-sm font-bold">Start Recording</span>
        </button>
      </div>

      {/* Visual Abstract */}
      <div className="w-full md:w-32 h-16 md:h-auto bg-primary-dashboard/5 rounded-xl flex items-center justify-center shrink-0">
        <div className="flex gap-1 items-center h-8">
          <div className="w-1 bg-primary-dashboard h-3 rounded-full animate-bounce"></div>
          <div className="w-1 bg-primary-dashboard h-5 rounded-full animate-[bounce_1.2s_infinite]"></div>
          <div className="w-1 bg-primary-dashboard h-8 rounded-full animate-[bounce_0.8s_infinite]"></div>
          <div className="w-1 bg-primary-dashboard h-4 rounded-full animate-[bounce_1.1s_infinite]"></div>
          <div className="w-1 bg-primary-dashboard h-2 rounded-full animate-[bounce_0.9s_infinite]"></div>
        </div>
      </div>
    </div>
  );
};

const VitalsScroll = () => {
  // Shared updated input style for Vitals
  const inputClass =
    "w-full bg-slate-100 dark:bg-black/40 border-transparent rounded-lg p-2 text-xl font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-primary-dashboard/50 focus:bg-white dark:focus:bg-black/60 placeholder:text-slate-300 dark:placeholder:text-slate-600 font-mono text-center transition-all shadow-inner";

  return (
    <div className="flex flex-col gap-3 mb-8">
      <div className="flex justify-between items-center pl-1">
        <label className="text-slate-900 dark:text-white text-base font-bold">
          Vitals (Triage)
        </label>
        <button className="text-xs text-primary-dashboard cursor-pointer font-bold hover:underline">
          Auto-fill from device
        </button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
        {/* BP */}
        <div className="shrink-0 flex flex-col gap-2 w-32 p-4 rounded-2xl bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark/50 focus-within:border-primary-dashboard/50 shadow-sm transition-all">
          <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-text-dashboard-secondary-dark">
            <Activity className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-bold tracking-wider">
              BP
            </span>
          </div>
          <input type="text" className={inputClass} placeholder="0/0" />
          <span className="text-[10px] text-center text-slate-400 font-medium">
            mmHg
          </span>
        </div>
        {/* HR */}
        <div className="shrink-0 flex flex-col gap-2 w-28 p-4 rounded-2xl bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark/50 focus-within:border-primary-dashboard/50 shadow-sm transition-all">
          <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-text-dashboard-secondary-dark">
            <Heart className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-bold tracking-wider">
              HR
            </span>
          </div>
          <input type="number" className={inputClass} placeholder="0" />
          <span className="text-[10px] text-center text-slate-400 font-medium">
            bpm
          </span>
        </div>
        {/* Temp */}
        <div className="shrink-0 flex flex-col gap-2 w-28 p-4 rounded-2xl bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark/50 focus-within:border-primary-dashboard/50 shadow-sm transition-all">
          <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-text-dashboard-secondary-dark">
            <Thermometer className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-bold tracking-wider">
              Temp
            </span>
          </div>
          <input type="number" className={inputClass} placeholder="0" />
          <span className="text-[10px] text-center text-slate-400 font-medium">
            °C
          </span>
        </div>
        {/* SPO2 */}
        <div className="shrink-0 flex flex-col gap-2 w-28 p-4 rounded-2xl bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark/50 focus-within:border-primary-dashboard/50 shadow-sm transition-all">
          <div className="flex items-center justify-center gap-1.5 text-slate-500 dark:text-text-dashboard-secondary-dark">
            <Percent className="w-3.5 h-3.5" />
            <span className="text-[10px] uppercase font-bold tracking-wider">
              SpO2
            </span>
          </div>
          <input type="number" className={inputClass} placeholder="0" />
          <span className="text-[10px] text-center text-slate-400 font-medium">
            %
          </span>
        </div>
      </div>
    </div>
  );
};

const Tag = ({ label, checked }: { label: string; checked?: boolean }) => (
  <label className="cursor-pointer group">
    <input type="checkbox" className="peer sr-only" defaultChecked={checked} />
    <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 dark:bg-card-dashboard-dark text-slate-600 dark:text-text-dashboard-secondary-dark text-sm font-medium border border-transparent peer-checked:bg-primary-dashboard/10 peer-checked:text-primary-dashboard peer-checked:border-primary-dashboard/20 transition-all group-hover:bg-slate-200 dark:group-hover:bg-white/5">
      {checked ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      {label}
    </span>
  </label>
);

const SectionHead = ({
  icon: Icon,
  title,
  isOpen,
  onToggle,
}: {
  icon: React.ElementType;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <button
    type="button"
    onClick={onToggle}
    className="w-full flex items-center justify-between p-5 bg-slate-50/50 dark:bg-black/20 border-b border-slate-200 dark:border-card-dashboard-dark/30 text-left group transition-colors"
  >
    <div className="flex items-center gap-3">
      <span className="text-primary-dashboard">
        <Icon className="w-5 h-5 fill-current opacity-20" />
      </span>
      <span className="font-bold text-slate-800 dark:text-white text-base md:text-lg">
        {title}
      </span>
    </div>
    <ChevronDown
      className={cn(
        "w-5 h-5 text-slate-400 transition-transform duration-200",
        isOpen && "rotate-180",
      )}
    />
  </button>
);

const InputGroup = ({
  label,
  placeholder,
  width = "full",
  defaultValue,
}: {
  label: string;
  placeholder?: string;
  width?: "full" | "half";
  defaultValue?: string;
}) => (
  <div
    className={cn(
      "space-y-1.5",
      width === "full" ? "col-span-1 md:col-span-2" : "col-span-1",
    )}
  >
    <label className="block text-sm font-bold text-primary-dashboard mb-1.5">
      {label}
    </label>
    <div className="relative flex items-center gap-2">
      <input
        className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dashboard-dark text-slate-900 dark:text-white focus:border-primary-dashboard focus:ring-1 focus:ring-primary-dashboard placeholder:text-slate-400 text-sm py-2.5 px-3 transition-all"
        placeholder={placeholder}
        type="text"
        defaultValue={defaultValue}
      />
      <button
        type="button"
        className="flex items-center justify-center size-9 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-primary-dashboard hover:bg-primary-dashboard/10 transition-all shrink-0 border border-slate-200 dark:border-slate-700"
      >
        <Mic className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const TextareaGroup = ({
  label,
  placeholder,
  rows = 3,
}: {
  label: string;
  placeholder?: string;
  rows?: number;
}) => (
  <div className="space-y-1.5 w-full">
    <label className="block text-sm font-bold text-primary-dashboard mb-1.5">
      {label}
    </label>
    <div className="relative w-full">
      <textarea
        className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dashboard-dark text-slate-900 dark:text-white focus:border-primary-dashboard focus:ring-1 focus:ring-primary-dashboard placeholder:text-slate-400 text-sm p-3 resize-none transition-all"
        placeholder={placeholder}
        rows={rows}
      />
      <div className="absolute right-2 bottom-2">
        <button
          type="button"
          className="flex items-center justify-center size-8 rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-primary-dashboard hover:bg-primary-dashboard/10 transition-all border border-slate-200 dark:border-slate-700"
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

export function ManualClerkingForm() {
  const [openSection, setOpenSection] = useState<string>("biodata");

  // Session State
  const [sessionModalOpen, setSessionModalOpen] = useState(true);
  const [patientData, setPatientData] = useState<{
    patientId: string;
    patientName: string;
    patientGender: string;
  } | null>(null);

  const toggle = (id: string) =>
    setOpenSection((prev) => (prev === id ? "" : id));

  const handleSessionStart = (data: {
    patientId: string;
    patientName: string;
    patientGender: string;
  }) => {
    setPatientData(data);
    setSessionModalOpen(false);
  };

  return (
    <div className="w-full">
      <SessionInitModal
        isOpen={sessionModalOpen}
        onStartSession={handleSessionStart}
        onClose={() => {
          /* Optional: Redirect or just allow close if viewing in mock mode */
        }}
      />

      {/* Header Content */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Manual Student-Led Clerking
          </h1>
          <p className="text-slate-500 dark:text-text-dashboard-secondary-dark mt-1 text-sm">
            Complete each section thoroughly. use the microphone icons for
            dictation.
          </p>
        </div>
        {patientData && (
          <div className="flex items-center gap-2 text-xs font-bold text-primary-dashboard bg-primary-dashboard/10 px-3 py-1.5 rounded-full border border-primary-dashboard/20">
            <span className="size-2 rounded-full bg-primary-dashboard animate-pulse"></span>
            ACTIVE SESSION: {patientData.patientId}
          </div>
        )}
      </div>

      {/* Premium Widgets */}
      <DictationCard />
      <VitalsScroll />

      {/* Form Sections (MedPortal Style) */}
      <form className="space-y-6 pb-24">
        {/* 1. Biodata */}
        <div className="bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark/50 rounded-xl overflow-hidden shadow-sm">
          <SectionHead
            icon={CreditCard}
            title="1. Biodata & Demographics"
            isOpen={openSection === "biodata"}
            onToggle={() => toggle("biodata")}
          />
          {openSection === "biodata" && (
            <div className="p-6 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup
                  label="Full Name / Alias"
                  placeholder="Enter patient indentification"
                  width="half"
                  defaultValue={patientData?.patientName}
                />
                <InputGroup
                  label="Age / DOB"
                  placeholder="e.g. 42 years"
                  width="half"
                />
                <div className="space-y-1.5 col-span-1">
                  <label className="block text-sm font-bold text-primary-dashboard mb-1.5">
                    Gender
                  </label>
                  <div className="relative">
                    <select
                      className="w-full rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dashboard-dark text-slate-900 dark:text-white focus:border-primary-dashboard focus:ring-1 focus:ring-primary-dashboard text-sm py-2.5 px-3 transition-all appearance-none"
                      defaultValue={patientData?.patientGender || "Male"}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
                <InputGroup
                  label="Occupation"
                  placeholder="e.g. Software Engineer"
                  width="half"
                />
              </div>
            </div>
          )}
        </div>

        {/* 2. HPC (Includes PC + HPC + System Tags) */}
        <div className="bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark/50 rounded-xl overflow-hidden shadow-sm">
          <SectionHead
            icon={ClipboardList}
            title="2. History of Presenting Complaint"
            isOpen={openSection === "hpc"}
            onToggle={() => toggle("hpc")}
          />
          {openSection === "hpc" && (
            <div className="p-6 space-y-6 animate-in fade-in slide-in-from-top-1 duration-200">
              <TextareaGroup
                label="Presenting Complaint (PC)"
                placeholder="Main symptom(s) x Duration..."
              />
              <TextareaGroup
                label="Detailed HPC (SOCRATES)"
                placeholder="Narrative history..."
                rows={5}
              />

              {/* Tags */}
              <div className="space-y-2">
                <label className="block text-sm font-bold text-primary-dashboard">
                  Associated Symptoms
                </label>
                <div className="flex flex-wrap gap-2">
                  <Tag label="Nausea" />
                  <Tag label="Dizziness" />
                  <Tag label="Shortness of Breath" checked />
                  <Tag label="Fever" />
                  <Tag label="Cough" />
                  <Tag label="Other" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. PMH */}
        <div className="bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark/50 rounded-xl overflow-hidden shadow-sm">
          <SectionHead
            icon={History}
            title="3. Past Medical History (PMH)"
            isOpen={openSection === "pmh"}
            onToggle={() => toggle("pmh")}
          />
          {openSection === "pmh" && (
            <div className="p-6 space-y-6 animate-in fade-in slide-in-from-top-1 duration-200">
              <TextareaGroup
                label="Chronic Conditions & Previous Admissions"
                placeholder="DM, HTN, Asthma, Previous Surgeries..."
                rows={4}
              />
            </div>
          )}
        </div>

        {/* 4. Drug & Allergy */}
        <div className="bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark/50 rounded-xl overflow-hidden shadow-sm">
          <SectionHead
            icon={Pill}
            title="4. Drug & Allergy History"
            isOpen={openSection === "drug"}
            onToggle={() => toggle("drug")}
          />
          {openSection === "drug" && (
            <div className="p-6 animate-in fade-in slide-in-from-top-1 duration-200 space-y-4">
              <InputGroup
                label="Current Medications"
                placeholder="List all current meds..."
              />
              <div className="space-y-1.5 w-full">
                <label className="block text-sm font-bold text-red-500 mb-1.5">
                  Allergies
                </label>
                <input
                  className="w-full rounded-lg border-red-200 bg-red-50 dark:bg-red-900/10 text-red-700 dark:text-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500 placeholder:text-red-300 text-sm py-2.5 px-3 transition-all"
                  placeholder="NKA if none"
                  type="text"
                />
              </div>
            </div>
          )}
        </div>

        {/* 5. Family & Social */}
        <div className="bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark/50 rounded-xl overflow-hidden shadow-sm">
          <SectionHead
            icon={Users}
            title="5. Family & Social History"
            isOpen={openSection === "social"}
            onToggle={() => toggle("social")}
          />
          {openSection === "social" && (
            <div className="p-6 animate-in fade-in slide-in-from-top-1 duration-200">
              <TextareaGroup
                label="Family Details"
                placeholder="Family structure, socioeconomic status, similar illnesses..."
              />
            </div>
          )}
        </div>

        {/* 6. Birth History (Paediatric) */}
        <div className="bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark/50 rounded-xl overflow-hidden shadow-sm">
          <SectionHead
            icon={Baby}
            title="6. Birth History (Paeds)"
            isOpen={openSection === "birth"}
            onToggle={() => toggle("birth")}
          />
          {openSection === "birth" && (
            <div className="p-6 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <InputGroup
                  label="Gestation"
                  placeholder="e.g. Term (38 weeks)"
                  width="half"
                />
                <InputGroup
                  label="Delivery Mode"
                  placeholder="e.g. SVD"
                  width="half"
                />
              </div>
              <TextareaGroup
                label="Post-natal Events"
                placeholder="NICU admission, cry at birth, cyanosis..."
              />
            </div>
          )}
        </div>

        {/* 7. Nutritional History */}
        <div className="bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark/50 rounded-xl overflow-hidden shadow-sm">
          <SectionHead
            icon={Utensils}
            title="7. Nutritional History (Paeds)"
            isOpen={openSection === "nutrition"}
            onToggle={() => toggle("nutrition")}
          />
          {openSection === "nutrition" && (
            <div className="p-6 animate-in fade-in slide-in-from-top-1 duration-200">
              <TextareaGroup
                label="Dietary Details"
                placeholder="Breastfeeding, weaning age, current diet..."
              />
            </div>
          )}
        </div>

        {/* 8. Immunization */}
        <div className="bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark/50 rounded-xl overflow-hidden shadow-sm">
          <SectionHead
            icon={Syringe}
            title="8. Immunization History (Paeds)"
            isOpen={openSection === "immunization"}
            onToggle={() => toggle("immunization")}
          />
          {openSection === "immunization" && (
            <div className="p-6 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="flex items-center justify-between mb-4 p-4 bg-slate-50 dark:bg-black/20 rounded-lg">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Up to date for age?
                </label>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="relative w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-dashboard"></div>
                  <span className="ms-3 text-sm font-medium text-slate-900 dark:text-gray-300">
                    Yes
                  </span>
                </label>
              </div>
              <InputGroup
                label="Missed Vaccines"
                placeholder="Specify if any..."
              />
            </div>
          )}
        </div>

        {/* 9. Developmental Milestones */}
        <div className="bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark/50 rounded-xl overflow-hidden shadow-sm">
          <SectionHead
            icon={Puzzle}
            title="9. Developmental Milestones (Paeds)"
            isOpen={openSection === "milestones"}
            onToggle={() => toggle("milestones")}
          />
          {openSection === "milestones" && (
            <div className="p-6 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup
                  label="Gross Motor"
                  placeholder="e.g. Walks alone"
                  width="half"
                />
                <InputGroup
                  label="Fine Motor"
                  placeholder="e.g. Pincer grasp"
                  width="half"
                />
                <InputGroup
                  label="Social"
                  placeholder="e.g. Waves bye-bye"
                  width="half"
                />
                <InputGroup
                  label="Language"
                  placeholder="e.g. 2 word sentences"
                  width="half"
                />
              </div>
            </div>
          )}
        </div>

        {/* 10. ROS */}
        <div className="bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark/50 rounded-xl overflow-hidden shadow-sm">
          <SectionHead
            icon={Stethoscope}
            title="10. Review of Systems (ROS)"
            isOpen={openSection === "ros"}
            onToggle={() => toggle("ros")}
          />
          {openSection === "ros" && (
            <div className="p-6 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="grid grid-cols-1 gap-4">
                {/* Example simplified for brevity, user can scroll mic/input for each */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-surface-dashboard-dark border border-slate-100 dark:border-slate-800">
                  <div className="flex-1">
                    <span className="text-sm font-bold text-primary-dashboard">
                      General/Constitutional
                    </span>
                    <p className="text-xs text-slate-500">
                      Fever, weight loss, night sweats, fatigue
                    </p>
                  </div>
                  <div className="w-full md:w-1/2">
                    <input
                      className="w-full text-sm bg-white dark:bg-black/20 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2"
                      placeholder="Record findings..."
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-surface-dashboard-dark border border-slate-100 dark:border-slate-800">
                  <div className="flex-1">
                    <span className="text-sm font-bold text-primary-dashboard">
                      Cardiovascular
                    </span>
                    <p className="text-xs text-slate-500">
                      Chest pain, palpitations, orthopnea
                    </p>
                  </div>
                  <div className="w-full md:w-1/2">
                    <input
                      className="w-full text-sm bg-white dark:bg-black/20 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2"
                      placeholder="Record findings..."
                    />
                  </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-surface-dashboard-dark border border-slate-100 dark:border-slate-800">
                  <div className="flex-1">
                    <span className="text-sm font-bold text-primary-dashboard">
                      Respiratory
                    </span>
                    <p className="text-xs text-slate-500">
                      Cough, SOB, wheeze, hemoptysis
                    </p>
                  </div>
                  <div className="w-full md:w-1/2">
                    <input
                      className="w-full text-sm bg-white dark:bg-black/20 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2"
                      placeholder="Record findings..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 11. Additional Notes */}
        <div className="bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark/50 rounded-xl overflow-hidden shadow-sm">
          <SectionHead
            icon={ClipboardList}
            title="11. Additional Notes / Observations"
            isOpen={openSection === "additional"}
            onToggle={() => toggle("additional")}
          />
          {openSection === "additional" && (
            <div className="p-6 animate-in fade-in slide-in-from-top-1 duration-200">
              <TextareaGroup
                label="Any other findings, sketches, or summary"
                placeholder="Enter any extra information not covered above..."
                rows={5}
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-4 z-40 mx-auto w-full max-w-4xl">
          <div className="flex items-center justify-between p-4 bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-card-dashboard-dark/50 rounded-2xl shadow-xl">
            <div className="flex items-center gap-2 text-slate-500 dark:text-text-dashboard-secondary-dark text-sm">
              <Info className="w-4 h-4 text-primary-dashboard" />
              <span className="hidden md:inline">
                Progress auto-saved at 14:32
              </span>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                className="px-5 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors text-sm"
              >
                Save Progress
              </button>
              <button
                type="button"
                className="px-6 py-2.5 bg-primary-dashboard hover:bg-primary-dashboard-hover text-white font-bold rounded-xl shadow-lg shadow-primary-dashboard/20 transition-all flex items-center gap-2 text-sm"
              >
                Complete
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
