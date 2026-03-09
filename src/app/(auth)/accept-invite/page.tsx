"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ShieldCheck, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { useAcceptInvite } from "@/lib/hooks/useAuth";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

function AcceptInviteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { mutate: acceptInvite, isPending: isLoading } = useAcceptInvite();

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing invitation token");
    }
  }, [token, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    if (!token) return;

    acceptInvite(
      {
        token,
        password: data.password,
      },
      {
        onSuccess: () => {
          setIsSuccess(true);
          toast.success("Password set successfully! You can now log in.");
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to finalize registration");
        },
      },
    );
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-black">
        <div className="w-full max-w-md bg-white dark:bg-card-dashboard-dark p-10 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/5 text-center space-y-6">
          <div className="size-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Account Verified!
            </h1>
            <p className="text-slate-500 mt-2">
              Your password has been set. Welcome to EyrieCare.
            </p>
          </div>
          <Link
            href="/login"
            className="block w-full py-4 bg-primary-dashboard text-white dark:text-surface-dashboard-dark font-black rounded-2xl hover:bg-primary-dashboard-hover transition-all shadow-xl shadow-primary-dashboard/20"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-black">
      <div className="w-full max-w-md bg-white dark:bg-card-dashboard-dark p-10 rounded-3xl shadow-2xl border border-slate-200 dark:border-white/5 space-y-8">
        <div className="text-center">
          <div className="size-16 bg-primary-dashboard/10 rounded-2xl flex items-center justify-center mx-auto mb-6 rotate-3 transform">
            <ShieldCheck className="w-8 h-8 text-primary-dashboard" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Complete Your <br />
            Registration
          </h1>
          <p className="text-slate-500 mt-2 font-medium">
            Set a secure password for your new account.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Password */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                placeholder="••••••••"
                className="w-full px-4 py-4 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary-dashboard/30 focus:outline-none text-slate-900 dark:text-white font-medium transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs font-bold text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              placeholder="••••••••"
              className="w-full px-4 py-4 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-2xl focus:ring-2 focus:ring-primary-dashboard/30 focus:outline-none text-slate-900 dark:text-white font-medium transition-all"
            />
            {errors.confirmPassword && (
              <p className="text-xs font-bold text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading || !token}
            className="w-full py-4 bg-primary-dashboard text-white dark:text-surface-dashboard-dark font-black rounded-2xl hover:bg-primary-dashboard-hover transition-all shadow-xl shadow-primary-dashboard/20 disabled:opacity-50 flex items-center justify-center gap-3"
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : null}
            {isLoading ? "Finalizing Account..." : "Set Password & Finish"}
          </button>
        </form>

        {!token && (
          <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
            <p className="text-xs font-bold text-orange-600 dark:text-orange-400 text-center uppercase tracking-widest">
              Security Warning
            </p>
            <p className="text-[10px] text-center text-slate-500 mt-1">
              Invalid invitation token. Please check your email link or contact
              support.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AcceptInvitePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-black">
          <Loader2 className="w-10 h-10 animate-spin text-primary-dashboard" />
        </div>
      }
    >
      <AcceptInviteContent />
    </Suspense>
  );
}
