"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  Plus,
  History,
  BookOpen,
  BarChart3,
  Stethoscope,
  ChevronLeft,
  FileText,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { Specialty } from "@/lib/types/specialties";

interface SpecialtyHubProps {
  specialty: Specialty;
}

export function SpecialtyHub({ specialty }: SpecialtyHubProps) {
  const router = useRouter();

  const progress = specialty.progress ?? 0;
  const activeCases = specialty.activeCases ?? 0;

  return (
    <div className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div
            className={cn(
              "size-12 md:size-14 rounded-2xl flex items-center justify-center shadow-lg border border-white/10 shrink-0 overflow-hidden",
              "bg-primary-dashboard/10 text-primary-dashboard",
            )}
          >
            {specialty.image_url ? (
              <img
                src={specialty.image_url}
                alt={specialty.name}
                className="w-full h-full object-cover p-1"
              />
            ) : (
              <Stethoscope className="w-6 h-6 md:w-7 h-7" />
            )}
          </div>
          <div>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {specialty.name}{" "}
              <span className="text-primary-dashboard">Hub</span>
            </h1>
            <p className="text-slate-500 dark:text-text-dashboard-secondary-dark text-xs md:text-sm font-medium opacity-80">
              {activeCases} Clinical Encounters • {progress}% Logged
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="rounded-xl h-11 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 dark:text-white"
            onClick={() => router.push("/specialties")}
          >
            <ChevronLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Link href={`/clerk?specialty=${specialty.id}`}>
            <Button
              variant="dashboard"
              className="rounded-xl h-11 md:h-12 px-6 shadow-lg shadow-primary-dashboard/20 font-bold"
            >
              <Plus className="w-4 h-4 mr-2" /> Start New Clerkship
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Actions and Stats */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Clerk Now Action - PREMIUM FINISH */}
            <Link href={`/clerk?specialty=${specialty.id}`} className="group">
              <Card className="p-7 !bg-primary-dashboard !text-white relative overflow-hidden h-full border-none shadow-xl shadow-primary-dashboard/10 group-hover:-translate-y-1 transition-all duration-300">
                <div className="absolute -right-6 -top-6 opacity-20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Stethoscope className="w-32 h-32 !text-white" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="size-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                    <Plus className="w-6 h-6 !text-white" />
                  </div>
                  <h3 className="text-2xl font-black mb-1 !text-white">
                    Clerk Now
                  </h3>
                  <p className="!text-white font-bold text-sm mb-8 opacity-90">
                    Document a new patient encounter in {specialty.name}.
                  </p>
                  <div className="mt-auto flex items-center gap-2 font-black text-xs uppercase tracking-widest bg-white/10 self-start px-4 py-2 rounded-lg group-hover:bg-white/20 transition-colors !text-white">
                    Launch Clerkship{" "}
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform !text-white" />
                  </div>
                </div>
              </Card>
            </Link>

            <Link href={`/saved?specialty=${specialty.id}`} className="group">
              <Card className="p-7 bg-white dark:bg-card-dashboard-dark border-slate-200 dark:border-white/5 relative overflow-hidden h-full group-hover:border-primary-dashboard/30 transition-all duration-300 group-hover:-translate-y-1 shadow-sm">
                <History className="w-8 h-8 text-primary-dashboard mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                  Case Library
                </h3>
                <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-8 opacity-80">
                  Review and study your documented {activeCases} records.
                </p>
                <div className="mt-auto flex items-center gap-2 font-black text-xs uppercase tracking-widest text-primary-dashboard">
                  Open Library{" "}
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          </div>

          <Card className="p-8 bg-white dark:bg-card-dashboard-dark border-slate-200 dark:border-white/5 flex flex-col gap-8 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-primary-dashboard" />
                Rotation Analytics
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Rotation Progress
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-primary-dashboard">
                    {progress}
                  </span>
                  <span className="text-lg font-black text-slate-400">%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-primary-dashboard h-full rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Cases Logged
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">
                    {activeCases}
                  </span>
                  <span className="text-sm font-bold text-slate-400">/ 20</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Avg. Success
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">
                    94
                  </span>
                  <span className="text-lg font-black text-slate-400">%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Resources */}
        <div className="flex flex-col gap-6">
          <Card className="p-6 bg-white dark:bg-card-dashboard-dark border-slate-200 dark:border-white/5 flex flex-col gap-6 shadow-sm">
            <div className="flex items-center gap-3 text-primary-dashboard">
              <div className="p-2 rounded-lg bg-primary-dashboard/10">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-black text-slate-900 dark:text-white">
                Medical Resources
              </h3>
            </div>
            <div className="space-y-2">
              {specialty.resources && specialty.resources.length > 0 ? (
                specialty.resources.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all cursor-pointer group border border-transparent hover:border-slate-200 dark:hover:border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      {resource.url.endsWith(".pdf") ? (
                        <FileText className="w-4 h-4 text-slate-400 group-hover:text-primary-dashboard" />
                      ) : (
                        <LinkIcon className="w-4 h-4 text-slate-400 group-hover:text-primary-dashboard" />
                      )}
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-primary-dashboard">
                        {resource.title}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary-dashboard group-hover:translate-x-0.5 transition-all" />
                  </a>
                ))
              ) : (
                <p className="text-xs font-medium text-slate-400 italic py-4 text-center">
                  No resources available for this specialty.
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              className="w-full h-11 rounded-xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-primary-dashboard transition-colors mt-2"
            >
              View Entire Library
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
