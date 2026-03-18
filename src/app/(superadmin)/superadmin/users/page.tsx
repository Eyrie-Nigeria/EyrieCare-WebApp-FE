"use client";

import { useState } from "react";
import { UserPlus, Mail, ShieldAlert, Edit2, Filter } from "lucide-react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { useUsers, useOrganizations } from "@/lib/hooks/useAdmin";
import { User as UserType } from "@/lib/types/auth";
import { CreateUserModal } from "./create-modal";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [orgFilter, setOrgFilter] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: usersResponse, isLoading: isUsersLoading } = useUsers({
    page,
    per_page: 10,
    search,
    role: roleFilter || undefined,
    organization_id: orgFilter || undefined,
  });

  const { data: orgsResponse } = useOrganizations({ per_page: 100 }); // Get all for filters
  const organizations = orgsResponse?.data?.items || [];

  const columns: Column<UserType>[] = [
    {
      header: "User / Email",
      render: (user) => (
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-500 uppercase font-black text-xs">
            {user.email.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 dark:text-white truncate max-w-[200px]">
              {user.email}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              ID: {user.id.substring(0, 8)}...
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Role",
      render: (user) => {
        const role = user.role.toLowerCase();

        if (role === "superadmin") {
          return (
            <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20">
              {role}
            </Badge>
          );
        } else if (role === "admin") {
          return (
            <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20">
              {role}
            </Badge>
          );
        }

        return <Badge variant="eyrie">{role}</Badge>;
      },
    },
    {
      header: "Organization",
      render: (user) => {
        const org = organizations.find((o) => o.id === user.organization_id);
        return (
          <span className="font-bold text-slate-600 dark:text-slate-400">
            {org ? org.name : "Unassigned"}
          </span>
        );
      },
    },
    {
      header: "Status",
      render: (user) =>
        user.is_active ? (
          <Badge variant="success">Active</Badge>
        ) : (
          <Badge variant="secondary">Inactive</Badge>
        ),
    },
    {
      header: "Actions",
      className: "text-right",
      render: () => (
        <div className="flex justify-end gap-2">
          <button
            className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-primary-dashboard"
            title="Send Invite"
          >
            <Mail className="w-4 h-4" />
          </button>
          <button
            className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-blue-500"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-lg transition-colors text-slate-400 hover:text-red-500"
            title="Deactivate"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Global User Directory
          </h1>
          <p className="text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark mt-1">
            Manage roles and access for all system participants.
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary-dashboard text-white dark:text-surface-dashboard-dark font-black rounded-xl hover:bg-primary-dashboard-hover transition-all shadow-lg shadow-primary-dashboard/20"
        >
          <UserPlus className="w-5 h-5" /> Create New User
        </button>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-wrap items-center gap-4 bg-white/50 dark:bg-card-dashboard-dark/30 p-4 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">
            Filters
          </span>
        </div>

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          className="bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-dashboard/30 transition-all text-slate-700 dark:text-white"
        >
          <option value="">All Roles</option>
          <option value="superadmin">Superadmin</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <select
          value={orgFilter}
          onChange={(e) => setOrgFilter(e.target.value)}
          className="bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-dashboard/30 transition-all text-slate-700 dark:text-white max-w-[200px]"
        >
          <option value="">All Organizations</option>
          {organizations.map((org) => (
            <option key={org.id} value={org.id}>
              {org.name}
            </option>
          ))}
          <option value="unassigned">Unassigned Only</option>
        </select>
      </div>

      <DataTable
        data={usersResponse?.data?.items || []}
        columns={columns}
        isLoading={isUsersLoading}
        pagination={{
          currentPage: page,
          totalPages: usersResponse?.meta?.total_pages || 1,
          onPageChange: setPage,
        }}
        search={{
          value: search,
          onChange: setSearch,
          placeholder: "Search users by email...",
        }}
        emptyMessage="No users matching your criteria were found."
      />

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        organizations={organizations}
      />
    </div>
  );
}
