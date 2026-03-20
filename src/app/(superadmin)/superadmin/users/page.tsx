"use client";

import { useState, useMemo } from "react";
import {
  UserPlus,
  ShieldAlert,
  Edit2,
  Filter,
  Eye,
  Search as SearchIcon,
  XCircle,
  Users as UsersIcon,
  ShieldCheck,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import {
  useUsers,
  useOrganizations,
  useUnassignedUsers,
  useUnassignedAdmins,
} from "@/lib/hooks/useAdmin";
import { User as UserType } from "@/lib/types/auth";
import { CreateUserModal } from "./create-modal";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

export default function UsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [orgFilter, setOrgFilter] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: orgsResponse } = useOrganizations({ per_page: 100 });
  const organizations = orgsResponse?.data || [];

  // Data fetching logic based on filters
  const isUnassignedOnly = orgFilter === "unassigned";
  const isAdminOnly = roleFilter === "admin";

  const usersQuery = useUsers({
    page,
    per_page: 10,
    search,
    role: roleFilter || undefined,
    organization_id: isUnassignedOnly ? undefined : orgFilter || undefined,
  });

  const unassignedUsersQuery = useUnassignedUsers({
    page,
    per_page: 10,
  });

  const unassignedAdminsQuery = useUnassignedAdmins({
    page,
    per_page: 10,
  });

  // Pick the correct data source
  const activeQuery = useMemo(() => {
    if (isUnassignedOnly) {
      if (isAdminOnly) return unassignedAdminsQuery;
      return unassignedUsersQuery;
    }
    return usersQuery;
  }, [
    isUnassignedOnly,
    isAdminOnly,
    usersQuery,
    unassignedUsersQuery,
    unassignedAdminsQuery,
  ]);

  const usersResponse = activeQuery.data;
  const isUsersLoading = activeQuery.isLoading;

  const columns: Column<UserType>[] = [
    {
      header: "User / Email",
      render: (user) => (
        <div className="flex items-center gap-3 group/user">
          <div className="size-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 uppercase font-black text-sm border border-slate-200 dark:border-white/10 group-hover/user:border-primary-dashboard/50 transition-colors">
            {user.email.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-black text-slate-900 dark:text-white truncate max-w-[200px] tracking-tight">
              {user.email}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
              ID: {user.id.substring(0, 8)}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Role / Access",
      render: (user) => {
        const role = user.role.toLowerCase();

        return (
          <div className="flex items-center gap-2">
            {role === "superadmin" ? (
              <Badge className="bg-purple-500/10 text-purple-500 border-purple-500/20 font-black uppercase tracking-wider text-[10px]">
                <ShieldCheck className="w-3 h-3 mr-1" /> {role}
              </Badge>
            ) : role === "admin" ? (
              <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 font-black uppercase tracking-wider text-[10px]">
                <ShieldCheck className="w-3 h-3 mr-1" /> {role}
              </Badge>
            ) : (
              <Badge
                variant="eyrie"
                className="font-black uppercase tracking-wider text-[10px]"
              >
                {role}
              </Badge>
            )}
          </div>
        );
      },
    },
    {
      header: "Institutional Link",
      render: (user) => {
        const org = organizations.find((o) => o.id === user.organization_id);
        return (
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "size-2 rounded-full",
                org ? "bg-emerald-500" : "bg-slate-300 dark:bg-slate-600",
              )}
            />
            <span className="font-black text-sm text-slate-600 dark:text-slate-400 uppercase tracking-tighter">
              {org ? org.name : "Unassigned Identity"}
            </span>
          </div>
        );
      },
    },
    {
      header: "State",
      render: (user) =>
        user.is_active ? (
          <Badge variant="success" className="font-black">
            Active
          </Badge>
        ) : (
          <Badge variant="secondary" className="font-black opacity-50">
            Inactive
          </Badge>
        ),
    },
    {
      header: "Operations",
      className: "text-right",
      render: (user) => (
        <div className="flex justify-end gap-2">
          <Link
            href={`/superadmin/users/${user.id}`}
            className="p-2.5 hover:bg-primary-dashboard/10 rounded-xl transition-all text-slate-400 hover:text-primary-dashboard border border-transparent hover:border-primary-dashboard/20"
            title="Examine Registry"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-blue-500 border border-transparent hover:border-blue-500/20"
            title="Modify Profile"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            className="p-2.5 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all text-slate-400 hover:text-red-500 border border-transparent hover:border-red-500/20"
            title="Revoke Access"
          >
            <ShieldAlert className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
      >
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
            User <span className="text-primary-dashboard">Registry</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-tight flex items-center gap-2">
            <UsersIcon className="w-4 h-4 text-primary-dashboard" />
            Managing global system identities and access permissions.
          </p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-primary-dashboard text-white dark:text-surface-dashboard-dark font-black rounded-2xl hover:bg-primary-dashboard-hover transition-all shadow-xl shadow-primary-dashboard/30 active:scale-95 group uppercase tracking-widest text-xs"
        >
          <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Initialize New User
        </button>
      </motion.div>

      {/* Filters Toolbar - Enhanced Responsiveness */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white dark:bg-card-dashboard-dark/30 p-5 rounded-[2rem] border border-slate-200/60 dark:border-white/5 shadow-sm backdrop-blur-sm"
      >
        <div className="relative group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-dashboard transition-colors" />
          <input
            type="text"
            placeholder="Search email..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[1.25rem] text-sm font-black focus:outline-none focus:ring-4 focus:ring-primary-dashboard/10 focus:border-primary-dashboard/50 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 uppercase tracking-tighter"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-red-500 transition-colors"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => {
              setRoleFilter(e.target.value);
              setPage(1);
            }}
            className="w-full appearance-none bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[1.25rem] px-5 py-3 text-sm font-black focus:outline-none focus:ring-4 focus:ring-primary-dashboard/10 focus:border-primary-dashboard/50 transition-all text-slate-900 dark:text-white uppercase tracking-wider"
          >
            <option value="">System-wide Roles</option>
            <option value="superadmin">Super-Administrators</option>
            <option value="admin">Institutional Admins</option>
            <option value="user">Registered Clinicians</option>
          </select>
          <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={orgFilter}
            onChange={(e) => {
              setOrgFilter(e.target.value);
              setPage(1);
            }}
            className="w-full appearance-none bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-[1.25rem] px-5 py-3 text-sm font-black focus:outline-none focus:ring-4 focus:ring-primary-dashboard/10 focus:border-primary-dashboard/50 transition-all text-slate-900 dark:text-white uppercase tracking-wider"
          >
            <option value="">All Affiliations</option>
            <optgroup label="Registered Organizations">
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </optgroup>
            <optgroup label="Special Filters">
              <option value="unassigned">Unassigned Identities Only</option>
            </optgroup>
          </select>
          <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>

        {/* Clear Filters Button - Mobile Friendly */}
        {(roleFilter || orgFilter || search) && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => {
              setRoleFilter("");
              setOrgFilter("");
              setSearch("");
              setPage(1);
            }}
            className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors flex items-center justify-center gap-2 px-4"
          >
            <XCircle className="w-4 h-4" /> Reset Filters
          </motion.button>
        )}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${orgFilter}-${roleFilter}-${search}-${page}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <DataTable
            data={usersResponse?.data || []}
            columns={columns}
            isLoading={isUsersLoading}
            pagination={{
              currentPage: page,
              totalPages: usersResponse?.meta?.total_pages || 1,
              onPageChange: setPage,
            }}
            emptyMessage="The registry has no entries matching your current parameters."
          />
        </motion.div>
      </AnimatePresence>

      <CreateUserModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        organizations={organizations}
      />
    </div>
  );
}
