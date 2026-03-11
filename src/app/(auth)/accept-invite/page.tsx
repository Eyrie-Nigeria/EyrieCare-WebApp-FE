"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, ShieldCheck, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      <div className="flex flex-col gap-8 text-center sm:text-left">
        <div className="size-20 bg-[#e7f3eb] dark:bg-[#1C2E24] rounded-full flex items-center justify-center mx-auto sm:mx-0">
          <CheckCircle2 className="w-10 h-10 text-primary-auth" />
        </div>
        <div>
          <h1 className="text-text-main dark:text-white tracking-tight text-3xl font-bold leading-tight mb-2">
            Account Verified!
          </h1>
          <p className="text-gray-500 dark:text-text-auth-light-green text-base">
            Your password has been set. Welcome to EyrieCare.
          </p>
        </div>
        <Link href="/login" className="w-full">
          <Button className="w-full bg-primary-auth hover:bg-primary-auth-hover text-background-auth-deep font-bold py-7 py-3.5 text-base transition-all duration-200 shadow-[0_4px_14px_0_rgba(43,238,121,0.25)] hover:shadow-[0_6px_20px_rgba(43,238,121,0.35)] active:scale-[0.98]">
            Go to Login
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center sm:text-left">
        <div className="size-16 bg-[#e7f3eb] dark:bg-[#1C2E24]  rounded-2xl flex items-center justify-center mx-auto sm:mx-0 mb-6 rotate-3 transform border border-border-auth-green/30">
          <ShieldCheck className="w-8 h-8 text-primary-auth" />
        </div>
        <h1 className="text-text-main dark:text-white tracking-tight text-3xl font-bold leading-tight mb-2">
          Complete Your Registration
        </h1>
        <p className="text-gray-500 dark:text-text-auth-light-green text-base">
          Set a secure password for your new account.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-text-main dark:text-gray-200 text-sm font-semibold">
            New Password
          </label>
          <Input
            placeholder="••••••••"
            type={showPassword ? "text" : "password"}
            {...register("password")}
            className={`dark:border-border-auth-green/30 dark:bg-surface-auth-dark ${
              errors.password ? "border-red-500 focus-visible:ring-red-500" : ""
            }`}
            rightIcon={
              <button
                className="text-gray-400 dark:text-text-auth-light-green hover:text-text-main dark:hover:text-white transition-colors cursor-pointer"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            }
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1.5">
          <label className="text-text-main dark:text-gray-200 text-sm font-semibold">
            Confirm Password
          </label>
          <Input
            placeholder="••••••••"
            type="password"
            {...register("confirmPassword")}
            className={`dark:border-border-auth-green/30 dark:bg-surface-auth-dark ${
              errors.confirmPassword
                ? "border-red-500 focus-visible:ring-red-500"
                : ""
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading || !token}
          className="mt-2 w-full bg-primary-auth hover:bg-primary-auth-hover text-background-auth-deep font-bold py-7 py-3.5 text-base transition-all duration-200 shadow-[0_4px_14px_0_rgba(43,238,121,0.25)] hover:shadow-[0_6px_20px_rgba(43,238,121,0.35)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Finalizing Account...
            </>
          ) : (
            "Set Password & Finish"
          )}
        </Button>
      </form>

      {!token && (
        <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
          <p className="text-xs font-bold text-orange-600 dark:text-orange-400 text-center uppercase tracking-widest">
            Security Warning
          </p>
          <p className="text-[10px] text-center text-gray-500 dark:text-text-auth-light-green mt-1">
            Invalid invitation token. Please check your email link or contact
            support.
          </p>
        </div>
      )}
    </div>
  );
}

export default function AcceptInvitePage() {
  return (
    <Suspense
      fallback={
        <div className="flex w-full items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary-auth" />
        </div>
      }
    >
      <AcceptInviteContent />
    </Suspense>
  );
}
