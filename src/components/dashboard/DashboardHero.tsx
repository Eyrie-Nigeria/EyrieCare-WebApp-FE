"use client";

import { motion } from "framer-motion";

export default function DashboardHero() {
  return (
    <section className="w-full">
      <div
        className="bg-cover bg-center flex flex-col justify-end overflow-hidden rounded-2xl min-h-45 md:min-h-55 shadow-lg relative group transition-transform duration-500 hover:scale-[1.01]"
        style={{
          backgroundImage:
            'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDN9ez_T7r8Am6QCgGmCDJj6Ghw5EHjMH4ECM-_wcqt0ZcLFCtHyj6v8bhy-VdClN3KVFSgLxiV9ZjtKqFCY-HeaplHiOuk2HLCb2tB6-KEt25BYRChYJBNgnWoOjAu6E8NwVVOIHFwyVK_IH7lNRpF4qeOjIwmHE_jPS7ZuDiDaDZHd_o8oJBwQxuz1tslAv9kFQx6lZ3M3ESECUzRyfY8Bct2Y98sOXuCdY7hQBbub-6_jkbd_eYOJngdXIt_Ww9tCx4NhPOPAdc")',
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex flex-col p-6 md:p-10 z-10"
        >
          <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-2 tracking-tight">
            Welcome back, Dr. Smith
          </h2>
          <p className="text-slate-200 text-base md:text-lg font-medium opacity-90">
            You have 3 pending cases to review today.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
