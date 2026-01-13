"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export function StatsSection() {
  const institutions = [
    "Stanford Medicine",
    "Johns Hopkins",
    "Harvard Medical",
    "UCSF",
  ];

  return (
    <div className="w-full border-y border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
      <div className="layout-container py-8">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
        >
          {institutions.map((institution) => (
            <motion.span
              key={institution}
              variants={fadeInUp}
              className="text-lg font-bold text-text-main dark:text-white"
            >
              {institution}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
