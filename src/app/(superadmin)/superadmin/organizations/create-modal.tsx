"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useCreateOrganization } from "@/lib/hooks/useAdmin";
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
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateOrganizationModal({ isOpen, onClose }: Props) {
  const { mutate: createOrg, isPending } = useCreateOrganization();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      official_acronym: "",
      slug: "",
    },
  });

  const nameValue = watch("name");

  // Auto-generate slug from name
  useEffect(() => {
    if (nameValue) {
      const slug = nameValue
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setValue("slug", slug, { shouldValidate: true });
    }
  }, [nameValue, setValue]);

  const onSubmit = (data: FormData) => {
    createOrg(data, {
      onSuccess: () => {
        toast.success("Organization created successfully");
        reset();
        onClose();
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to establish new organization");
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white dark:bg-card-dashboard-dark rounded-3xl shadow-2xl border border-slate-200 dark:border-white/5 overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
          <h2 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
            Create Organization
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Organization Name
            </label>
            <input
              {...register("name")}
              placeholder="e.g. Lagos General Hospital"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-card-dashboard-dark border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary-dashboard/30 focus:outline-none text-slate-900 dark:text-white text-sm font-medium transition-all"
            />
            {errors.name && (
              <p className="text-xs font-bold text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Official Acronym
              </label>
              <input
                {...register("official_acronym")}
                placeholder="e.g. LGH"
                className="w-full px-4 py-3 bg-slate-50 dark:bg-card-dashboard-dark border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary-dashboard/30 focus:outline-none text-slate-900 dark:text-white text-sm font-medium transition-all"
              />
              {errors.official_acronym && (
                <p className="text-xs font-bold text-red-500">
                  {errors.official_acronym.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                URL Slug
              </label>
              <input
                {...register("slug")}
                placeholder="lagos-general-hospital"
                className="w-full px-4 py-3 bg-slate-100/50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary-dashboard/30 focus:outline-none text-slate-400 dark:text-slate-500 text-sm font-bold transition-all"
              />
              {errors.slug && (
                <p className="text-xs font-bold text-red-500">
                  {errors.slug.message}
                </p>
              )}
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 px-6 py-3 bg-primary-dashboard text-white dark:text-surface-dashboard-dark font-black rounded-xl hover:bg-primary-dashboard-hover transition-all shadow-lg shadow-primary-dashboard/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
              {isPending ? "Creating..." : "Create Organization"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
