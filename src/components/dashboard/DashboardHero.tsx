"use client";

import { motion } from "framer-motion";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Activity } from "lucide-react";

export function DashboardHero() {
  const user = useAuthStore((state) => state.user);
  const userName = user?.email?.split("@")[0] || "Authenticated Professional";

  return (
    <section className="w-full">
      <div className="bg-linear-to-br from-primary-dashboard via-primary-dashboard/90 to-blue-600 flex flex-col justify-end overflow-hidden rounded-2xl min-h-45 md:min-h-55 shadow-lg relative group transition-transform duration-500 hover:scale-[1.01]">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
          <Activity className="w-48 h-48 -mr-16 -mt-16 rotate-12" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col p-6 md:p-10 z-10"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="size-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-white/80 text-xs font-bold uppercase tracking-widest">
              Active System Observer
            </span>
          </div>
          <h2 className="text-white text-3xl md:text-5xl font-black leading-tight mb-2 tracking-tight capitalize">
            Welcome back, {userName}
          </h2>
          <p className="text-white/80 text-base md:text-xl font-medium opacity-90 max-w-lg">
            Monitor your organization&apos;s reach and manage professional
            assignments from your central hub.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
