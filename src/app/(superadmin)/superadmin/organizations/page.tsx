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
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10 group-hover:bg-primary-dashboard/10 transition-colors">
            <Building2 className="w-5 h-5 text-slate-400 group-hover:text-primary-dashboard transition-colors" />
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
      header: "Acronym",
      render: (org) => (
        <Badge className="bg-primary-dashboard/10 text-primary-dashboard border-primary-dashboard/20 font-black px-3 py-1">
          {org.official_acronym}
        </Badge>
      ),
    },
    {
      header: "Status",
      render: (org) => {
        if (org.deleted_at) {
          return (
            <Badge variant="destructive" className="font-black">
              Deleted
            </Badge>
          );
        }
        return org.is_active ? (
          <Badge className="bg-green-500/10 text-green-500 border-green-500/20 font-black">
            Active
          </Badge>
        ) : (
          <Badge variant="secondary" className="font-black">
            Inactive
          </Badge>
        );
      },
    },
    {
      header: "Activity",
      render: (org) => (
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-500">
            {new Date(org.created_at).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
            Registration Date
          </span>
        </div>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      render: (org) => (
        <div className="flex justify-end gap-2">
          <Link
            href={`/superadmin/organizations/${org.id}`}
            className="p-2 hover:bg-primary-dashboard/10 rounded-xl transition-all text-slate-400 hover:text-primary-dashboard border border-transparent hover:border-primary-dashboard/20"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setSelectedOrg(org)}
            className="p-2 hover:bg-blue-500/10 rounded-xl transition-all text-slate-400 hover:text-blue-500 border border-transparent hover:border-blue-500/20"
            title="Edit"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          {org.deleted_at ? (
            <button
              onClick={() => handleRestore(org)}
              className="p-2 hover:bg-green-500/10 rounded-xl transition-all text-slate-400 hover:text-green-500 border border-transparent hover:border-green-500/20"
              title="Restore"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => handleDelete(org)}
              className="p-2 hover:bg-red-500/10 rounded-xl transition-all text-slate-400 hover:text-red-500 border border-transparent hover:border-red-500/20"
              title="Delete"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 pb-20">
      {/* Premium Hero Section */}
      <div className="bg-white dark:bg-card-dashboard-dark p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 sm:p-10 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700">
          <Globe className="w-48 h-48 sm:w-56 sm:h-56 -mr-12 -mt-12 sm:-mr-16 sm:-mt-16 rotate-12" />
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <div className="size-10 sm:size-11 rounded-xl bg-primary-dashboard flex items-center justify-center text-white shadow-xl shadow-primary-dashboard/20">
                <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <Badge className="bg-primary-dashboard/10 text-primary-dashboard border-none font-black text-[10px] uppercase tracking-widest px-3 py-1">
                Network Directory
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              Institutional <br className="hidden sm:block" />
              Partners
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-md font-medium text-sm sm:text-base leading-relaxed">
              Manage your global network of hospitals, clinics, and academic
              sites from a unified control plane.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6">
            <div className="bg-slate-50 dark:bg-white/5 p-4 sm:p-5 rounded-2xl border border-slate-100 dark:border-white/5 flex items-center justify-between sm:justify-start gap-4 sm:gap-6 sm:pr-8">
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Total Partners
                </p>
                <p className="text-2xl sm:text-2xl font-black text-slate-900 dark:text-white leading-none">
                  {orgsResponse?.meta?.total || 0}
                </p>
              </div>
              <div className="h-10 w-px bg-slate-200 dark:bg-white/10" />
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  Archives
                </p>
                <label className="flex items-center gap-2 cursor-pointer mt-1">
                  <input
                    type="checkbox"
                    checked={includeDeleted}
                    onChange={(e) => setIncludeDeleted(e.target.checked)}
                    className="size-4 rounded border-slate-300 dark:border-white/10 text-primary-dashboard focus:ring-primary-dashboard bg-transparent transition-all"
                  />
                  <span className="text-[10px] sm:text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    Show All
                  </span>
                </label>
              </div>
            </div>

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-6 sm:px-7 py-3.5 sm:py-4 bg-primary-dashboard text-white dark:text-surface-dashboard-dark font-black rounded-2xl hover:bg-primary-dashboard-hover transition-all shadow-2xl shadow-primary-dashboard/30 hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 group/btn text-sm sm:text-base"
            >
              <Plus className="w-5 h-5 sm:w-5.5 sm:h-5.5 group-hover/btn:rotate-90 transition-transform duration-500" />
              New Organization
            </button>
          </div>
        </div>
      </div>

      {/* Organizations Grid/Table Section */}
      <div className="space-y-6">
        <DataTable
          data={orgsResponse?.data?.items || []}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            currentPage: page,
            totalPages: orgsResponse?.meta?.total_pages || 1,
            onPageChange: setPage,
          }}
          search={{
            value: search,
            onChange: setSearch,
            placeholder: "Global search by name, acronym or slug...",
          }}
          emptyMessage="No institutional partners match your current filters."
        />
      </div>

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
