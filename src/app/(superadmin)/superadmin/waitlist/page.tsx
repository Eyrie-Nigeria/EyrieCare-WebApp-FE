"use client";

import { useState, useMemo } from "react";
import { UserCheck, UserX, Send, Filter } from "lucide-react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { useUnapprovedUsers, useGrantAccess } from "@/lib/hooks/useAdmin";
import { WaitlistEntry } from "@/lib/types/admin";
import { toast } from "sonner";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence } from "framer-motion";

export default function WaitlistPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const { data: waitlistResponse, isLoading } = useUnapprovedUsers();
  const { mutate: grantAccess, isPending: isGranting } = useGrantAccess();

  const handleGrantAccess = (id: number) => {
    grantAccess(id, {
      onSuccess: () => {
        toast.success("Access granted successfully");
      },
      onError: () => {
        toast.error("Failed to grant access");
      },
    });
  };

  const handleBulkGrant = () => {
    toast.info(
      `Granting access to ${selectedIds.length} users... (Bulk API implementation pending)`,
    );
    setSelectedIds([]);
  };

  // Filtering & Search
  const filteredData = useMemo(() => {
    const dataToUse = waitlistResponse?.data || [];
    let data = [...dataToUse];

    // Filter by search
    if (search) {
      data = data.filter((entry) =>
        entry.email.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // Filter by role
    if (roleFilter) {
      data = data.filter(
        (entry) => entry.role.toLowerCase() === roleFilter.toLowerCase(),
      );
    }

    // Filter by status
    if (statusFilter) {
      if (statusFilter === "approved") {
        data = data.filter((entry) => entry.grantedAccess === true);
      } else if (statusFilter === "pending") {
        data = data.filter((entry) => entry.grantedAccess === false);
      }
    }

    return data;
  }, [waitlistResponse, search, roleFilter, statusFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, page, itemsPerPage]);

  const columns: Column<WaitlistEntry>[] = [
    {
      header: "User / Email",
      render: (entry) => (
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-primary-dashboard/10 dark:bg-primary-dashboard/20 flex items-center justify-center text-primary-dashboard uppercase font-black text-xs">
            {entry.email.charAt(0)}
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 dark:text-white truncate max-w-[250px]">
              {entry.email}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
              Waitlist ID: {entry.id}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Requested Role",
      render: (entry) => {
        const role = entry.role.toLowerCase();
        let colorClasses = "bg-blue-500/10 text-blue-500 border-blue-500/20";
        if (role === "doctor")
          colorClasses =
            "bg-purple-500/10 text-purple-500 border-purple-500/20";
        if (role === "admin")
          colorClasses =
            "bg-orange-500/10 text-orange-500 border-orange-500/20";

        return (
          <Badge
            variant="outline"
            className={cn("capitalize font-black tracking-wide", colorClasses)}
          >
            {role}
          </Badge>
        );
      },
    },
    {
      header: "Signed Up",
      render: (entry) => (
        <span className="font-bold text-slate-600 dark:text-slate-400 text-xs">
          {new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }).format(new Date(entry.createdAt))}
        </span>
      ),
    },
    {
      header: "Status",
      render: (entry) =>
        entry.grantedAccess ? (
          <Badge variant="success">Approved</Badge>
        ) : (
          <Badge variant="warning">Pending</Badge>
        ),
    },
    {
      header: "Actions",
      className: "text-right",
      render: (entry) => (
        <div className="flex justify-end items-center gap-2">
          {!entry.grantedAccess && (
            <button
              onClick={() => handleGrantAccess(entry.id)}
              disabled={isGranting}
              className="group/btn h-9 px-4 bg-primary-dashboard/10 hover:bg-primary-dashboard text-primary-dashboard hover:text-white dark:text-primary-dashboard dark:hover:text-surface-dashboard-dark font-black rounded-xl transition-all text-[10px] uppercase tracking-wider disabled:opacity-50 shadow-sm shadow-primary-dashboard/5 flex items-center gap-2"
              title="Grant Access"
            >
              <UserCheck className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
              <span>Grant</span>
            </button>
          )}
          <button
            onClick={() =>
              toast.info(
                `${entry.grantedAccess ? "Revoke" : "Reject"} access implementation pending`,
              )
            }
            className="group/btn h-9 px-4 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white font-black rounded-xl transition-all text-[10px] uppercase tracking-wider shadow-sm shadow-red-500/5 flex items-center gap-2"
            title={entry.grantedAccess ? "Revoke Access" : "Reject Application"}
          >
            <UserX className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
            <span>{entry.grantedAccess ? "Revoke" : "Reject"}</span>
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
            Waitlist Management
          </h1>
          <p className="text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark mt-1">
            Review and approve access for new signups.
          </p>
        </div>

        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-3 bg-primary-dashboard/5 border border-primary-dashboard/20 p-2 pl-4 rounded-xl shadow-sm shadow-primary-dashboard/5"
            >
              <span className="text-sm font-bold text-primary-dashboard whitespace-nowrap">
                {selectedIds.length} users selected
              </span>
              <button
                onClick={handleBulkGrant}
                className="flex items-center gap-2 px-4 py-2 bg-primary-dashboard text-white dark:text-surface-dashboard-dark font-black rounded-lg hover:bg-primary-dashboard-hover transition-all shadow-md shadow-primary-dashboard/20 active:scale-95"
              >
                <Send className="w-4 h-4" /> Grant Access
              </button>
            </motion.div>
          )}
        </AnimatePresence>
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
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setPage(1);
          }}
          className="bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-dashboard/30 transition-all text-slate-700 dark:text-white"
        >
          <option value="">All Roles</option>
          <option value="student">Student</option>
          <option value="doctor">Doctor</option>
          <option value="admin">Admin</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-white/10 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-dashboard/30 transition-all text-slate-700 dark:text-white"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
        </select>
      </div>

      <DataTable
        data={paginatedData}
        columns={columns}
        isLoading={isLoading}
        selection={{
          selectedIds,
          onSelectionChange: setSelectedIds,
          getRowId: (entry) => entry.id.toString(),
        }}
        pagination={{
          currentPage: page,
          totalPages: totalPages,
          onPageChange: setPage,
        }}
        emptyMessage={
          search || roleFilter || statusFilter
            ? "No entries match your filters."
            : "The waitlist is currently empty."
        }
        search={{
          value: search,
          onChange: (val) => {
            setSearch(val);
            setPage(1);
          },
          placeholder: "Search by email...",
        }}
      />
    </div>
  );
}
