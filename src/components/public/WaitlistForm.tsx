"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Mail,
  Loader2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useJoinWaitlist } from "@/lib/hooks/usePublic";
import { toast } from "sonner";
import { cn } from "@/lib/cn";

const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid work email address"),
});

type WaitlistValues = z.infer<typeof waitlistSchema>;

export function WaitlistForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: joinWaitlist, isPending } = useJoinWaitlist();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WaitlistValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: WaitlistValues) => {
    joinWaitlist(
      { email: data.email },
      {
        onSuccess: (response) => {
          setIsSuccess(true);
          toast.success(response.message || "Welcome to the waitlist!");
          reset();
        },
        onError: (error: Error) => {
          toast.error(
            error.message || "Something went wrong. Please try again.",
          );
        },
      },
    );
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-500">
        <div className="size-20 bg-primary-dashboard/10 rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-primary-dashboard/20 border border-primary-dashboard/20">
          <CheckCircle2 className="w-10 h-10 text-primary-dashboard" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-3">
          You're on the list!
        </h3>
        <p className="text-slate-500 dark:text-text-dashboard-secondary-dark max-w-sm font-medium leading-relaxed">
          We've reserved your spot. Watch your inbox for a special invitation to
          EyrieCare's early access.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-8 text-sm font-black text-primary-dashboard hover:underline uppercase tracking-widest"
        >
          Add another email
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto p-1 bg-linear-to-br from-primary-dashboard/20 to-primary-dashboard/5 rounded-[2.5rem] shadow-3xl dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10">
      <div className="bg-white/90 dark:bg-surface-dark/90 backdrop-blur-xl p-8 md:p-12 rounded-[2.4rem] border border-white/40 shadow-inner">
        <div className="flex items-center gap-2 mb-6">
          <div className="px-3 py-1 bg-primary-dashboard/10 border border-primary-dashboard/20 rounded-full flex items-center gap-1.5 transition-transform hover:scale-105 cursor-default">
            <Sparkles className="w-3.5 h-3.5 text-primary-dashboard" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary-dashboard">
              Coming Soon
            </span>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-black text-text-main dark:text-white tracking-tighter leading-none mb-4">
          The future of <br />
          <span className="text-primary-dashboard">Clinical Workflow</span>
        </h2>

        <p className="text-slate-500 dark:text-text-dashboard-secondary-dark text-sm md:text-base font-medium mb-8 leading-relaxed">
          Join 800+ healthcare professionals awaiting the precision of
          EyrieCare's AI-assisted ecosystem. Private beta access starting soon.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative group">
            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none transition-colors group-focus-within:text-primary-dashboard text-slate-400">
              <Mail className="w-5 h-5" />
            </div>
            <input
              type="email"
              {...register("email")}
              placeholder="work@hospital.com"
              disabled={isPending}
              className={cn(
                "w-full pl-14 pr-6 py-5 bg-slate-50 dark:bg-black/40 border-2 rounded-2xl outline-none transition-all font-bold text-text-main dark:text-white",
                errors.email
                  ? "border-red-500/50 bg-red-50/50 dark:bg-red-500/5"
                  : "border-slate-100 dark:border-background-dark focus:border-primary-dashboard/50 focus:ring-4 focus:ring-primary-dashboard/10 shadow-sm",
              )}
            />
            {errors.email && (
              <p className="mt-2 text-xs font-black text-red-500 uppercase tracking-widest ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-5 bg-primary-dashboard text-text-main font-black rounded-2xl hover:bg-primary-dashboard-hover transition-all duration-300 shadow-2xl shadow-primary-dashboard/30 flex items-center justify-center gap-3 group active:scale-[0.98] disabled:opacity-50"
          >
            {isPending ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                Join Exclusive Beta
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-[11px] text-slate-400 dark:text-slate-600 font-medium text-center italic">
          No credit card required. Guaranteed privacy compliance.
        </p>
      </div>
    </div>
  );
}
