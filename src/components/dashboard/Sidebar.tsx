"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Stethoscope,
  MessageSquare,
  ClipboardCheck,
  Bookmark,
  LogOut,
  BarChart3,
  GraduationCap,
  FileText,
  User,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/button";
import { NavGroup, SidebarProps } from "./types";

const navGroups: NavGroup[] = [
  {
    title: "Academics",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: BarChart3 },
      { label: "Clerk", href: "/dashboard/clerk", icon: Stethoscope },
      { label: "Chat", href: "/dashboard/chat", icon: MessageSquare },
      { label: "Test", href: "/dashboard/test", icon: ClipboardCheck },
      { label: "Courses", href: "/dashboard/courses", icon: GraduationCap },
      { label: "Exams", href: "/dashboard/exams", icon: FileText },
    ],
  },
  {
    title: "Personal",
    items: [
      { label: "Saved Cases", href: "/dashboard/saved", icon: Bookmark },
      { label: "Profile", href: "/profile", icon: User },
      { label: "Settings", href: "/profile/settings", icon: Settings },
    ],
  },
];

export default function Sidebar({ className, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "w-72 flex-col justify-between bg-surface-dashboard-light dark:bg-surface-dashboard-dark border-r border-slate-200 dark:border-card-dashboard-dark p-4 h-full shrink-0 z-20 transition-colors duration-200 font-dashboard",
        className,
      )}
    >
      <div className="flex flex-col gap-8">
        {/* Logo Section */}
        <div className="flex gap-3 items-center px-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-text-main">
            <Stethoscope className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold leading-tight tracking-tight text-slate-900 dark:text-white">
            EyrieCare
          </h2>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-6">
          {navGroups.map((group) => (
            <div key={group.title} className="flex flex-col gap-2">
              <h3 className="px-3 text-[10px] font-bold uppercase tracking-widest text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark opacity-60">
                {group.title}
              </h3>
              <div className="flex flex-col gap-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group",
                        isActive
                          ? "bg-primary-dashboard/10 dark:bg-card-dashboard-dark text-primary-dashboard dark:text-white"
                          : "text-slate-600 dark:text-white hover:bg-slate-100 dark:hover:bg-card-dashboard-dark/50",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "w-5 h-5 transition-colors",
                          isActive
                            ? "text-primary-dashboard dark:text-white"
                            : "text-slate-400 dark:text-text-dashboard-secondary-dark group-hover:text-primary-dashboard",
                        )}
                      />
                      <p
                        className={cn(
                          "text-sm leading-normal",
                          isActive ? "font-semibold" : "font-medium",
                        )}
                      >
                        {item.label}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <Button
        variant="default"
        className="w-full bg-primary-dashboard hover:bg-primary-dashboard-hover text-surface-dashboard-dark font-bold gap-2"
      >
        <LogOut className="w-5 h-5" />
        <span className="truncate">Log Out</span>
      </Button>
    </aside>
  );
}
