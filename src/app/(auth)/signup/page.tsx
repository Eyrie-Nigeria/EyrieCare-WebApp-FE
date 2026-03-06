"use client";

import { useState } from "react";
import { Mail, ChevronDown, Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { AuthTabs, SocialLogins } from "@/components/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSignup } from "@/lib/hooks/useAuth";

const signupSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  organization_id: z.string().optional(), // Optional for now
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { mutate: signup, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      organization_id: "",
    },
  });

  const onSubmit = (data: SignupFormValues) => {
    // We omit organization_id from the payload sent to the backend as requested
    const payload = {
      email: data.email,
      password: data.password,
    };

    signup(payload, {
      onSuccess: (response) => {
        toast.success(response.message || "Registration successful");
        router.push("/dashboard");
      },
      onError: (error: Error) => {
        toast.error(error.message || "Registration failed. Please try again.");
      },
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center sm:text-left">
        <h1 className="text-text-main dark:text-white tracking-tight text-3xl font-bold leading-tight mb-2">
          Create Account
        </h1>
        <p className="text-gray-500 dark:text-text-auth-light-green text-base">
          Enter your details below to get started.
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
          <label className="text-text-main dark:text-gray-200 text-sm font-semibold flex justify-between">
            <span>Medical School</span>
            <span className="text-gray-400 font-normal text-xs">
              (Optional)
            </span>
          </label>
          <div className="relative group">
            <select
              {...register("organization_id")}
              className="w-full appearance-none rounded-xl border border-gray-200 dark:border-border-auth-green/30 bg-white dark:bg-surface-auth-dark px-4 py-3.5 text-base text-text-main dark:text-white placeholder-gray-400 dark:placeholder-text-auth-light-green/40 focus:border-primary-auth focus:ring-1 focus:ring-primary-auth transition-all outline-none cursor-pointer"
            >
              <option value="">Select your institution</option>
              <option value="harvard">Harvard Medical School</option>
              <option value="hopkins">Johns Hopkins School of Medicine</option>
              <option value="ucsf">UCSF School of Medicine</option>
              <option value="stanford">Stanford School of Medicine</option>
              <option value="other">Other</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-text-auth-light-green w-5 h-5 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-text-main dark:text-gray-200 text-sm font-semibold">
            Password
          </label>
          <Input
            placeholder="Create a password"
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
          {errors.password ? (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          ) : (
            <p className="text-xs text-gray-500 dark:text-text-auth-light-green/70 mt-1 pl-1">
              Must be at least 8 characters.
            </p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          className="mt-2 w-full bg-primary-auth hover:bg-primary-auth-hover text-background-auth-deep font-bold py-3.5 text-base transition-all duration-200 shadow-[0_4px_14px_0_rgba(43,238,121,0.25)] hover:shadow-[0_6px_20px_rgba(43,238,121,0.35)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Creating account...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </form>

      <SocialLogins />

      <div className="text-center">
        <p className="text-xs text-gray-400 dark:text-text-auth-light-green/50">
          By clicking &quot;Sign Up&quot;, you agree to our
          <a
            className="underline hover:text-gray-600 dark:hover:text-text-auth-light-green/80 mx-1"
            href="#"
          >
            Terms
          </a>
          and
          <a
            className="underline hover:text-gray-600 dark:hover:text-text-auth-light-green/80 mx-1"
            href="#"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
