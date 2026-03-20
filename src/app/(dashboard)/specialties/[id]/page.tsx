"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronRight, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SpecialtyHub } from "@/components/specialties";
import { useSpecialty } from "@/lib/hooks/useSpecialties";

export default function SpecialtyHubPage() {
  const params = useParams();
  const router = useRouter();
  const specId = params.id as string;

  const { data: specialtyResponse, isLoading, isError } = useSpecialty(specId);
  const specialty = specialtyResponse?.data;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-20 gap-4 text-center">
        <Loader2 className="w-10 h-10 text-primary-dashboard animate-spin" />
        <p className="text-lg font-bold text-slate-900 dark:text-white">
          Fetching specialty hub details...
        </p>
      </div>
    );
  }

  if (isError || !specialty) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center gap-6">
        <div className="size-16 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center text-red-500">
          <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Specialty not found
          </h1>
          <p className="text-slate-500 max-w-xs mx-auto">
            The specialty you are looking for might have been removed or
            renamed.
          </p>
        </div>
        <Button
          variant="outline"
          className="rounded-xl px-8"
          onClick={() => router.push("/specialties")}
        >
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
            {specialty?.name}
          </span>
        </nav>

        <SpecialtyHub specialty={specialty} />
      </div>
    </div>
  );
}
