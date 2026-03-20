"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Shield,
  Building2,
  Clock,
  User as UserIcon,
  Calendar,
  CheckCircle2,
  XCircle,
  Edit2,
  Trash2,
  Smartphone,
} from "lucide-react";
import { useUser, useOrganizations } from "@/lib/hooks/useAdmin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/cn";

export default function UserDetailsPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { data: userResponse, isLoading: isUserLoading } = useUser(id);
  const { data: orgsResponse } = useOrganizations({ per_page: 100 });

  const user = userResponse?.data;
  const organizations = orgsResponse?.data || [];
  const organization = organizations.find(
    (o) => o.id === user?.organization_id,
  );

  if (isUserLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-dashboard"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">
          User not found
        </h2>
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="mt-4"
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20">
      {/* Navigation & Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-primary-dashboard transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Directory
        </button>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="rounded-xl font-bold border-slate-200 dark:border-white/10"
          >
            <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
          </Button>
          <Button
            variant="destructive"
            className="rounded-xl font-bold bg-red-500 hover:bg-red-600 border-none shadow-lg shadow-red-500/20"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Deactivate
          </Button>
        </div>
      </div>

      {/* Profile Hero Card */}
      <div className="bg-white dark:bg-card-dashboard-dark rounded-[2.5rem] p-8 border border-slate-200 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
          <UserIcon className="w-64 h-64 -mr-20 -mt-20 rotate-12" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="relative group">
            <div className="size-24 rounded-[2rem] bg-primary-dashboard/10 dark:bg-primary-dashboard/20 flex items-center justify-center border-2 border-primary-dashboard/30 group-hover:scale-105 transition-transform duration-500">
              <span className="text-4xl font-black text-primary-dashboard">
                {user.email.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white dark:bg-card-dashboard-dark p-1.5 rounded-full shadow-lg border border-slate-100 dark:border-white/10">
              {user.is_active ? (
                <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              ) : (
                <XCircle className="w-6 h-6 text-slate-400" />
              )}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {user.email}
              </h1>
              <Badge
                className={cn(
                  "px-3 py-1 font-black text-[10px] uppercase tracking-widest border-none",
                  user.role === "superadmin"
                    ? "bg-purple-500/10 text-purple-500"
                    : user.role === "admin"
                      ? "bg-blue-500/10 text-blue-500"
                      : "bg-primary-dashboard/10 text-primary-dashboard",
                )}
              >
                {user.role}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2 text-sm font-bold">
                <Building2 className="w-4 h-4 text-primary-dashboard" />
                {organization
                  ? organization.name
                  : "Unassigned to Organization"}
              </div>
              <div className="flex items-center gap-2 text-sm font-bold">
                <Smartphone className="w-4 h-4 text-primary-dashboard" />
                {user.phone_number || "No Phone Number Provided"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-card-dashboard-dark rounded-[2rem] border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5">
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary-dashboard" />
                Authentication Details
              </h2>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  User Identifier (UUID)
                </p>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 break-all font-mono bg-slate-50 dark:bg-white/5 p-2 rounded-lg border border-slate-100 dark:border-white/10">
                  {user.id}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Account Verified
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  <span className="text-sm font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-tight">
                    Verified Account
                  </span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Primary Email
                </p>
                <p className="text-sm font-black text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  {user.email}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Two-Factor Auth
                </p>
                <p className="text-sm font-black text-slate-400 uppercase tracking-tighter italic">
                  Not Configured
                </p>
              </div>
            </div>
          </div>

          {/* Activity Placeholder */}
          <div className="bg-white dark:bg-card-dashboard-dark rounded-[2rem] border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm">
            <div className="px-8 py-6 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 flex justify-between items-center">
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary-dashboard" />
                Recent System Activity
              </h2>
              <Badge
                variant="outline"
                className="rounded-full px-4 border-slate-200 dark:border-white/10 font-bold"
              >
                Real-time
              </Badge>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex gap-4 relative group">
                    {item !== 3 && (
                      <div className="absolute left-[11px] top-6 bottom-[-24px] w-0.5 bg-slate-100 dark:bg-white/5" />
                    )}
                    <div className="size-6 rounded-full bg-primary-dashboard/10 dark:bg-primary-dashboard/20 border-2 border-white dark:border-card-dashboard-dark z-10 flex items-center justify-center">
                      <div className="size-2 rounded-full bg-primary-dashboard" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        {item === 1
                          ? "System login from Lagos, Nigeria"
                          : item === 2
                            ? "Profile preferences updated"
                            : "Device authorized: Chrome on Windows"}
                      </p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        {item === 1
                          ? "2 hours ago"
                          : item === 2
                            ? "Yesterday at 14:30"
                            : "March 18, 2026"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-card-dashboard-dark rounded-[2rem] border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm p-8">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 border-b border-slate-100 dark:border-white/5 pb-4">
              Timestamps
            </h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-slate-100 dark:bg-white/5 rounded-xl">
                  <Calendar className="w-5 h-5 text-slate-400" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Joined Platform
                  </p>
                  <p className="text-sm font-black text-slate-700 dark:text-slate-300">
                    {new Date(user.created_at).toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-2.5 bg-slate-100 dark:bg-white/5 rounded-xl">
                  <Clock className="w-5 h-5 text-slate-400" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                    Last Active
                  </p>
                  <p className="text-sm font-black text-slate-700 dark:text-slate-300">
                    {user.updated_at
                      ? new Date(user.updated_at).toLocaleDateString()
                      : "Never"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="bg-primary-dashboard/5 dark:bg-primary-dashboard/10 rounded-[2rem] border border-primary-dashboard/20 p-8">
            <h3 className="text-sm font-black text-primary-dashboard uppercase tracking-widest mb-4">
              Superadmin Controls
            </h3>
            <div className="space-y-3">
              <Button className="w-full justify-start rounded-xl bg-primary-dashboard text-white dark:text-surface-dashboard-dark font-black h-12 shadow-lg shadow-primary-dashboard/20">
                <Shield className="w-4 h-4 mr-3" /> Reset Password
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start rounded-xl font-bold border-primary-dashboard/20 hover:bg-primary-dashboard/10 text-primary-dashboard h-12"
              >
                <Mail className="w-4 h-4 mr-3" /> Send Notification
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
