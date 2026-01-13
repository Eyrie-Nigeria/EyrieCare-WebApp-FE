"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { SPECIALTIES } from "@/lib/data/specialties";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SpecialtyHub } from "@/components/specialties";

export default function SpecialtyHubPage() {
  const params = useParams();
  const router = useRouter();
  const specId = params.id as string;

  const specialty = SPECIALTIES.find((s) => s.id === specId);

  if (!specialty) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <h1 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
          Specialty not found
        </h1>
        <Button onClick={() => router.push("/specialties")}>
          Back to Specialties
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pb-20">
      {/* Header with Breadcrumbs */}
      <div className="flex flex-col gap-6">
        <nav className="flex items-center gap-2 text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all">
          <Link
            href="/dashboard"
            className="text-slate-400 hover:text-primary-dashboard transition-colors"
          >
            Dashboard
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <Link
            href="/specialties"
            className="text-slate-400 hover:text-primary-dashboard transition-colors"
          >
            Specialties
          </Link>
          <ChevronRight className="w-3 h-3 text-slate-300" />
          <span className="text-slate-900 dark:text-white">
            {specialty.name}
          </span>
        </nav>

        <SpecialtyHub specialty={specialty} />
      </div>
    </div>
  );
}
