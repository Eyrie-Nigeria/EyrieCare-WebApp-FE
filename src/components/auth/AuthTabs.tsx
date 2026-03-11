"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/cn";

export function AuthTabs() {
  const pathname = usePathname();
  const isLogin = pathname === "/login";
  const isSignup = pathname === "/signup";

  return (
    <div className="flex w-full rounded-xl bg-[#e7f3eb] dark:bg-[#1C2E24] p-1.5 border border-border-auth-green/30">
      <Link
        href="/login"
        className={cn(
          "flex-1 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 text-center",
          isLogin
            ? "bg-white dark:bg-surface-auth-dark shadow-sm text-text-main dark:text-primary-auth font-bold"
            : "text-gray-500 dark:text-text-auth-light-green hover:text-text-main dark:hover:text-white",
        )}
      >
        Login
      </Link>
      <Link
        href="/waitlist"
        className={cn(
          "flex-1 rounded-lg py-2.5 text-sm font-medium transition-all duration-200 text-center",
          isSignup
            ? "bg-white dark:bg-surface-auth-dark shadow-sm text-text-main dark:text-primary-auth font-bold"
            : "text-gray-500 dark:text-text-auth-light-green hover:text-text-main dark:hover:text-white",
        )}
      >
        Sign Up
      </Link>
    </div>
  );
}
