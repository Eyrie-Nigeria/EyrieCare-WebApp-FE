"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Loader2, Mail, Send } from "lucide-react";
import { useCreateUser } from "@/lib/hooks/useAdmin";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Invalid email address"),
});

type FormData = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  organizationId: string;
}

export function InviteUserModal({ isOpen, onClose, organizationId }: Props) {
  const { mutate: inviteUser, isPending } = useCreateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: FormData) => {
    inviteUser(
      {
        ...data,
        role: "user",
        organization_id: organizationId || null,
        send_invite: true,
      },
      {
        onSuccess: () => {
          toast.success(`Invite sent to ${data.email}`);
          reset();
          onClose();
        },
        onError: (error: Error) => {
          toast.error(error.message || "Failed to send invite");
        },
      },
    );
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
      <div className="relative w-full max-w-md bg-white dark:bg-card-dashboard-dark rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/5 overflow-hidden animate-in fade-in zoom-in duration-300 mx-4 sm:mx-0">
        <div className="px-6 sm:px-8 py-5 sm:py-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between bg-slate-50/50 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 bg-primary-dashboard/10 rounded-xl sm:rounded-2xl text-primary-dashboard shadow-sm shadow-primary-dashboard/5">
              <Mail className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
              Invite User
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 sm:p-3 hover:bg-slate-200 dark:hover:bg-white/10 rounded-xl sm:rounded-2xl transition-all"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-[10px] sm:text-xs text-slate-500 font-bold uppercase tracking-widest leading-relaxed">
            Specify the recipient's email address below. They will receive an
            encrypted invitation with authorization credentials.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 ml-1">
                Registry Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-dashboard transition-colors" />
                <input
                  {...register("email")}
                  placeholder="e.g. jdoe@hospital.com"
                  className="w-full pl-12 pr-6 py-4 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl sm:rounded-2xl focus:ring-4 focus:ring-primary-dashboard/10 focus:border-primary-dashboard/50 focus:outline-none text-slate-900 dark:text-white text-sm font-black transition-all"
                />
              </div>
              {errors.email && (
                <p className="text-[10px] font-black text-red-500 ml-1 uppercase">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
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
                  <Send className="w-4 h-4" />
                )}
                {isPending ? "Executing..." : "Send Dispatch"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
