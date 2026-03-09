"use client";

import { useState } from "react";
import {
  Building2,
  Users,
  UserPlus,
  Mail,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import {
  useMyOrganizationAdmins,
  useMyOrganizationUsers,
  useOrganizations,
  useBulkRemoveUsers,
  useSearchUsersByEmail,
} from "@/lib/hooks/useAdmin";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { User as UserType } from "@/lib/types/auth";
import { cn } from "@/lib/cn";
import { toast } from "sonner";
import { InviteUserModal } from "./invite-modal";

export default function MyOrganizationPage() {
  const user = useAuthStore((state) => state.user);
  const [activeTab, setActiveTab] = useState<"users" | "admins">("users");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // Fetch the organization details
  const { data: orgsResponse } = useOrganizations({ per_page: 100 });
  const myOrg = orgsResponse?.data?.items.find(
    (o) => o.id === user?.organization_id,
  );

  // Use specialized hooks for Admins vs Users
  const adminsQuery = useMyOrganizationAdmins({ page, per_page: 10 });
  const usersQuery = useMyOrganizationUsers({ page, per_page: 10 });
  const searchQuery = useSearchUsersByEmail({ q: search, page, per_page: 10 });

  // Switch between normal list and search results
  const { data: membersResponse, isLoading } = search
    ? searchQuery
    : activeTab === "admins"
      ? adminsQuery
      : usersQuery;

  const { mutate: bulkRemove } = useBulkRemoveUsers();

  const handleBulkRemove = () => {
    if (!user?.organization_id) return;
    if (
      confirm(`Are you sure you want to remove ${selectedIds.length} members?`)
    ) {
      bulkRemove(
        {
          orgId: user.organization_id,
          data: { user_ids: selectedIds },
        },
        {
          onSuccess: () => {
            toast.success("Members removed successfully");
            setSelectedIds([]);
          },
          onError: () => toast.error("Failed to remove members"),
        },
      );
    }
  };

  const columns: Column<UserType>[] = [
    {
      header: "Member Profile",
      render: (member) => (
        <div className="flex items-center gap-4">
          <div className="size-10 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 uppercase font-black text-sm border border-slate-200 dark:border-white/5">
            {member.email.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              {member.email}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                Registered {new Date(member.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Access Status",
      render: (member) =>
        member.is_active ? (
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
      header: "Administrative Actions",
      className: "text-right",
      render: (member) =>
        activeTab === "users" ? (
          <div className="flex justify-end gap-2">
            <button
              className="p-2 hover:bg-primary-dashboard/10 rounded-xl transition-all text-slate-400 hover:text-primary-dashboard border border-transparent hover:border-primary-dashboard/20"
              title="Resend Access Invite"
              onClick={() =>
                toast.success(`Invitation resent to ${member.email}`)
              }
            >
              <Mail className="w-4 h-4" />
            </button>
            <button
              className="p-2 hover:bg-red-500/10 rounded-xl transition-all text-slate-400 hover:text-red-500 border border-transparent hover:border-red-500/20"
              title="Deauthorize Member"
              onClick={() => {
                if (
                  user?.organization_id &&
                  confirm(`Remove ${member.email}?`)
                ) {
                  bulkRemove(
                    {
                      orgId: user.organization_id,
                      data: { user_ids: [member.id] },
                    },
                    {
                      onSuccess: () => toast.success("Member removed"),
                    },
                  );
                }
              }}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <Badge
            variant="outline"
            className="text-[10px] font-black uppercase tracking-widest border-slate-200 dark:border-white/10 text-slate-400"
          >
            Read Only
          </Badge>
        ),
    },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Premium Hero Section */}
      <div className="bg-white dark:bg-card-dashboard-dark p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 sm:p-10 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700">
          <Building2 className="w-48 h-48 sm:w-56 sm:h-56 -mr-12 -mt-12 sm:-mr-16 sm:-mt-16 -rotate-12" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-3 mb-1 sm:mb-2">
              <div className="size-10 sm:size-11 rounded-xl bg-primary-dashboard flex items-center justify-center text-white shadow-xl shadow-primary-dashboard/20">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <Badge className="bg-primary-dashboard/10 text-primary-dashboard border-none font-black text-[9px] sm:text-[10px] uppercase tracking-widest px-2.5 sm:px-3 py-1 sm:py-1.5">
                Organization Hub
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight sm:leading-none">
              {myOrg?.name || "Corporate Registry"}
            </h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-bold text-slate-400">
              <span className="uppercase tracking-[0.1em] sm:tracking-[0.2em] bg-slate-100 dark:bg-white/5 px-2 py-1 rounded-lg text-[10px] sm:text-xs font-black">
                {myOrg?.official_acronym || "EYRIE"}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="italic font-mono text-[10px] sm:text-xs">
                {myOrg?.slug || "hq-clinical"}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <div className="bg-slate-50 dark:bg-white/5 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center justify-between sm:justify-start gap-6 sm:gap-8 sm:pr-8">
              <div className="space-y-1">
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Verified Seats
                </p>
                <p className="text-2xl sm:text-2xl font-black text-slate-900 dark:text-white leading-none">
                  {membersResponse?.meta?.total || 0}
                </p>
              </div>
              <div className="h-10 w-px bg-slate-200 dark:bg-white/10" />
              <div className="space-y-1">
                <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Status
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="size-1.5 sm:size-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">
                    Active Hub
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsInviteModalOpen(true)}
              className="px-6 sm:px-8 py-4 sm:py-5 bg-primary-dashboard text-white dark:text-surface-dashboard-dark font-black rounded-2xl sm:rounded-3xl hover:bg-primary-dashboard-hover transition-all shadow-2xl shadow-primary-dashboard/30 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group/btn text-base sm:text-lg"
            >
              <UserPlus className="w-5 h-5 sm:w-6 sm:h-6 group-hover/btn:scale-110 transition-transform" />
              Invite Member
            </button>
          </div>
        </div>
      </div>

      {/* Management Section */}
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex bg-slate-100 dark:bg-white/5 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl w-full sm:w-fit border border-slate-200 dark:border-white/5">
            <button
              onClick={() => {
                setActiveTab("users");
                setPage(1);
                setSelectedIds([]);
              }}
              className={cn(
                "flex-1 sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-[0.1em] sm:tracking-widest transition-all relative flex items-center justify-center sm:justify-start gap-2",
                activeTab === "users"
                  ? "bg-white dark:bg-card-dashboard-dark text-primary-dashboard shadow-sm border border-slate-200 dark:border-white/5"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-white",
              )}
            >
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Clinical Members
            </button>
            <button
              onClick={() => {
                setActiveTab("admins");
                setPage(1);
                setSelectedIds([]);
              }}
              className={cn(
                "flex-1 sm:flex-none px-4 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-[0.1em] sm:tracking-widest transition-all relative flex items-center justify-center sm:justify-start gap-2",
                activeTab === "admins"
                  ? "bg-white dark:bg-card-dashboard-dark text-primary-dashboard shadow-sm border border-slate-200 dark:border-white/5"
                  : "text-slate-400 hover:text-slate-600 dark:hover:text-white",
              )}
            >
              <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Security Admins
            </button>
          </div>

          <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4">
            {selectedIds.length > 0 && (
              <button
                onClick={handleBulkRemove}
                className="flex items-center gap-3 px-6 py-4 bg-red-500/10 text-red-500 font-black rounded-2xl hover:bg-red-500 hover:text-white transition-all border border-red-500/20 shadow-lg shadow-red-500/10 uppercase tracking-widest text-xs"
              >
                <Trash2 className="w-4 h-4" /> Deauthorize ({selectedIds.length}
                )
              </button>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-card-dashboard-dark rounded-[2.5rem] border border-slate-200 dark:border-white/5 overflow-hidden shadow-2xl shadow-slate-200/50 dark:shadow-none p-2">
          <DataTable
            data={membersResponse?.data?.items || []}
            columns={columns}
            isLoading={isLoading}
            selection={
              activeTab === "users"
                ? {
                    selectedIds,
                    onSelectionChange: setSelectedIds,
                    getRowId: (m) => m.id,
                  }
                : undefined
            }
            search={{
              value: search,
              onChange: setSearch,
              placeholder: `Global search across ${activeTab} registry...`,
            }}
            pagination={{
              currentPage: page,
              totalPages: membersResponse?.meta?.total_pages || 1,
              onPageChange: setPage,
            }}
            emptyMessage={`No registration signatures found for ${activeTab}.`}
          />
        </div>
      </div>

      <InviteUserModal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        organizationId={user?.organization_id || ""}
      />
    </div>
  );
}
