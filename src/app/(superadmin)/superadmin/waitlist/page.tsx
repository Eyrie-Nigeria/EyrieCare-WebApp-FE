"use client";

import { useState } from "react";
import { UserCheck, Clock } from "lucide-react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import {
  useUnapprovedUsers,
  useGrantAccess,
  useBulkGrantAccess,
} from "@/lib/hooks/useAdmin";
import { WaitlistEntry } from "@/lib/types/admin";
import { toast } from "sonner";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence } from "framer-motion";

export default function WaitlistPage() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const { data: waitlistResponse, isLoading } = useUnapprovedUsers({
    page,
    per_page: itemsPerPage,
  });

  const { mutate: grantAccess, isPending: isGranting } = useGrantAccess();
  const { mutate: bulkGrant, isPending: isBulkGranting } = useBulkGrantAccess();

  const handleGrantAccess = (id: number) => {
    grantAccess(id, {
      onSuccess: () => {
        toast.success("Access granted successfully");
      },
      onError: (err: unknown) => {
        const error = err as Error;
        toast.error(error.message || "Failed to grant access");
      },
    });
  };

  const handleBulkGrant = () => {
    const ids = selectedIds.map((id) => parseInt(id, 10));
    bulkGrant(ids, {
      onSuccess: () => {
        toast.success(`Successfully granted access to ${ids.length} users`);
        setSelectedIds([]);
      },
      onError: (err: unknown) => {
        const error = err as Error;
        toast.error(error.message || "Failed to perform bulk approval");
      },
    });
  };

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
        if (role === "student")
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
      render: (entry) => (
        <Badge variant={entry.grantedAccess ? "success" : "warning"}>
          {entry.grantedAccess ? "Approved" : "Pending"}
        </Badge>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      render: (entry) => (
        <div className="flex justify-end items-center gap-2">
          {!entry.grantedAccess ? (
            <button
              onClick={() => handleGrantAccess(entry.id)}
              disabled={isGranting}
              className="group/btn h-9 px-4 bg-primary-dashboard/10 hover:bg-primary-dashboard text-primary-dashboard hover:text-white dark:text-primary-dashboard dark:hover:text-surface-dashboard-dark font-black rounded-xl transition-all text-[10px] uppercase tracking-wider disabled:opacity-50 shadow-sm shadow-primary-dashboard/5 flex items-center gap-2"
              title="Grant Access"
            >
              <UserCheck className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
              <span>Grant</span>
            </button>
          ) : (
            <span className="text-[10px] font-black uppercase text-slate-400 px-4">
              Access Granted
            </span>
          )}
        </div>
      ),
    },
  ];

  const waitlistData = waitlistResponse?.data || [];

  return (
    <div className="space-y-8 pb-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center justify-between gap-6"
      >
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 border border-orange-500/20">
              <Clock className="w-5 h-5" />
            </div>
            <Badge className="bg-orange-500/10 text-orange-500 border-none font-black text-[10px] uppercase tracking-widest px-3 py-1">
              Pending Authorization
            </Badge>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none">
            Waitlist <span className="text-primary-dashboard">Queue</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-tight flex items-center gap-2">
            Confirm and provision access for new platform participants.
          </p>
        </div>

        <AnimatePresence>
          {selectedIds.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 20 }}
              className="flex items-center gap-4 bg-primary-dashboard/10 border border-primary-dashboard/20 p-3 pl-5 rounded-2xl shadow-xl shadow-primary-dashboard/10 backdrop-blur-sm"
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary-dashboard/60">
                  Batch Operations
                </span>
                <span className="text-sm font-black text-primary-dashboard whitespace-nowrap">
                  {selectedIds.length} Selected Identities
                </span>
              </div>
              <button
                onClick={handleBulkGrant}
                disabled={isBulkGranting}
                className="flex items-center gap-2 px-6 py-3 bg-primary-dashboard text-white dark:text-surface-dashboard-dark font-black rounded-xl hover:bg-primary-dashboard-hover transition-all shadow-lg active:scale-95 disabled:opacity-50 uppercase tracking-widest text-[10px]"
              >
                {isBulkGranting ? "Authorizing..." : "Grant All Access"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Waitlist Table Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${search}-${page}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <DataTable
            data={waitlistData}
            columns={columns}
            isLoading={isLoading}
            selection={{
              selectedIds,
              onSelectionChange: setSelectedIds,
              getRowId: (entry) => entry.id.toString(),
            }}
            pagination={{
              currentPage: page,
              totalPages: waitlistResponse?.meta?.total_pages || 1,
              onPageChange: setPage,
            }}
            emptyMessage={
              search
                ? "The registry has no entries matching your current parameters."
                : "The authorization queue is currently empty."
            }
            search={{
              value: search,
              onChange: (val: string) => {
                setSearch(val);
                setPage(1);
              },
              placeholder: "Filter waitlist by email...",
            }}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
