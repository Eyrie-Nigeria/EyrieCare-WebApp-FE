"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import { SpecialtyCardProps } from "./types";

export function SpecialtyCard({ specialty, index }: SpecialtyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="h-full"
    >
      <Link
        href={`/specialties/${specialty.id}`}
        className="block h-full group"
      >
        <Card className="p-4 md:p-6 h-full flex flex-col items-center text-center transition-all duration-500 hover:border-primary-dashboard hover:shadow-2xl hover:shadow-primary-dashboard/10 relative overflow-hidden bg-white dark:bg-card-dashboard-dark border-slate-200 dark:border-white/10 rounded-[2rem] md:rounded-[2.5rem] group-hover:-translate-y-2">
          {/* Background Pattern Element */}
          <div
            className={cn(
              "absolute -top-12 -right-12 size-24 md:size-32 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-all duration-700",
              specialty.bg,
            )}
          />

          <div
            className={cn(
              "size-14 md:size-18 rounded-2xl flex items-center justify-center mb-5 transition-all duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-xl shadow-slate-200/50 dark:shadow-none",
              specialty.bg,
              specialty.color,
            )}
          >
            <specialty.icon className="w-7 h-7 md:w-9 md:h-9" />
          </div>

          <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-1.5 tracking-tight group-hover:text-primary-dashboard transition-colors duration-300 min-h-[3.5rem] flex items-center justify-center">
            {specialty.name}
          </h3>

          <div className="flex items-center gap-2 mb-5">
            <div className={cn("size-2 rounded-full", specialty.statusColor)} />
            <span className="text-[10px] md:text-xs font-bold text-slate-600 dark:text-text-dashboard-secondary-dark uppercase tracking-widest leading-none">
              {specialty.activeCases} {specialty.statusText}
            </span>
          </div>

          {/* Progress Section */}
          <div className="w-full mt-auto pt-5 border-t border-slate-100 dark:border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Progress
              </span>
              <span className="text-[9px] md:text-[10px] font-bold text-primary-dashboard">
                {specialty.progress}%
              </span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-white/5 h-1.5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${specialty.progress}%` }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                className={cn(
                  "h-full rounded-full transition-all",
                  specialty.progress === 100
                    ? "bg-primary-dashboard"
                    : "bg-primary-dashboard/60",
                )}
              />
            </div>
          </div>

          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1 duration-300">
            <ChevronRight className="w-5 h-5 text-primary-dashboard" />
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}
