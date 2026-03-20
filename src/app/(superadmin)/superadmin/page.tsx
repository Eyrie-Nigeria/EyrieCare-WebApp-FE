"use client";

import { Building2, Users, ShieldCheck, Plus, Clock } from "lucide-react";
import { useState } from "react";
import { CreateOrganizationModal } from "./organizations/create-modal";
import { CreateUserModal } from "./users/create-modal";
import { useOrganizations, useUnapprovedUsers } from "@/lib/hooks/useAdmin";

export default function SuperAdminDashboard() {
  const [isCreateOrgOpen, setIsCreateOrgOpen] = useState(false);
  const [isCreateAdminOpen, setIsCreateAdminOpen] = useState(false);

  // Fetch organizations for the admin creation modal
  const { data: orgsResponse } = useOrganizations({ page: 1, per_page: 100 });
  const { data: waitlistResponse } = useUnapprovedUsers({ per_page: 1 });

  const organizations = orgsResponse?.data || [];
  // Use API count if available, otherwise 0
  const waitlistCount = waitlistResponse?.meta?.total ?? 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Platform Overview
        </h1>
        <p className="text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark mt-2">
          Global statistics and management across all organizations.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary-dashboard/10 rounded-xl">
              <Building2 className="w-6 h-6 text-primary-dashboard" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Organizations
              </p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                42
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <ShieldCheck className="w-6 h-6 text-purple-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Admins
              </p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                156
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Users className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Total Users
              </p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                8.4k
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 rounded-xl">
              <Clock className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Waitlist Signups
              </p>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                {waitlistCount}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark p-8 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
        <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">
          Management Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setIsCreateOrgOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-primary-dashboard text-white dark:text-surface-dashboard-dark font-bold rounded-xl hover:bg-primary-dashboard-hover transition-all"
          >
            <Plus className="w-5 h-5" /> Create Organization
          </button>
          <button
            onClick={() => setIsCreateAdminOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all"
          >
            <Plus className="w-5 h-5" /> Create Admin
          </button>
        </div>
      </div>

      <CreateOrganizationModal
        isOpen={isCreateOrgOpen}
        onClose={() => setIsCreateOrgOpen(false)}
      />

      <CreateUserModal
        isOpen={isCreateAdminOpen}
        onClose={() => setIsCreateAdminOpen(false)}
        organizations={organizations}
      />
    </div>
  );
}
