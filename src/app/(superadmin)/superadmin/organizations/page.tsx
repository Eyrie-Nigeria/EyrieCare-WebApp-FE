"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Edit2,
  Trash2,
  RefreshCw,
  Eye,
  Building2,
  Globe,
} from "lucide-react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import {
  useOrganizations,
  useDeleteOrganization,
  useRestoreOrganization,
} from "@/lib/hooks/useAdmin";
import { Organization } from "@/lib/types/admin";
import { toast } from "sonner";
import { CreateOrganizationModal } from "./create-modal";
import { EditOrganizationModal } from "./edit-modal";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";

export default function OrganizationsPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  const { data: orgsResponse, isLoading } = useOrganizations({
    page,
    per_page: 10,
    search,
    include_deleted: includeDeleted,
  });

  const { mutate: deleteOrg } = useDeleteOrganization();
  const { mutate: restoreOrg } = useRestoreOrganization();

  const handleDelete = (org: Organization) => {
    if (confirm(`Are you sure you want to delete ${org.name}?`)) {
      deleteOrg(org.id, {
        onSuccess: () => toast.success("Organization deleted successfully"),
        onError: () => toast.error("Failed to delete organization"),
      });
    }
  };

  const handleRestore = (org: Organization) => {
    restoreOrg(org.id, {
      onSuccess: () => toast.success("Organization restored successfully"),
      onError: () => toast.error("Failed to restore organization"),
    });
  };

  const columns: Column<Organization>[] = [
    {
      header: "Institution",
      render: (org) => (
        <div className="flex items-center gap-3 group/org">
          <div className="size-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10 group-hover/org:border-primary-dashboard transition-colors">
            <Building2 className="w-5 h-5 text-slate-400 group-hover/org:text-primary-dashboard transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-slate-900 dark:text-white tracking-tight">
              {org.name}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                {org.slug}
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: "Official Acronym",
      render: (org) => (
        <Badge
          variant="eyrie"
          className="font-black uppercase tracking-widest text-[10px]"
        >
          {org.official_acronym}
        </Badge>
      ),
    },
    {
      header: "Identity State",
      render: (org) => {
        if (org.deleted_at) {
          return (
            <Badge
              variant="destructive"
              className="font-black uppercase tracking-wider text-[10px]"
            >
              Archived
            </Badge>
          );
        }
        return org.is_active ? (
          <Badge variant="success" className="font-black">
            Active
          </Badge>
        ) : (
          <Badge variant="secondary" className="font-black opacity-50">
            Inactive
          </Badge>
        );
      },
    },
    {
      header: "Registry Date",
      render: (org) => (
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-500">
            {new Date(org.created_at).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="text-[10px] text-slate-400 uppercase font-black tracking-tighter">
            Authorized on Platform
          </span>
        </div>
      ),
    },
    {
      header: "Operations",
      className: "text-right",
      render: (org) => (
        <div className="flex justify-end gap-2">
          <Link
            href={`/superadmin/organizations/${org.id}`}
            className="p-2.5 hover:bg-primary-dashboard/10 rounded-xl transition-all text-slate-400 hover:text-primary-dashboard border border-transparent hover:border-primary-dashboard/20"
            title="Inspect Registry"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setSelectedOrg(org)}
            className="p-2.5 hover:bg-blue-500/10 rounded-xl transition-all text-slate-400 hover:text-blue-500 border border-transparent hover:border-blue-500/20"
            title="Modify Identity"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          {org.deleted_at ? (
            <button
              onClick={() => handleRestore(org)}
              className="p-2.5 hover:bg-green-500/10 rounded-xl transition-all text-slate-400 hover:text-green-500 border border-transparent hover:border-green-500/20"
              title="Restore Credentials"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => handleDelete(org)}
              className="p-2.5 hover:bg-red-500/10 rounded-xl transition-all text-slate-400 hover:text-red-500 border border-transparent hover:border-red-500/20"
              title="Remove Access"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Premium Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-card-dashboard-dark p-6 sm:p-10 rounded-[2.5rem] border border-slate-200 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group"
      >
        <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700 pointer-events-none">
          <Globe className="w-64 h-64 -mr-16 -mt-16 rotate-12" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="size-12 rounded-[1.25rem] bg-primary-dashboard flex items-center justify-center text-white shadow-xl shadow-primary-dashboard/30">
                <Building2 className="w-6 h-6" />
              </div>
              <Badge className="bg-primary-dashboard/10 text-primary-dashboard border-none font-black text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full">
                Platform Network
              </Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">
              Partner <br />
              <span className="text-primary-dashboard">Directory</span>
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-md font-bold text-sm sm:text-base leading-relaxed">
              Managing the high-availability network of hospital sites and
              clinical partners.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
            <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-[2rem] border border-slate-100 dark:border-white/5 flex items-center gap-8 pr-10">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Total Identities
                </p>
                <p className="text-3xl font-black text-slate-900 dark:text-white leading-none">
                  {orgsResponse?.meta?.total || 0}
                </p>
              </div>
              <div className="h-10 w-px bg-slate-200 dark:bg-white/10" />
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Archives
                </p>
                <label className="flex items-center gap-3 cursor-pointer mt-1 group/toggle">
                  <div
                    className={cn(
                      "w-10 h-5 rounded-full p-1 transition-colors duration-300",
                      includeDeleted
                        ? "bg-primary-dashboard"
                        : "bg-slate-200 dark:bg-white/10",
                    )}
                  >
                    <div
                      className={cn(
                        "size-3 bg-white dark:bg-slate-300 rounded-full transition-transform duration-300",
                        includeDeleted ? "translate-x-5" : "translate-x-0",
                      )}
                    />
                  </div>
                  <input
                    type="checkbox"
                    checked={includeDeleted}
                    onChange={(e) => {
                      setIncludeDeleted(e.target.checked);
                      setPage(1);
                    }}
                    className="hidden"
                  />
                  <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                    Include
                  </span>
                </label>
              </div>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-8 py-5 bg-primary-dashboard text-white dark:text-surface-dashboard-dark font-black rounded-2xl hover:bg-primary-dashboard-hover transition-all shadow-2xl shadow-primary-dashboard/30 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group/btn text-xs uppercase tracking-widest"
            >
              <Plus className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-500" />
              New Identity
            </button>
          </div>
        </div>
      </motion.div>

      {/* Organizations Table Section */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${search}-${includeDeleted}-${page}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <DataTable
            data={orgsResponse?.data || []}
            columns={columns}
            isLoading={isLoading}
            pagination={{
              currentPage: page,
              totalPages: orgsResponse?.meta?.total_pages || 1,
              onPageChange: setPage,
            }}
            search={{
              value: search,
              onChange: (val) => {
                setSearch(val);
                setPage(1);
              },
              placeholder: "Filter partners by name or slug...",
            }}
            emptyMessage="No institutional identities match your current registry filters."
          />
        </motion.div>
      </AnimatePresence>

      <CreateOrganizationModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      {selectedOrg && (
        <EditOrganizationModal
          isOpen={!!selectedOrg}
          onClose={() => setSelectedOrg(null)}
          organization={selectedOrg}
        />
      )}
    </div>
  );
}
