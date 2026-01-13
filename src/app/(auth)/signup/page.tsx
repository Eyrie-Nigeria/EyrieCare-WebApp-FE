"use client";

import { useState } from "react";
import { Mail, ChevronDown, Eye, EyeOff } from "lucide-react";
import { AuthTabs, SocialLogins } from "@/components/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);

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

      <form
        className="flex flex-col gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-text-main dark:text-gray-200 text-sm font-semibold">
            Email Address
          </label>
          <Input
            placeholder="student@medschool.edu"
            type="email"
            rightIcon={<Mail className="w-5 h-5 pointer-events-none" />}
            className="dark:border-border-auth-green/30 dark:bg-surface-auth-dark"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-text-main dark:text-gray-200 text-sm font-semibold">
            Medical School
          </label>
          <div className="relative group">
            <select
              defaultValue=""
              className="w-full appearance-none rounded-xl border border-gray-200 dark:border-border-auth-green/30 bg-white dark:bg-surface-auth-dark px-4 py-3.5 text-base text-text-main dark:text-white placeholder-gray-400 dark:placeholder-text-auth-light-green/40 focus:border-primary-auth focus:ring-1 focus:ring-primary-auth transition-all outline-none cursor-pointer"
            >
              <option disabled value="">
                Select your institution
              </option>
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
            className="dark:border-border-auth-green/30 dark:bg-surface-auth-dark"
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
          <p className="text-xs text-gray-500 dark:text-text-auth-light-green/70 mt-1 pl-1">
            Must be at least 8 characters.
          </p>
        </div>

        <Button className="mt-2 w-full bg-primary-auth hover:bg-primary-auth-hover text-background-auth-deep font-bold py-3.5 text-base transition-all duration-200 shadow-[0_4px_14px_0_rgba(43,238,121,0.25)] hover:shadow-[0_6px_20px_rgba(43,238,121,0.35)] active:scale-[0.98]">
          Sign Up
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
