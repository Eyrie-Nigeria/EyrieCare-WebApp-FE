"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import {
  Users,
  ShieldCheck,
  Building2,
  Calendar,
  Activity,
  ArrowLeft,
  Edit2,
  Trash2,
  UserPlus,
  Globe,
} from "lucide-react";
import Link from "next/link";
import {
  useOrganization,
  useOrganizationAdmins,
  useOrganizationUsers,
} from "@/lib/hooks/useAdmin";
import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { User } from "@/lib/types/auth";
import { cn } from "@/lib/cn";
import { EditOrganizationModal } from "../edit-modal";
import { AssignMemberModal } from "./assign-modal";

type TabType = "admins" | "users";

export default function OrganizationDetailPage() {
  const { id } = useParams() as { id: string };
  const [activeTab, setActiveTab] = useState<TabType>("admins");
  const [adminsPage, setAdminsPage] = useState(1);
  const [usersPage, setUsersPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  const { data: orgRes, isLoading: isLoadingOrg } = useOrganization(id);
  const { data: adminsRes, isLoading: isLoadingAdmins } = useOrganizationAdmins(
    id,
    { page: adminsPage, per_page: 10 },
  );
  const { data: usersRes, isLoading: isLoadingUsers } = useOrganizationUsers(
    id,
    { page: usersPage, per_page: 10 },
  );

  if (isLoadingOrg) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dashboard"></div>
      </div>
    );
  }

  const org = orgRes?.data;

  if (!org) {
    return (
      <div className="text-center py-20 bg-white dark:bg-card-dashboard-dark rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl">
        <div className="size-20 bg-slate-50 dark:bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <Building2 className="size-10 text-slate-300" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          Organization not found
        </h2>
        <p className="text-slate-500 mt-2 font-medium">
          The institution you're looking for doesn't exist or has been
          permanently removed.
        </p>
        <Link
          href="/superadmin/organizations"
          className="mt-8 inline-flex items-center gap-2 px-8 py-4 bg-primary-dashboard text-white dark:text-surface-dashboard-dark font-black rounded-2xl hover:bg-primary-dashboard-hover transition-all shadow-xl shadow-primary-dashboard/20"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Directory
        </Link>
      </div>
    );
  }

  const userColumns: Column<User>[] = [
    {
      header: "User Identity",
      render: (user) => (
        <div className="flex items-center gap-3">
          <div className="relative group">
            {user.profile_picture_url ? (
              <div
                className="h-10 w-10 rounded-xl bg-cover bg-center border-2 border-slate-100 dark:border-white/10 group-hover:border-primary-dashboard transition-all"
                style={{ backgroundImage: `url(${user.profile_picture_url})` }}
              />
            ) : (
              <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center border-2 border-slate-100 dark:border-white/10 group-hover:border-primary-dashboard transition-all">
                <Users className="w-5 h-5 text-slate-400 group-hover:text-primary-dashboard transition-colors" />
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 size-4 bg-green-500 rounded-full border-2 border-white dark:border-card-dashboard-dark" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {user.email}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              {user.phone_number || "No Contact Fixed"}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Security Status",
      render: (user) =>
        user.is_active ? (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20 font-black px-3 py-1">
            Verified
          </Badge>
        ) : (
          <Badge
            variant="secondary"
            className="font-black px-3 py-1 text-slate-400"
          >
            Restricted
          </Badge>
        ),
    },
    {
      header: "Onboarding",
      render: (user) => (
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-500">
            {new Date(user.created_at).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">
            Registration Date
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Premium Header Card */}
      <div className="bg-white dark:bg-card-dashboard-dark p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 sm:p-10 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700">
          <Building2 className="w-48 h-48 sm:w-56 sm:h-56 -mr-12 -mt-12 sm:-mr-16 sm:-mt-16 -rotate-12" />
        </div>

        <div className="relative z-10 space-y-6 sm:space-y-8">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-6">
              <Link
                href="/superadmin/organizations"
                className="mt-1 sm:mt-2 p-2.5 sm:p-3 bg-slate-50 dark:bg-white/5 hover:bg-primary-dashboard/10 rounded-xl sm:rounded-2xl transition-all text-slate-400 hover:text-primary-dashboard border border-slate-200 dark:border-white/5"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Link>

              <div className="space-y-2 sm:space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-tight sm:leading-none">
                    {org.name}
                  </h1>
                  <Badge
                    className={cn(
                      "font-black uppercase tracking-widest text-[9px] sm:text-[10px] px-2 sm:px-3 py-1 sm:py-1.5 w-fit",
                      org.is_active
                        ? "bg-green-500 text-white"
                        : "bg-slate-500 text-white",
                    )}
                  >
                    {org.is_active ? "Verified Partner" : "Suspended"}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[10px] sm:text-sm font-bold">
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-100 dark:bg-white/5 rounded-lg sm:rounded-xl text-slate-500">
                    <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="font-mono tracking-tight">{org.slug}</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-primary-dashboard/10 rounded-lg sm:rounded-xl text-primary-dashboard">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[10px] sm:text-xs">
                      {org.official_acronym}
                    </span>
                  </div>
                  {org.deleted_at && (
                    <div className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-red-500/10 rounded-lg sm:rounded-xl text-red-500">
                      <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span className="uppercase tracking-[0.1em] sm:tracking-[0.2em] text-[10px] sm:text-xs font-black">
                        Archived
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <button
                onClick={() => setIsEditModalOpen(true)}
                className="flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl hover:bg-slate-50 dark:hover:bg-white/10 transition-all font-black text-[10px] sm:text-xs uppercase tracking-widest shadow-sm group/btn"
              >
                <Edit2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400 group-hover/btn:text-primary-dashboard transition-colors" />{" "}
                Edit Identity
              </button>
              {activeTab === "users" && (
                <button
                  onClick={() => setIsAssignModalOpen(true)}
                  className="flex items-center justify-center gap-3 px-6 sm:px-7 py-3.5 sm:py-4 bg-primary-dashboard text-white dark:text-surface-dashboard-dark rounded-xl hover:bg-primary-dashboard-hover transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-primary-dashboard/20 hover:-translate-y-1 active:scale-95 group/assign"
                >
                  <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 group-hover/assign:scale-110 transition-transform" />{" "}
                  Mass Assignment
                </button>
              )}
            </div>
          </div>

          {/* Quick Stats Integrated */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="space-y-1 p-4 sm:p-5 bg-slate-50/50 dark:bg-white/5 rounded-2xl border border-slate-100/50 dark:border-white/5">
              <ShieldCheck className="w-4 h-4 text-primary-dashboard mb-1 sm:mb-2" />
              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Admins
              </p>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-none">
                {adminsRes?.meta?.total || 0}
              </h3>
            </div>
            <div className="space-y-1 p-4 sm:p-5 bg-slate-50/50 dark:bg-white/5 rounded-2xl border border-slate-100/50 dark:border-white/5">
              <Users className="w-4 h-4 text-green-500 mb-1 sm:mb-2" />
              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Members
              </p>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-none">
                {usersRes?.meta?.total || 0}
              </h3>
            </div>
            <div className="space-y-1 p-4 sm:p-6 bg-slate-50/50 dark:bg-white/5 rounded-2xl sm:rounded-3xl border border-slate-100/50 dark:border-white/5">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 mb-1 sm:mb-2" />
              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Created
              </p>
              <h3 className="text-sm sm:text-xl font-black text-slate-900 dark:text-white leading-none pt-1">
                {new Date(org.created_at).toLocaleDateString(undefined, {
                  month: "short",
                  year: "numeric",
                })}
              </h3>
            </div>
            <div className="space-y-1 p-4 sm:p-6 bg-slate-50/50 dark:bg-white/5 rounded-2xl sm:rounded-3xl border border-slate-100/50 dark:border-white/5">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500 mb-1 sm:mb-2" />
              <p className="text-[9px] sm:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Last Sync
              </p>
              <h3 className="text-sm sm:text-xl font-black text-slate-900 dark:text-white leading-none pt-1">
                {org.updated_at
                  ? new Date(org.updated_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })
                  : "Initial"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Management Portal */}
      <div className="bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none">
        <div className="flex border-b border-slate-100 dark:border-white/5 p-4 gap-4 bg-slate-50/30 dark:bg-white/[0.02]">
          <button
            onClick={() => setActiveTab("admins")}
            className={cn(
              "px-8 py-5 text-xs font-black uppercase tracking-[0.2em] transition-all rounded-2xl relative flex items-center gap-3",
              activeTab === "admins"
                ? "bg-white dark:bg-white/10 text-primary-dashboard shadow-sm border border-slate-200 dark:border-white/5"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
            )}
          >
            <ShieldCheck className="w-4 h-4" />
            Infrastructure Admins
            {activeTab === "admins" && (
              <span className="absolute top-2 right-2 size-2 bg-primary-dashboard rounded-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={cn(
              "px-8 py-5 text-xs font-black uppercase tracking-[0.2em] transition-all rounded-2xl relative flex items-center gap-3",
              activeTab === "users"
                ? "bg-white dark:bg-white/10 text-primary-dashboard shadow-sm border border-slate-200 dark:border-white/5"
                : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300",
            )}
          >
            <Users className="w-4 h-4" />
            Clinician Network
            {activeTab === "users" && (
              <span className="absolute top-2 right-2 size-2 bg-primary-dashboard rounded-full" />
            )}
          </button>
        </div>

        <div className="p-8">
          {activeTab === "admins" ? (
            <DataTable
              data={adminsRes?.data?.items || []}
              columns={userColumns}
              isLoading={isLoadingAdmins}
              pagination={{
                currentPage: adminsPage,
                totalPages: adminsRes?.meta?.total_pages || 1,
                onPageChange: setAdminsPage,
              }}
              emptyMessage="No privileged administrators have been assigned to this institution yet."
            />
          ) : (
            <DataTable
              data={usersRes?.data?.items || []}
              columns={userColumns}
              isLoading={isLoadingUsers}
              pagination={{
                currentPage: usersPage,
                totalPages: usersRes?.meta?.total_pages || 1,
                onPageChange: setUsersPage,
              }}
              emptyMessage="No clinical members are currently registered under this partner site."
            />
          )}
        </div>
      </div>

      <EditOrganizationModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        organization={org}
      />

      <AssignMemberModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        organizationId={id}
        organizationName={org.name}
      />
    </div>
  );
}
