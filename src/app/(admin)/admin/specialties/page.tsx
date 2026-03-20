"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  MoreVertical,
  Edit,
  Trash2,
  Activity,
  History,
} from "lucide-react";
import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSpecialties, useDeleteSpecialty } from "@/lib/hooks/useSpecialties";
import { Specialty } from "@/lib/types/specialties";
import { SpecialtyModal } from "@/components/specialties/SpecialtyModal";
import {
  CATEGORY_STYLES,
  SPECIALTY_CATEGORIES,
} from "@/lib/constants/specialties";
import { toast } from "sonner";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function AdminSpecialtiesPage() {
  const user = useAuthStore((state) => state.user);
  const isOrgAdmin = !!user?.organization_id;
  const portalName = isOrgAdmin ? "Organization" : "General Platform";

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(
    null,
  );

  const { data: specialtiesResponse, isLoading } = useSpecialties({
    page,
    per_page: 10,
    name: search || undefined,
    category: categoryFilter || undefined,
    is_active:
      statusFilter === "active"
        ? true
        : statusFilter === "archived"
          ? false
          : undefined,
  });

  const { mutate: deleteSpecialty } = useDeleteSpecialty();

  const handleEdit = (specialty: Specialty) => {
    setSelectedSpecialty(specialty);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (
      confirm(
        "Are you sure you want to delete this specialty? This action cannot be undone.",
      )
    ) {
      deleteSpecialty(id, {
        onSuccess: () => toast.success("Specialty deleted successfully"),
        onError: (error: unknown) => {
          const errorMessage =
            error instanceof Error
              ? error.message
              : "Failed to delete specialty";
          toast.error(errorMessage);
        },
      });
    }
  };

  const columns: Column<Specialty>[] = [
    {
      header: "Specialty / Icon",
      render: (spec) => (
        <div className="flex items-center gap-4 group/item">
          <div className="size-10 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10 overflow-hidden relative shadow-sm transition-transform group-hover/item:scale-105">
            {spec.image_url ? (
              <img
                src={spec.image_url}
                alt={spec.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <Activity className="w-5 h-5 text-slate-400" />
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-slate-900 dark:text-white tracking-tight uppercase text-xs">
              {spec.name}
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest truncate max-w-[150px]">
              {spec.id.substring(0, 8)}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Category",
      render: (spec) => {
        const style =
          CATEGORY_STYLES[spec.category || "Default"] ||
          CATEGORY_STYLES.Default;
        return (
          <Badge
            variant="outline"
            className={cn(
              "font-black uppercase tracking-widest text-[10px] px-3",
              style.bg,
              style.text,
              style.border,
            )}
          >
            {spec.category}
          </Badge>
        );
      },
    },
    {
      header: "Resource Count",
      render: (spec) => (
        <Badge
          variant="secondary"
          className="font-black text-[10px] uppercase bg-slate-100 dark:bg-white/5 border-none px-4"
        >
          {spec.resources?.length || 0} Assets
        </Badge>
      ),
    },
    {
      header: "State",
      render: (spec) => (
        <Badge
          variant={spec.is_active ? "success" : "warning"}
          className="font-black text-[10px] uppercase"
        >
          {spec.is_active ? "Active" : "Archived"}
        </Badge>
      ),
    },
    {
      header: "Actions",
      className: "text-right",
      render: (spec) => (
        <DropdownMenu>
          <DropdownMenuTrigger className="p-2 hover:bg-slate-100 dark:hover:bg-white/10 rounded-xl transition-all outline-none">
            <MoreVertical className="w-4 h-4 text-slate-400" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 p-1.5 rounded-2xl bg-white dark:bg-card-dashboard-dark border-slate-200 dark:border-white/5 shadow-2xl"
          >
            <DropdownMenuItem
              onClick={() => handleEdit(spec)}
              className="flex items-center gap-3 p-2.5 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-primary-dashboard/10 hover:text-primary-dashboard focus:bg-primary-dashboard/10 focus:text-primary-dashboard transition-all cursor-pointer font-bold text-xs uppercase"
            >
              <Edit className="w-4 h-4" />
              Edit Strategy
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleDelete(spec.id)}
              className="flex items-center gap-3 p-2.5 rounded-xl text-red-500 hover:bg-red-500/10 focus:bg-red-500/10 transition-all cursor-pointer font-bold text-xs uppercase"
            >
              <Trash2 className="w-4 h-4" />
              Delete Specialty
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const specialtiesData = specialtiesResponse?.data?.data || [];
  const specialtiesMetadata = specialtiesResponse?.meta;

  return (
    <div className="space-y-8 pb-10">
      {/* Header with quick stats */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-2xl bg-primary-dashboard/10 flex items-center justify-center text-primary-dashboard border border-primary-dashboard/20">
              <History className="w-5 h-5" />
            </div>
            <Badge className="bg-primary-dashboard/10 text-primary-dashboard border-none font-black text-[10px] uppercase tracking-[0.2em] px-3 py-1">
              Admin: {portalName}
            </Badge>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase leading-none">
            Specialty <span className="text-primary-dashboard">Registry</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold text-sm tracking-tight flex items-center gap-2">
            Managing your {isOrgAdmin ? "organization's" : "platform-level"}{" "}
            clinical modules.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setSelectedSpecialty(null);
              setIsModalOpen(true);
            }}
            className="h-14 px-8 bg-primary-dashboard text-white dark:text-surface-dashboard-dark font-black rounded-2xl hover:bg-primary-dashboard-hover transition-all shadow-xl shadow-primary-dashboard/20 active:scale-95 flex items-center gap-3 uppercase tracking-widest text-xs"
          >
            <Plus className="w-5 h-5" />
            Create Specialty
          </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="flex flex-wrap items-center gap-4 bg-white dark:bg-card-dashboard-dark/20 p-5 rounded-[2rem] border border-slate-200/60 dark:border-white/5 shadow-sm backdrop-blur-sm">
        <div className="relative flex-1 min-w-[280px] group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-dashboard transition-colors" />
          <input
            type="text"
            placeholder="Search specialties..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl pl-11 pr-4 py-3 text-sm font-black focus:outline-none focus:ring-4 focus:ring-primary-dashboard/10 focus:border-primary-dashboard/50 transition-all text-slate-900 dark:text-white placeholder:text-slate-400 uppercase tracking-tighter"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value);
              setPage(1);
            }}
            className="appearance-none bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-primary-dashboard/10 transition-all min-w-[150px] cursor-pointer"
          >
            <option value="" className="bg-white dark:bg-card-dashboard-dark">
              Categories
            </option>
            {SPECIALTY_CATEGORIES.map((cat) => (
              <option
                key={cat}
                value={cat}
                className="bg-white dark:bg-card-dashboard-dark"
              >
                {cat}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="appearance-none bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl px-5 py-3 text-[10px] font-black text-slate-600 dark:text-slate-400 uppercase tracking-widest focus:outline-none focus:ring-4 focus:ring-primary-dashboard/10 transition-all min-w-[150px] cursor-pointer"
          >
            <option value="">Status</option>
            <option value="active">Active Only</option>
            <option value="archived">Archived Only</option>
          </select>
        </div>
      </div>

      {/* Main Table Area */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <DataTable
          data={specialtiesData}
          columns={columns}
          isLoading={isLoading}
          pagination={{
            currentPage: page,
            totalPages: specialtiesMetadata?.total_pages || 1,
            onPageChange: setPage,
          }}
          emptyMessage="No clinical specialties found for your account."
        />
      </motion.div>

      <SpecialtyModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSpecialty(null);
        }}
        specialty={selectedSpecialty}
      />
    </div>
  );
}
