"use client";

import {
  X,
  Baby,
  Stethoscope,
  Scissors,
  HeartPulse,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { SpecialtyModalProps } from "./types";

const SPECIALTIES = [
  {
    id: "pediatrics",
    name: "Paediatrics",
    icon: Baby,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    desc: "Child health, growth & development",
  },
  {
    id: "medicine",
    name: "Internal Medicine",
    icon: Stethoscope,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    desc: "Adult diseases, diagnosis & treatment",
  },
  {
    id: "surgery",
    name: "General Surgery",
    icon: Scissors,
    color: "text-red-500",
    bg: "bg-red-500/10",
    desc: "Surgical procedures & intervention",
  },
  {
    id: "obgyn",
    name: "Obstetrics & Gynaecology",
    icon: HeartPulse,
    color: "text-pink-500",
    bg: "bg-pink-500/10",
    desc: "Maternal health & reproduction",
  },
];

export default function SpecialtyModal({
  isOpen,
  onClose,
}: SpecialtyModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white dark:bg-card-dashboard-dark w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 dark:border-card-dashboard-dark/50 overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-card-dashboard-dark/50">
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Select Specialty
            </h3>
            <p className="text-sm text-slate-500 dark:text-text-dashboard-secondary-dark mt-1">
              Choose a template to start your AI session
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-4 space-y-2">
          {SPECIALTIES.map((spec) => (
            <Link
              key={spec.id}
              href={`/clerk/ai?specialty=${spec.id}`}
              className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all group border border-transparent hover:border-slate-200 dark:hover:border-white/10"
            >
              <div
                className={cn(
                  "size-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                  spec.bg,
                  spec.color,
                )}
              >
                <spec.icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 dark:text-white group-hover:text-primary-dashboard transition-colors">
                  {spec.name}
                </h4>
                <p className="text-xs text-slate-500 dark:text-text-dashboard-secondary-dark">
                  {spec.desc}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-primary-dashboard transform group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
