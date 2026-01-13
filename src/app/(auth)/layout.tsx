"use client";

import { motion } from "framer-motion";
import { Stethoscope } from "lucide-react";
import { AuthBranding } from "@/components/auth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-row bg-background-light dark:bg-background-auth-deep transition-colors duration-200">
      <AuthBranding />

      <div className="flex flex-1 flex-col items-center justify-center p-6 sm:p-12 lg:p-24 overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-[440px] flex flex-col gap-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-lg bg-primary-auth flex items-center justify-center text-background-auth-deep">
              <Stethoscope className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-text-main dark:text-white">
              EyrieCare
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
