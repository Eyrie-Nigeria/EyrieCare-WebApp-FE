"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Mail,
  User,
  Loader2,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ChevronDown,
  GraduationCap,
} from "lucide-react";
import { useJoinWaitlist } from "@/lib/hooks/usePublic";
import { toast } from "sonner";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence } from "framer-motion";

const COURSES = [
  "Medicine & Surgery",
  "Dentistry",
  "Nursing",
  "Pharmacy",
  "Medical Laboratory Science",
  "Anatomy",
  "Physiology",
  "Biochemistry",
  "Public Health",
  "Other",
];

const STUDY_LEVELS = [
  "Pre-clinical (Year 1–2)",
  "Clinical (Year 3–5)",
  "Final Year / Electives",
  "House Officer / Intern",
  "Resident Doctor",
  "Consultant / Specialist",
  "Lecturer / Academic",
];

const waitlistSchema = z
  .object({
    fullName: z.string().min(2, "Please enter your full name"),
    email: z.string().email("Please enter a valid email address"),
    isStudent: z.enum(["yes", "no", "other"]).optional(),
    courseOfStudy: z.string().optional(),
    specificCourse: z.string().optional(),
    yearOfStudy: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.isStudent) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select your role",
        path: ["isStudent"],
      });
    }
    const isMedical = data.isStudent === "yes" || data.isStudent === "no";
    if (isMedical && !data.courseOfStudy?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please select a course or specialty",
        path: ["courseOfStudy"],
      });
    }
    if (data.courseOfStudy === "Other" && !data.specificCourse?.trim()) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please specify your course",
        path: ["specificCourse"],
      });
    }
  });

type WaitlistValues = z.infer<typeof waitlistSchema>;

export function WaitlistForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { mutate: joinWaitlist, isPending } = useJoinWaitlist();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<WaitlistValues>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      fullName: "",
      email: "",
      isStudent: undefined,
      courseOfStudy: "",
      specificCourse: "",
      yearOfStudy: "",
    },
  });

  const courseOfStudy = useWatch({ control, name: "courseOfStudy" });
  const isStudentValue = useWatch({ control, name: "isStudent" });
  const showMedicalFields = isStudentValue === "yes" || isStudentValue === "no";
  const showSpecificCourse = courseOfStudy === "Other";

  const onSubmit = (data: WaitlistValues) => {
    joinWaitlist(
      {
        email: data.email,
        fullName: data.fullName,
        isStudent: data.isStudent === "yes",
        courseOfStudy:
          data.courseOfStudy === "Other"
            ? (data.specificCourse ?? "Other")
            : data.courseOfStudy,
        yearOfStudy: data.yearOfStudy || undefined,
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
          {/* Full Name */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-dashboard transition-colors">
              <User className="w-4.5 h-4.5" />
            </div>
            <input
              {...register("fullName")}
              type="text"
              placeholder="Full name"
              disabled={isPending}
              className={cn(
                inputBase,
                "pl-11",
                errors.fullName ? inputError : inputIdle,
              )}
            />
            {errors.fullName && (
              <p className="mt-1.5 text-xs font-bold text-red-500 ml-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

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

          {/* Role: Student or Professional */}
          <div className="space-y-2">
            <p className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 px-1">
              I am currently a...
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "yes", label: "Medical Student" },
                { value: "no", label: "Healthcare Professional" },
                { value: "other", label: "Not in Medical Field" },
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
                    {...register("isStudent")}
                    type="radio"
                    value={opt.value}
                    className="sr-only"
                    disabled={isPending}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            {errors.isStudent && (
              <p className="text-xs font-bold text-red-500 ml-1">
                {errors.isStudent.message}
              </p>
            )}
          </div>

          {/* Course + Year — only for medical roles */}
          <AnimatePresence>
            {showMedicalFields && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden space-y-4"
              >
                {/* Course of Study */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-primary-dashboard transition-colors">
                    <GraduationCap className="w-4.5 h-4.5" />
                  </div>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <select
                    {...register("courseOfStudy")}
                    disabled={isPending}
                    className={cn(
                      inputBase,
                      "pl-11 pr-10 appearance-none cursor-pointer",
                      errors.courseOfStudy ? inputError : inputIdle,
                      !courseOfStudy
                        ? "text-slate-400"
                        : "text-text-main dark:text-white",
                    )}
                  >
                    <option value="" disabled>
                      Course of study / Specialty
                    </option>
                    {COURSES.map((c) => (
                      <option
                        key={c}
                        value={c}
                        className="text-text-main dark:text-white bg-surface-dark"
                      >
                        {c}
                      </option>
                    ))}
                  </select>
                  {errors.courseOfStudy && (
                    <p className="mt-1.5 text-xs font-bold text-red-500 ml-1">
                      {errors.courseOfStudy.message}
                    </p>
                  )}
                </div>

                {/* Dynamic: Specify if Other */}
                <AnimatePresence>
                  {showSpecificCourse && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <input
                        {...register("specificCourse")}
                        type="text"
                        placeholder="Please specify your course or specialty"
                        disabled={isPending}
                        className={cn(
                          inputBase,
                          errors.specificCourse ? inputError : inputIdle,
                        )}
                      />
                      {errors.specificCourse && (
                        <p className="mt-1.5 text-xs font-bold text-red-500 ml-1">
                          {errors.specificCourse.message}
                        </p>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Year of Study / Level */}
                <div className="relative group">
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  <select
                    {...register("yearOfStudy")}
                    disabled={isPending}
                    className={cn(
                      inputBase,
                      "pr-10 appearance-none cursor-pointer",
                      errors.yearOfStudy ? inputError : inputIdle,
                      "text-slate-400 dark:text-slate-400",
                    )}
                  >
                    <option value="">Year of study / Level (optional)</option>
                    {STUDY_LEVELS.map((l) => (
                      <option
                        key={l}
                        value={l}
                        className="text-text-main dark:text-white bg-surface-dark"
                      >
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
