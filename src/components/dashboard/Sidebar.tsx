"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Landmark,
  ClipboardCheck,
  Bookmark,
  MessageSquare,
  BrainCircuit,
  BookOpenCheck,
  GraduationCap,
  LogOut,
  User,
  Settings,
  ChevronDown,
  Stethoscope,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { SidebarProps, NavItem } from "./types";
import { motion, AnimatePresence } from "framer-motion";
import { useLogout } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "@/lib/store/useAuthStore";

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Specialties", href: "/specialties", icon: Landmark },
  { label: "Clerk", href: "/clerk", icon: ClipboardCheck },
  { label: "Saved Cases", href: "/saved", icon: Bookmark },
];

const academicItems: NavItem[] = [
  { label: "AI Tutor", href: "/chat", icon: MessageSquare },
  { label: "Quick Test", href: "/test", icon: BrainCircuit },
  { label: "Mock Exams", href: "/exams", icon: BookOpenCheck },
  { label: "Courses", href: "/courses", icon: GraduationCap },
];

export function Sidebar({ className, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [isAcademicOpen, setIsAcademicOpen] = useState(false);
  const { mutate: logout, isPending } = useLogout();
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const handleLogout = () => {
    logout(undefined, {
      onSettled: () => {
        toast.success("Logged out successfully");
        router.push("/login");
      },
    });
  };

  // Slightly reduced font size for better density as requested (text-sm to text-base)
  const itemBaseStyles =
    "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative font-sans font-bold text-sm lg:text-base";
  const activeStyles =
    "bg-primary-dashboard/10 dark:bg-primary-dashboard text-primary-dashboard dark:text-surface-dashboard-dark font-black";
  const inactiveStyles =
    "text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/5 opacity-70 hover:opacity-100";

  return (
    <aside
      className={cn(
        "w-72 flex flex-col justify-between bg-surface-dashboard-light dark:bg-surface-dashboard-dark border-r border-slate-200 dark:border-white/5 p-4 h-full shrink-0 z-20 transition-colors duration-200 font-sans overflow-y-auto custom-scrollbar",
        className,
      )}
    >
      <div className="flex flex-col gap-6">
        {/* Logo Section */}
        <div className="flex gap-3 items-center px-2 mb-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-dashboard text-white dark:text-surface-dashboard-dark shadow-sm">
            <Stethoscope className="w-6 h-6" />
          </div>
          <h2 className="text-xl lg:text-2xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
            EyrieCare
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    itemBaseStyles,
                    isActive ? activeStyles : inactiveStyles,
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-bar"
                      className="absolute left-0 w-1 h-6 bg-primary-dashboard dark:bg-white/40 rounded-r-full"
                    />
                  )}
                  <item.icon
                    className={cn(
                      "w-5 h-5 lg:w-5.5 lg:h-5.5 transition-transform group-hover:scale-110",
                      isActive
                        ? "text-primary-dashboard dark:text-surface-dashboard-dark opacity-100"
                        : "text-slate-500 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white",
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Academic Hub Section */}
          <div className="flex flex-col gap-0.5">
            <button
              onClick={() => setIsAcademicOpen(!isAcademicOpen)}
              className="w-full flex items-center justify-between px-4 py-2 mt-2 text-[10px] lg:text-xs font-black uppercase tracking-[0.15em] text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <span>Academic Hub</span>
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  isAcademicOpen ? "" : "-rotate-90",
                )}
              />
            </button>

            <AnimatePresence>
              {isAcademicOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden flex flex-col gap-0.5"
                >
                  {academicItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          itemBaseStyles,
                          "py-2 text-[13px] lg:text-[15px]",
                          isActive ? activeStyles : inactiveStyles,
                        )}
                      >
                        <item.icon
                          className={cn(
                            "w-4.5 h-4.5 transition-colors",
                            isActive
                              ? "text-primary-dashboard dark:text-surface-dashboard-dark"
                              : "text-slate-500 dark:text-white/60 group-hover:text-slate-900 dark:group-hover:text-white",
                          )}
                        />
                        {item.label}
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        {/* Profile & Settings - Only show for regular users */}
        {user?.role?.toLowerCase() !== "admin" &&
          user?.role?.toLowerCase() !== "superadmin" && (
            <div className="flex flex-col gap-1 border-t border-slate-100 dark:border-white/5 pt-4">
              <Link
                href="/profile"
                className={cn(
                  itemBaseStyles,
                  pathname.startsWith("/profile") &&
                    pathname !== "/profile/settings"
                    ? activeStyles
                    : inactiveStyles,
                )}
              >
                <User className="w-5 h-5 lg:w-5.5 lg:h-5.5" /> Profile
              </Link>
              <Link
                href="/profile/settings"
                className={cn(
                  itemBaseStyles,
                  pathname.startsWith("/profile/settings")
                    ? activeStyles
                    : inactiveStyles,
                )}
              >
                <Settings className="w-5 h-5 lg:w-5.5 lg:h-5.5" /> Settings
              </Link>
            </div>
          )}

        <div
          className={cn(
            "flex flex-col gap-1",
            (user?.role?.toLowerCase() === "admin" ||
              user?.role?.toLowerCase() === "superadmin") &&
              "border-t border-slate-100 dark:border-white/5 pt-4",
          )}
        >
          <Button
            variant="default"
            onClick={handleLogout}
            disabled={isPending}
            className="w-full bg-primary-dashboard hover:bg-primary-dashboard-hover text-white dark:text-surface-dashboard-dark font-black gap-2 rounded-xl h-11 lg:h-12 text-sm lg:text-base transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <LogOut className="w-5 h-5" />
            )}
            <span className="truncate">
              {isPending ? "Logging out..." : "Log Out"}
            </span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
