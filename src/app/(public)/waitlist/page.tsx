"use client";

import { WaitlistForm } from "@/components/public/WaitlistForm";
import { Stethoscope } from "lucide-react";

export default function WaitlistPage() {
  return (
    <main className="min-h-screen relative flex items-center justify-center p-6 bg-background overflow-hidden">
      {/* Premium Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-dashboard/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-teal-500/10 rounded-full blur-[120px]" />

        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        {/* Logo Branding - Placeholder or can use actual logo if available */}
        <div className="mb-12 flex items-center gap-3 hover:scale-105 transition-transform cursor-pointer">
          <div className="size-12 bg-primary-dashboard rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-dashboard/30 rotate-3 text-text-main">
            <Stethoscope className="w-7 h-7" />
          </div>
          <span className="text-2xl font-black tracking-tighter text-text-main dark:text-white leading-none">
            Eyrie<span className="text-primary-dashboard">Care</span>
          </span>
        </div>

        <WaitlistForm />

        {/* Footer Navigation or Links */}
        <div className="mt-16 flex items-center gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-600">
          <a
            href="#"
            className="hover:text-primary-dashboard transition-colors"
          >
            Twitter (X)
          </a>
          <span className="size-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
          <a
            href="#"
            className="hover:text-primary-dashboard transition-colors"
          >
            LinkedIn
          </a>
          <span className="size-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
          <a
            href="#"
            className="hover:text-primary-dashboard transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </main>
  );
}
