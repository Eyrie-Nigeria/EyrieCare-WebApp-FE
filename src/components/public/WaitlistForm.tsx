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
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["student", "doctor"], {
    error: "Please select your role",
  }),
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
      role: undefined,
    },
  });

  const onSubmit = (data: WaitlistValues) => {
    joinWaitlist(
      {
        email: data.email,
        role: data.role,
      },
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
          You&apos;re on the list!
        </h3>
        <p className="text-slate-500 dark:text-text-dashboard-secondary-dark max-w-sm font-medium leading-relaxed">
          We&apos;ve reserved your spot. Watch your inbox for a special
          invitation to EyrieCare&apos;s early access.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-8 text-sm font-black text-primary-dashboard hover:underline uppercase tracking-widest"
        >
          Add another entry
        </button>
      </div>
    );
  }

  const inputBase =
    "w-full px-4 py-4 bg-slate-50 dark:bg-black/40 border-2 rounded-2xl outline-none transition-all font-semibold text-text-main dark:text-white text-sm";
  const inputIdle =
    "border-slate-100 dark:border-background-dark focus:border-primary-dashboard/50 focus:ring-4 focus:ring-primary-dashboard/10 shadow-sm";
  const inputError = "border-red-500/50 bg-red-50/50 dark:bg-red-500/5";

  return (
    <div className="w-full max-w-lg mx-auto p-1 bg-linear-to-br from-primary-dashboard/20 to-primary-dashboard/5 rounded-[2.5rem] shadow-3xl dark:bg-white/5 ring-1 ring-black/5 dark:ring-white/10">
      <div className="bg-white/90 dark:bg-surface-dark/90 backdrop-blur-xl p-8 md:p-10 rounded-[2.4rem] border border-white/40 shadow-inner">
        {/* Badge */}
        <div className="flex items-center gap-2 mb-5">
          <div className="px-3 py-1 bg-primary-dashboard/10 border border-primary-dashboard/20 rounded-full flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary-dashboard" />
            <span className="text-[10px] font-black uppercase tracking-widest text-primary-dashboard">
              Early Access
            </span>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-black text-text-main dark:text-white tracking-tighter leading-none mb-2">
          Join the waitlist
        </h2>
        <p className="text-slate-500 dark:text-text-dashboard-secondary-dark text-sm font-medium mb-7 leading-relaxed">
          800+ healthcare students &amp; professionals are already signed up.
          Secure your early access today.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-dashboard transition-colors">
              <Mail className="w-4.5 h-4.5" />
            </div>
            <input
              {...register("email")}
              type="email"
              placeholder="work@hospital.com"
              disabled={isPending}
              className={cn(
                inputBase,
                "pl-11",
                errors.email ? inputError : inputIdle,
              )}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs font-bold text-red-500 ml-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Role: Student or Doctor */}
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 px-1">
              I am a...
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "student", label: "Medical Student" },
                { value: "doctor", label: "Doctor" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={cn(
                    "flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl border-2 cursor-pointer transition-all text-sm font-bold",
                    "border-slate-100 dark:border-background-dark",
                    "has-[:checked]:border-primary-dashboard has-[:checked]:bg-primary-dashboard/10 has-[:checked]:text-primary-dashboard",
                    "text-slate-500 dark:text-slate-400",
                  )}
                >
                  <input
                    {...register("role")}
                    type="radio"
                    value={opt.value}
                    className="sr-only"
                    disabled={isPending}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            {errors.role && (
              <p className="text-xs font-bold text-red-500 ml-1">
                {errors.role.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-4 bg-primary-dashboard text-text-main font-black rounded-2xl hover:bg-primary-dashboard-hover transition-all duration-300 shadow-2xl shadow-primary-dashboard/30 flex items-center justify-center gap-3 group active:scale-[0.98] disabled:opacity-50 mt-2"
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

        <p className="mt-6 text-[11px] text-slate-400 dark:text-slate-600 font-medium text-center italic">
          No credit card required. Guaranteed privacy compliance.
        </p>
      </div>
    </div>
  );
}
