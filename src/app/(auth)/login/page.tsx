"use client";

import { useState } from "react";
import { Mail, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { AuthTabs, SocialLogins } from "@/components/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLogin } from "@/lib/hooks/useAuth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    login(data, {
      onSuccess: (response) => {
        toast.success(response.message || "Login successful");
      },
      onError: (error: Error) => {
        toast.error(error.message || "Invalid credentials. Please try again.");
      },
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center sm:text-left">
        <h1 className="text-text-main dark:text-white tracking-tight text-3xl font-bold leading-tight mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-500 dark:text-text-auth-light-green text-base">
          Please enter your details to sign in.
        </p>
      </div>

      <AuthTabs />

      <form className="flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1.5">
          <label className="text-text-main dark:text-gray-200 text-sm font-semibold">
            Email Address
          </label>
          <Input
            placeholder="student@medschool.edu"
            type="email"
            {...register("email")}
            rightIcon={<Mail className="w-5 h-5 pointer-events-none" />}
            className={`dark:border-border-auth-green/30 dark:bg-surface-auth-dark ${
              errors.email ? "border-red-500 focus-visible:ring-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label className="text-text-main dark:text-gray-200 text-sm font-semibold">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs font-bold text-primary-auth hover:text-primary-auth-hover transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <Input
            placeholder="Enter your password"
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

        <Button
          type="submit"
          disabled={isPending}
          className="mt-2 w-full bg-primary-auth hover:bg-primary-auth-hover text-background-auth-deep font-bold py-7 py-3.5 text-base transition-all duration-200 shadow-[0_4px_14px_0_rgba(43,238,121,0.25)] hover:shadow-[0_6px_20px_rgba(43,238,121,0.35)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </form>

      <SocialLogins />

      <div className="text-center mt-2">
        <p className="text-sm text-gray-500 dark:text-text-auth-light-green">
          Don{"'"}t have an account?
          <Link
            href="/waitlist"
            className="font-bold text-primary-auth hover:text-primary-auth-hover transition-colors mx-1"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
