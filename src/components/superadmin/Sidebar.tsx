"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Users,
  ShieldCheck,
  LogOut,
  User,
  Settings,
  Stethoscope,
  Loader2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useLogout } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUnapprovedUsers } from "@/lib/hooks/useAdmin";
import { Badge } from "@/components/ui/badge";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/superadmin", icon: LayoutDashboard },
  {
    label: "Organizations",
    href: "/superadmin/organizations",
    icon: Building2,
  },
  { label: "Users", href: "/superadmin/users", icon: Users },
  { label: "Waitlist", href: "/superadmin/waitlist", icon: Clock },
];

export function Sidebar({ className, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { mutate: logout, isPending } = useLogout();
  const router = useRouter();
  const { data: waitlistResponse } = useUnapprovedUsers();
  const waitlistCount = waitlistResponse?.data?.length ?? 5; // Fallback to mock for design preview

  const handleLogout = () => {
    logout(undefined, {
      onSettled: () => {
        toast.success("Logged out successfully");
        router.push("/login");
      },
    });
  };

  const itemBaseStyles =
    "flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 group relative font-sans font-bold text-sm lg:text-base";
  const activeStyles =
    "bg-primary-dashboard dark:bg-primary-dashboard text-text-main font-black shadow-lg shadow-primary-dashboard/20";
  const inactiveStyles =
    "text-text-main dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-white/5 opacity-70 hover:opacity-100";

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
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-dashboard text-text-main shadow-sm shadow-primary-dashboard/30">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl lg:text-2xl font-black leading-tight tracking-tight text-text-main dark:text-white">
              Eyrie<span className="text-primary-dashboard">Care</span>
            </h2>
            <p className="text-[10px] text-primary-dashboard font-black tracking-[0.2em] uppercase mt-0.5">
              Superadmin
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-4">
          <div className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const isActive =
                item.href === "/superadmin"
                  ? pathname === "/superadmin"
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
                      layoutId="active-bar-superadmin"
                      className="absolute left-0 w-1 h-6 bg-primary-dashboard dark:bg-white/40 rounded-r-full"
                    />
                  )}
                  <item.icon
                    className={cn(
                      "w-5 h-5 lg:w-5.5 lg:h-5.5 transition-transform group-hover:scale-110",
                      isActive
                        ? "text-text-main opacity-100"
                        : "text-slate-500 dark:text-white/60 group-hover:text-text-main dark:group-hover:text-white",
                    )}
                  />
                  <span className="flex-1">{item.label}</span>
                  {item.label === "Waitlist" && waitlistCount > 0 && (
                    <Badge
                      className={cn(
                        "ml-auto px-1.5 py-0 min-w-[20px] h-5 justify-center font-black text-[10px]",
                        isActive
                          ? "bg-white text-primary-dashboard dark:bg-primary-dashboard dark:text-white"
                          : "bg-primary-dashboard text-white",
                      )}
                    >
                      {waitlistCount}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      <div className="flex flex-col gap-4">
        {/* Profile & Settings */}
        <div className="flex flex-col gap-1 border-t border-slate-100 dark:border-white/5 pt-4">
          <Link
            href="/dashboard"
            className={cn(
              itemBaseStyles,
              "text-primary-dashboard border border-primary-dashboard/20 bg-primary-dashboard/5 hover:bg-primary-dashboard/10",
            )}
          >
            <ShieldCheck className="w-5 h-5 lg:w-5.5 lg:h-5.5" /> View User Site
          </Link>
          <Link
            href="/superadmin/profile"
            className={cn(
              itemBaseStyles,
              pathname === "/superadmin/profile"
                ? activeStyles
                : inactiveStyles,
            )}
          >
            <User className="w-5 h-5 lg:w-5.5 lg:h-5.5" /> Profile
          </Link>
          <Link
            href="/superadmin/profile?tab=preferences"
            className={cn(
              itemBaseStyles,
              pathname.includes("tab=preferences")
                ? activeStyles
                : inactiveStyles,
            )}
          >
            <Settings className="w-5 h-5 lg:w-5.5 lg:h-5.5" /> Settings
          </Link>
        </div>

        <Button
          variant="default"
          onClick={handleLogout}
          disabled={isPending}
          className="w-full bg-primary-dashboard hover:bg-primary-dashboard-hover text-text-main font-black gap-2 rounded-xl h-11 lg:h-12 text-sm lg:text-base transition-all shadow-lg shadow-primary-dashboard/10 disabled:opacity-70"
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
    </aside>
  );
}
