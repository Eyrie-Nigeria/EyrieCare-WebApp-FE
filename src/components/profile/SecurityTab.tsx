"use client";

import { Smartphone, Key, History, AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useChangePassword } from "@/lib/hooks/useAuth";
import { toast } from "sonner";

const passwordSchema = z
  .object({
    current_password: z.string().min(1, "Current password is required"),
    new_password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export function SecurityTab() {
  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = (data: PasswordFormValues) => {
    changePassword(
      {
        current_password: data.current_password,
        new_password: data.new_password,
      },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Password updated successfully");
          reset();
        },
        onError: (err) => {
          toast.error(err.message || "Failed to update password");
        },
      },
    );
  };
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Password Change Card */}
      <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-transparent transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
            <Key className="w-5 h-5" />
          </div>
          <h3 className="text-slate-900 dark:text-white text-lg font-bold">
            Password & Authentication
          </h3>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-wide">
                Current Password
              </label>
              <Input
                type="password"
                {...register("current_password")}
                disabled={isChangingPassword}
                placeholder="••••••••"
                className={errors.current_password ? "border-red-500" : ""}
                leftIcon={<Key className="w-5 h-5" />}
              />
              {errors.current_password && (
                <p className="text-red-500 text-xs">
                  {errors.current_password.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-wide">
                New Password
              </label>
              <Input
                type="password"
                {...register("new_password")}
                disabled={isChangingPassword}
                placeholder="••••••••"
                className={errors.new_password ? "border-red-500" : ""}
                leftIcon={<Key className="w-5 h-5" />}
              />
              {errors.new_password && (
                <p className="text-red-500 text-xs">
                  {errors.new_password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-wide">
                Confirm New Password
              </label>
              <Input
                type="password"
                {...register("confirm_password")}
                disabled={isChangingPassword}
                placeholder="••••••••"
                className={errors.confirm_password ? "border-red-500" : ""}
                leftIcon={<Key className="w-5 h-5" />}
              />
              {errors.confirm_password && (
                <p className="text-red-500 text-xs">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex justify-start">
            <Button
              type="submit"
              variant="dashboard"
              className="px-6"
              disabled={!isDirty || isChangingPassword}
            >
              {isChangingPassword ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </form>
      </div>

      {/* Two-Factor Authentication */}
      <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-transparent transition-all duration-300">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-slate-900 dark:text-white text-lg font-bold">
                Two-Factor Authentication
              </h3>
              <p className="text-xs text-text-dashboard-secondary-light">
                Add an extra layer of security to your account.
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-200 dark:bg-card-dashboard-dark/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-dashboard"></div>
          </label>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-transparent transition-all duration-300">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg">
            <History className="w-5 h-5" />
          </div>
          <h3 className="text-slate-900 dark:text-white text-lg font-bold">
            Active Sessions
          </h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-background-dashboard-dark border border-slate-100 dark:border-card-dashboard-dark/20">
            <div className="flex items-center gap-4">
              <div className="size-10 rounded-full bg-primary-dashboard/10 flex items-center justify-center text-primary-dashboard">
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  iPhone 15 Pro • London, UK
                </p>
                <p className="text-xs text-text-dashboard-secondary-light">
                  Current Session • Active now
                </p>
              </div>
            </div>
            <button className="text-xs font-bold text-red-500 hover:text-red-600 hover:underline transition-colors">
              Log out
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50/50 dark:bg-red-900/10 rounded-xl p-6 border border-red-100 dark:border-red-900/30 transition-all duration-300">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <h3 className="text-red-700 dark:text-red-400 text-lg font-bold">
            Danger Zone
          </h3>
        </div>
        <p className="text-sm text-red-600/70 dark:text-red-400/70 mb-4 font-medium">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
        <Button variant="destructive" className="font-bold">
          Delete Account
        </Button>
      </div>
    </div>
  );
}
