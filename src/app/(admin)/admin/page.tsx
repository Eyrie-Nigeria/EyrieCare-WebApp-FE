"use client";

import { Building2, Users, UserPlus, TrendingUp } from "lucide-react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useOrganizations } from "@/lib/hooks/useAdmin";
import { useState } from "react";
import { InviteUserModal } from "./organization/invite-modal";
import Link from "next/link";

export default function AdminDashboard() {
  const user = useAuthStore((state) => state.user);
  const { data: orgsResponse } = useOrganizations({ per_page: 100 });
  const myOrg = orgsResponse?.data?.find((o) => o.id === user?.organization_id);
  const [isInviteOpen, setIsInviteOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark mt-2">
          Welcome back! Managing organization:{" "}
          <span className="font-bold text-primary-dashboard">
            {myOrg?.name || "Loading..."}
          </span>
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark">
                Total Users
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                1,284
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Building2 className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark">
                Active Admins
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                12
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark">
                Growth
              </p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                +12.5%
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark p-8 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setIsInviteOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary-dashboard text-white dark:text-surface-dashboard-dark font-bold rounded-xl hover:bg-primary-dashboard-hover transition-all"
          >
            <UserPlus className="w-5 h-5" /> Invite User
          </button>
          <Link href="/admin/organization">
            <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-white/5 text-slate-900 dark:text-white font-bold rounded-xl hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
              <Building2 className="w-5 h-5" /> View Organization
            </button>
          </Link>
        </div>
      </div>

      <InviteUserModal
        isOpen={isInviteOpen}
        onClose={() => setIsInviteOpen(false)}
        organizationId={user?.organization_id || ""}
      />
    </div>
  );
}
