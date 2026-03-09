"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Loader2, Save } from "lucide-react";
import { useEffect } from "react";
import { useUpdateOrganization } from "@/lib/hooks/useAdmin";
import { Organization } from "@/lib/types/admin";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  official_acronym: z
    .string()
    .min(2, "Acronym must be at least 2 characters")
    .max(10, "Max 10 characters"),
  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters")
    .regex(/^[a-z0-9-]+$/, "Lowercase letters and hyphens only"),
  is_active: z.boolean().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  organization: Organization;
}

export function EditOrganizationModal({
  isOpen,
  onClose,
  organization,
}: Props) {
  const { mutate: updateOrg, isPending } = useUpdateOrganization();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: organization.name,
      official_acronym: organization.official_acronym,
      slug: organization.slug,
      is_active: organization.is_active,
    },
  });

  // Reset form when organization changes or modal opens
  useEffect(() => {
    if (isOpen) {
      reset({
        name: organization.name,
        official_acronym: organization.official_acronym,
        slug: organization.slug,
        is_active: organization.is_active,
      });
    }
  }, [isOpen, organization, reset]);

  const onSubmit = (data: FormData) => {
    updateOrg(
      { id: organization.id, data },
      {
        onSuccess: () => {
          toast.success("Organization updated successfully");
          onClose();
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to update repository data");
        },
      },
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-card-dashboard-dark rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/5 overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Edit Institution
            </h2>
            <p className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest">
              Update partner credentials
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 sm:p-3 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl sm:rounded-2xl transition-all"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="p-6 sm:p-8 space-y-5 sm:space-y-6"
        >
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">
              Legal Name
            </label>
            <input
              {...register("name")}
              placeholder="e.g. Lagos General Hospital"
              className="w-full px-5 py-3.5 sm:py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-primary-dashboard/10 focus:border-primary-dashboard/50 focus:outline-none text-slate-900 dark:text-white text-sm font-black transition-all"
            />
            {errors.name && (
              <p className="text-[10px] font-black text-red-500 ml-1 uppercase">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">
                Acronym
              </label>
              <input
                {...register("official_acronym")}
                placeholder="e.g. LGH"
                className="w-full px-5 py-3.5 sm:py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-primary-dashboard/10 focus:border-primary-dashboard/50 focus:outline-none text-slate-900 dark:text-white text-sm font-black transition-all"
              />
              {errors.official_acronym && (
                <p className="text-[10px] font-black text-red-500 ml-1 uppercase">
                  {errors.official_acronym.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">
                URL Slug
              </label>
              <input
                {...register("slug")}
                placeholder="lagos-general-hospital"
                className="w-full px-5 py-3.5 sm:py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-primary-dashboard/10 focus:border-primary-dashboard/50 focus:outline-none text-slate-900 dark:text-white text-sm font-black transition-all"
              />
              {errors.slug && (
                <p className="text-[10px] font-black text-red-500 ml-1 uppercase">
                  {errors.slug.message}
                </p>
              )}
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl sm:rounded-2xl border border-slate-100 dark:border-white/5">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  Active Status
                </span>
                <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                  Toggle organization availability
                </p>
              </div>
              <input
                type="checkbox"
                {...register("is_active")}
                className="size-5 sm:size-6 rounded-lg border-slate-300 text-primary-dashboard focus:ring-primary-dashboard bg-transparent transition-all"
              />
            </label>
          </div>

          <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="button"
              onClick={onClose}
              className="order-2 sm:order-1 flex-1 px-8 py-3.5 sm:py-4 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-black rounded-xl sm:rounded-2xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all uppercase tracking-widest text-xs"
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="order-1 sm:order-2 flex-2 px-8 py-3.5 sm:py-4 bg-primary-dashboard text-white dark:text-surface-dashboard-dark font-black rounded-xl sm:rounded-2xl hover:bg-primary-dashboard-hover transition-all shadow-xl shadow-primary-dashboard/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
            >
              {isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {isPending ? "Syncing..." : "Update Credentials"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
