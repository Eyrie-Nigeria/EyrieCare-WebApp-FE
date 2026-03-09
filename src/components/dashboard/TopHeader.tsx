"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  Bell,
  Menu,
  ChevronRight,
  Bot,
  ClipboardEdit,
  User,
  LayoutDashboard,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { TopHeaderProps } from "./types";
import { useProfile } from "@/lib/hooks/useAuth";

export function TopHeader({
  onMenuClick,
  searchPlaceholder = "Search cases, tests...",
}: TopHeaderProps) {
  const pathname = usePathname();
  const isClerkMode = pathname?.startsWith("/clerk");
  const isAIMode = pathname?.includes("/ai");
  const isManualMode = pathname?.includes("/manual");
  const showToggle = isAIMode || isManualMode;

  const { data: profileResponse } = useProfile();
  const user = profileResponse?.data;

  return (
    <header className="flex items-center justify-between whitespace-nowrap bg-surface-dashboard-light dark:bg-surface-dashboard-dark border-b border-slate-200 dark:border-card-dashboard-dark px-6 py-4 shrink-0 z-10 transition-colors duration-200 font-dashboard shadow-sm">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Trigger */}
        <div className="lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-slate-900 dark:text-white"
            onClick={onMenuClick}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>

        {isClerkMode && (
          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex items-center gap-2 text-sm font-medium">
              <Link
                href="/clerk"
                className="text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark hover:text-primary-dashboard transition-colors"
              >
                Clerk
              </Link>
              <ChevronRight className="w-4 h-4 text-slate-300 dark:text-card-dashboard-dark" />
              <span className="text-slate-900 dark:text-white font-bold">
                {isAIMode
                  ? "AI-Assisted Clerking"
                  : isManualMode
                    ? "Manual Entry"
                    : "Selection Mode"}
              </span>
            </nav>
            {showToggle && (
              <>
                <div className="h-6 w-px bg-slate-200 dark:bg-card-dashboard-dark mx-2 hidden sm:block"></div>
                <div className="hidden sm:flex bg-slate-100 dark:bg-card-dashboard-dark p-1 rounded-lg">
                  <Link href="/clerk?mode=ai">
                    <button
                      className={cn(
                        "px-3 py-1 text-xs font-bold rounded-md flex items-center gap-1 transition-all",
                        isAIMode
                          ? "bg-white dark:bg-surface-dashboard-dark text-primary-dashboard shadow-sm"
                          : "text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark hover:text-slate-900 dark:hover:text-white",
                      )}
                    >
                      <Bot className="w-3 h-3" />
                      AI Assisted
                    </button>
                  </Link>
                  <Link href="/clerk/manual">
                    <button
                      className={cn(
                        "px-3 py-1 text-xs font-bold rounded-md flex items-center gap-1 transition-all",
                        isManualMode
                          ? "bg-white dark:bg-surface-dashboard-dark text-primary-dashboard shadow-sm"
                          : "text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark hover:text-slate-900 dark:hover:text-white",
                      )}
                    >
                      <ClipboardEdit className="w-3 h-3" />
                      Manual
                    </button>
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 justify-end items-center gap-4 md:gap-6">
        {/* Search Bar */}
        <div className="hidden md:flex flex-col min-w-40 w-64 h-10">
          <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-100/50 dark:bg-card-dashboard-dark/20 border border-slate-200 dark:border-card-dashboard-dark focus-within:ring-2 ring-primary-dashboard/30 transition-all">
            <div className="flex items-center justify-center pl-4 pr-2 text-slate-400 dark:text-text-dashboard-secondary-dark">
              <Search className="w-5 h-5" />
            </div>
            <input
              className="flex w-full min-w-0 flex-1 bg-transparent border-none text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 dark:placeholder:text-text-dashboard-secondary-dark px-2 text-sm font-normal h-full"
              placeholder={searchPlaceholder}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Portal Switcher */}
          {user?.role &&
            ((user.role.toLowerCase() === "superadmin" &&
              !pathname?.startsWith("/superadmin")) ||
              (user.role.toLowerCase() === "admin" &&
                !pathname?.startsWith("/admin") &&
                !pathname?.startsWith("/superadmin"))) && (
              <Link
                href={
                  user.role.toLowerCase() === "superadmin"
                    ? "/superadmin"
                    : "/admin"
                }
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex items-center gap-2 border-primary-dashboard/20 hover:border-primary-dashboard hover:bg-primary-dashboard/5 text-primary-dashboard h-9 px-4 rounded-xl font-bold"
                >
                  {user.role.toLowerCase() === "superadmin" ? (
                    <ShieldCheck className="w-4 h-4" />
                  ) : (
                    <LayoutDashboard className="w-4 h-4" />
                  )}
                  <span className="text-xs uppercase tracking-wider">
                    {user.role.toLowerCase() === "superadmin"
                      ? "Superadmin Portal"
                      : "Admin Portal"}
                  </span>
                </Button>
              </Link>
            )}

          <button className="flex items-center justify-center rounded-full size-10 bg-slate-100 dark:bg-card-dashboard-dark/40 text-slate-600 dark:text-white hover:text-primary-dashboard dark:hover:text-primary-dashboard transition-colors relative border border-slate-200 dark:border-card-dashboard-dark">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 size-2 bg-primary-dashboard rounded-full border-2 border-surface-dashboard-light dark:border-surface-dashboard-dark"></span>
          </button>

          <Link
            href={
              pathname?.startsWith("/superadmin")
                ? "/superadmin/profile"
                : pathname?.startsWith("/admin")
                  ? "/admin/profile"
                  : "/profile"
            }
            className="flex items-center gap-2 cursor-pointer group"
          >
            {user?.profile_picture_url ? (
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-transparent group-hover:ring-primary-dashboard transition-all border border-slate-200 dark:border-card-dashboard-dark"
                style={{
                  backgroundImage: `url("${user.profile_picture_url}")`,
                }}
              />
            ) : (
              <div className="flex items-center justify-center bg-slate-200 dark:bg-card-dashboard-dark/60 rounded-full size-10 ring-2 ring-transparent group-hover:ring-primary-dashboard transition-all border border-slate-200 dark:border-card-dashboard-dark">
                <User className="w-5 h-5 text-slate-500" />
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
