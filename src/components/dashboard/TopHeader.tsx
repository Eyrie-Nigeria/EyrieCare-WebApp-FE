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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";
import { TopHeaderProps } from "./types";

export default function TopHeader({
  onMenuClick,
  searchPlaceholder = "Search cases, tests...",
}: TopHeaderProps) {
  const pathname = usePathname();
  const isClerkMode = pathname?.startsWith("/clerk");
  const isAIMode = pathname?.includes("/ai");
  const isManualMode = pathname?.includes("/manual");
  const showToggle = isAIMode || isManualMode;

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
                  <Link href="/clerk/ai">
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
          <button className="flex items-center justify-center rounded-full size-10 bg-slate-100 dark:bg-card-dashboard-dark/40 text-slate-600 dark:text-white hover:text-primary-dashboard dark:hover:text-primary-dashboard transition-colors relative border border-slate-200 dark:border-card-dashboard-dark">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 size-2 bg-primary-dashboard rounded-full border-2 border-surface-dashboard-light dark:border-surface-dashboard-dark"></span>
          </button>

          <Link
            href="/profile"
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div
              className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-transparent group-hover:ring-primary-dashboard transition-all border border-slate-200 dark:border-card-dashboard-dark"
              style={{
                backgroundImage:
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCYxwiTH8_6yubL0DhG14Yz014kmSM9FXdseWY2zX2jDmWKJ9Z8hr4urZn5yWZM4X6MTNgcXpXhSnPUHH28uZqPQ9pCISXdQU_acryGWO2d8Un0G5_0787xBxbj_Mm0EK5qeZ4gVRZp0WDL6O_GkYBcPU7VJtlOhv042-DbT3HcyF0yurRZD1xSG9qS1AKQy-8pLFkb9lDO8sI3C4uMdOLNemy6xx4Av-EkuPWdvaoCgHAU-GG2qwVi0ILtnMtpysH_ffE2XtHBd54")',
              }}
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
