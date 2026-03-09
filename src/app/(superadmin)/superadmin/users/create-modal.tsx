"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Loader2, Mail } from "lucide-react";
import { useCreateUser } from "@/lib/hooks/useAdmin";
import { Organization } from "@/lib/types/admin";
import { toast } from "sonner";

const schema = z
  .object({
    email: z.string().email("Invalid email address"),
    role: z.enum(["admin", "user", "superadmin"]),
    organization_id: z.string().optional(),
    phone_number: z.string().optional(),
    send_invite: z.boolean(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .optional()
      .or(z.literal("")),
  })
  .refine(
    (data) => {
      if (!data.send_invite && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required if invite email is not sent",
      path: ["password"],
    },
  );

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  organizations: Organization[];
}

export function CreateUserModal({ isOpen, onClose, organizations }: Props) {
  const { mutate: createUser, isPending } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      role: "user",
      send_invite: true,
      organization_id: "",
    },
  });

  const sendInvite = useWatch({ control, name: "send_invite" });

  const onSubmit = (data: FormData) => {
    // Transform the data for the API
    const payload = {
      ...data,
      organization_id: data.organization_id || null,
      password: data.password || undefined,
    };

    createUser(payload, {
      onSuccess: () => {
        toast.success(
          data.send_invite
            ? "Invite sent successfully"
            : "User created successfully",
        );
        reset();
        onClose();
      },
      onError: (error: Error) => {
        toast.error(error.message || "Failed to register new system user");
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
            Create User Account
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-200 dark:hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                {...register("email")}
                placeholder="e.g. user@example.com"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-card-dashboard-dark border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary-dashboard/30 focus:outline-none text-slate-900 dark:text-white text-sm font-medium transition-all"
              />
            </div>
            {errors.email && (
              <p className="text-xs font-bold text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Role */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                User Role
              </label>
              <select
                {...register("role")}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-card-dashboard-dark border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary-dashboard/30 focus:outline-none text-slate-900 dark:text-white text-sm font-medium transition-all"
              >
                <option value="user">Student / User</option>
                <option value="admin">Administrator</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>

            {/* Organization */}
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                Organization
              </label>
              <select
                {...register("organization_id")}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-card-dashboard-dark border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary-dashboard/30 focus:outline-none text-slate-900 dark:text-white text-sm font-medium transition-all"
              >
                <option value="">Unassigned</option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Invite Toggle */}
          <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-2xl border border-slate-100 dark:border-white/5 space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Send Email Invite
                </span>
                <p className="text-[10px] text-slate-400 font-medium">
                  User will set password via email link
                </p>
              </div>
              <input
                type="checkbox"
                {...register("send_invite")}
                className="size-5 rounded border-slate-300 text-primary-dashboard focus:ring-primary-dashboard"
              />
            </label>

            {!sendInvite && (
              <div className="pt-2 space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">
                  Initial Password
                </label>
                <input
                  type="password"
                  {...register("password")}
                  placeholder="Set initial password"
                  className="w-full px-4 py-2.5 bg-white dark:bg-card-dashboard-dark border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary-dashboard/30 focus:outline-none text-slate-900 dark:text-white text-sm transition-all"
                />
                {errors.password && (
                  <p className="text-xs font-bold text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="pt-2 flex gap-3">
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
              {isPending
                ? sendInvite
                  ? "Sending..."
                  : "Creating..."
                : sendInvite
                  ? "Send Invite"
                  : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
