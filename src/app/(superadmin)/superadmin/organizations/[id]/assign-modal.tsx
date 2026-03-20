"use client";

import { useState } from "react";
import { X, Search, Loader2, UserPlus, CheckCircle2 } from "lucide-react";
import { useUnassignedUsers, useBulkAssignUsers } from "@/lib/hooks/useAdmin";
import { Badge } from "@/components/ui/badge";
import { User } from "@/lib/types/auth";
import { toast } from "sonner";
import { cn } from "@/lib/cn";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
  organizationName: string;
}

export function AssignMemberModal({
  isOpen,
  onClose,
  organizationId,
  organizationName,
}: Props) {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Fetch users who are NOT assigned to any organization
  const { data: usersRes, isLoading } = useUnassignedUsers({
    page: 1,
    per_page: 100, // Fetch more for selection
  });

  const unassignedUsers = usersRes?.data || [];

  const { mutate: bulkAssign, isPending } = useBulkAssignUsers();

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleAssign = () => {
    if (selectedIds.length === 0) return;

    bulkAssign(
      {
        orgId: organizationId,
        data: { user_ids: selectedIds },
      },
      {
        onSuccess: () => {
          toast.success(
            `Successfully assigned ${selectedIds.length} members to ${organizationName}`,
          );
          setSelectedIds([]);
          onClose();
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to transfer member credentials");
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-2xl bg-white dark:bg-card-dashboard-dark rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/5 overflow-hidden animate-in fade-in zoom-in duration-300 mx-4 sm:mx-0">
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Mass Assignment
            </h2>
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              Assigning to{" "}
              <span className="text-primary-dashboard truncate max-w-[150px] sm:max-w-none">
                {organizationName}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 sm:p-3 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl sm:rounded-2xl transition-all"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-5 sm:space-y-6">
          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-focus-within:text-primary-dashboard transition-colors" />
            <input
              type="text"
              placeholder="Identify users by email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 sm:pl-12 pr-6 py-3.5 sm:py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-primary-dashboard/10 focus:border-primary-dashboard/50 focus:outline-none text-slate-900 dark:text-white text-sm font-black transition-all"
            />
          </div>

          {/* User List */}
          <div className="max-h-[300px] sm:max-h-[350px] overflow-y-auto space-y-2 pr-1 sm:pr-2 custom-scrollbar">
            {isLoading ? (
              <div className="py-16 sm:py-20 flex flex-col items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 text-primary-dashboard animate-spin" />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Synchronizing Registry...
                </p>
              </div>
            ) : unassignedUsers.length > 0 ? (
              unassignedUsers.map((user: User) => (
                <button
                  key={user.id}
                  onClick={() => toggleSelect(user.id)}
                  className={cn(
                    "w-full p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border transition-all flex items-center justify-between group/item",
                    selectedIds.includes(user.id)
                      ? "bg-primary-dashboard/10 border-primary-dashboard/30 shadow-sm"
                      : "bg-white dark:bg-white/5 border-slate-100 dark:border-white/5 hover:border-slate-200 dark:hover:border-white/10 shadow-sm hover:shadow-md",
                  )}
                >
                  <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                    <div
                      className={cn(
                        "size-9 sm:size-10 rounded-lg sm:rounded-xl flex items-center justify-center transition-all shrink-0",
                        selectedIds.includes(user.id)
                          ? "bg-primary-dashboard text-white scale-110"
                          : "bg-slate-100 dark:bg-white/10 text-slate-400",
                      )}
                    >
                      {selectedIds.includes(user.id) ? (
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <UserPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </div>
                    <div className="text-left overflow-hidden">
                      <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white tracking-tight truncate">
                        {user.email}
                      </p>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate">
                        {user.phone_number || "Identity Verified"}
                      </p>
                    </div>
                  </div>
                  {selectedIds.includes(user.id) && (
                    <Badge className="bg-primary-dashboard text-white font-black text-[9px] sm:text-[10px] shrink-0">
                      SELECTED
                    </Badge>
                  )}
                </button>
              ))
            ) : (
              <div className="py-16 sm:py-20 text-center space-y-4">
                <div className="size-14 sm:size-16 bg-slate-50 dark:bg-white/5 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto opacity-50">
                  <UserPlus className="size-6 sm:size-8 text-slate-300" />
                </div>
                <p className="text-xs sm:text-sm font-black text-slate-400 uppercase tracking-widest">
                  No unassigned members found
                </p>
              </div>
            )}
          </div>

          {/* Bottom Actions */}
          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-[0.1em] sm:tracking-widest order-2 sm:order-1">
              {selectedIds.length} Identities Selected
            </p>
            <div className="flex w-full sm:w-auto gap-3 sm:gap-4 order-1 sm:order-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-none px-6 sm:px-8 py-3.5 sm:py-4 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-black rounded-xl sm:rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all uppercase tracking-widest text-[10px] sm:text-xs"
              >
                Discard
              </button>
              <button
                onClick={handleAssign}
                disabled={selectedIds.length === 0 || isPending}
                className="flex-2 sm:flex-none px-6 sm:px-8 py-3.5 sm:py-4 bg-primary-dashboard text-white dark:text-surface-dashboard-dark font-black rounded-xl sm:rounded-2xl hover:bg-primary-dashboard-hover transition-all shadow-xl shadow-primary-dashboard/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase tracking-widest text-[10px] sm:text-xs"
              >
                {isPending ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <UserPlus className="w-4 h-4" />
                )}
                {isPending ? "Executing..." : "Commit Assignment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
