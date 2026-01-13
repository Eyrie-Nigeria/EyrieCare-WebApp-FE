"use client";

import { useState } from "react";
import { User, ArrowRight, ShieldCheck, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import { SPECIALTIES } from "@/lib/data/specialties";

interface SessionInitModalProps {
  isOpen: boolean;
  onStartSession: (data: {
    patientId: string;
    patientName: string;
    patientGender: string;
    specialty: string;
  }) => void;
  onClose: () => void;
}

export function SessionInitModal({
  isOpen,
  onStartSession,
  onClose,
}: SessionInitModalProps) {
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientGender, setPatientGender] = useState("Male");
  const [specialty, setSpecialty] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (patientId.trim()) {
      onStartSession({ patientId, patientName, patientGender, specialty });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-card-dashboard-dark rounded-3xl shadow-2xl p-5 md:p-6 animate-in zoom-in-95 duration-200 border border-slate-200 dark:border-card-dashboard-dark/50 max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Close Button (Redirects back to clerk menu usually, or just closes) */}
        <Link href="/clerk">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </Link>

        <div className="flex flex-col items-center text-center mb-5">
          <div className="size-12 rounded-2xl bg-primary-dashboard/10 flex items-center justify-center text-primary-dashboard mb-3">
            <User className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
            New Clerking Session
          </h2>
          <p className="text-slate-500 dark:text-text-dashboard-secondary-dark text-xs leading-relaxed max-w-xs">
            Enter patient details to initialize the manual clerking form. This
            ensures all data is correctly tagged.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
              Patient ID / Hospital No. <span className="text-red-500">*</span>
            </label>
            <input
              required
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
              className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-surface-dashboard-dark text-slate-900 dark:text-white focus:border-primary-dashboard focus:ring-2 focus:ring-primary-dashboard/20 p-3 text-sm font-medium transition-all placeholder:text-slate-400"
              placeholder="e.g. EYR-2023-001"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
              Patient Name{" "}
              <span className="text-[10px] font-normal text-slate-400">
                (Optional)
              </span>
            </label>
            <input
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-surface-dashboard-dark text-slate-900 dark:text-white focus:border-primary-dashboard focus:ring-2 focus:ring-primary-dashboard/20 p-3 text-sm font-medium transition-all placeholder:text-slate-400"
              placeholder="Full Name"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
              Attending Physician / Supervisor{" "}
              <span className="text-[10px] font-normal text-slate-400">
                (Optional)
              </span>
            </label>
            <input
              className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-surface-dashboard-dark text-slate-900 dark:text-white focus:border-primary-dashboard focus:ring-2 focus:ring-primary-dashboard/20 p-3 text-sm font-medium transition-all placeholder:text-slate-400"
              placeholder="Dr. Name"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
              Clinical Specialty <span className="text-red-500">*</span>
            </label>
            <div className="relative group/select">
              <select
                required
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full rounded-xl border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-surface-dashboard-dark text-slate-900 dark:text-white focus:border-primary-dashboard focus:ring-2 focus:ring-primary-dashboard/20 p-3 pr-10 text-sm font-medium transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled>
                  Select Specialty...
                </option>
                {SPECIALTIES.map((spec) => (
                  <option key={spec.id} value={spec.id}>
                    {spec.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover/select:text-primary-dashboard transition-colors">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
              Gender
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["Male", "Female"].map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setPatientGender(g)}
                  className={`py-2.5 rounded-xl border font-bold text-xs transition-all ${patientGender === g ? "border-primary-dashboard bg-primary-dashboard/5 text-primary-dashboard" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-surface-dashboard-dark text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5"}`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!patientId.trim() || !specialty}
            className="w-full py-3 bg-primary-dashboard hover:bg-primary-dashboard-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base rounded-2xl shadow-lg shadow-primary-dashboard/20 transition-all mt-2 flex items-center justify-center gap-2"
          >
            Start Session
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 flex justify-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-[10px] font-medium text-slate-500 dark:text-slate-400">
            <ShieldCheck className="w-3 h-3" />
            <span>HIPAA Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}
