"use client";

import {
  Mail,
  Phone,
  Lock,
  ChevronRight,
  PlusCircle,
  User,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProfile, useUpdateProfile } from "@/lib/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const profileSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone_number: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function PersonalInfoForm() {
  const { data: profileResponse, isPending } = useProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();
  const user = profileResponse?.data;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: {
      email: user?.email || "",
      phone_number: user?.phone_number || "",
    },
  });

  const onSubmit = (data: ProfileFormValues) => {
    if (!user?.id) return;
    updateProfile(
      { id: user.id, data },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Profile updated successfully");
        },
        onError: (err) => {
          toast.error(err.message || "Failed to update profile");
        },
      },
    );
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64 bg-card-dashboard-light dark:bg-card-dashboard-dark rounded-xl border border-slate-200 dark:border-transparent">
        <Loader2 className="w-8 h-8 animate-spin text-primary-dashboard flex-shrink-0" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Personal Details Card */}
        <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-transparent transition-all duration-300">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold">
              Personal Details
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-wide">
                First Name
              </label>
              <Input
                type="text"
                placeholder="Your First Name"
                disabled
                className="bg-slate-50 dark:bg-background-dashboard-dark/50"
                leftIcon={<User className="w-5 h-5" />}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-wide">
                Last Name
              </label>
              <Input
                type="text"
                placeholder="Your Last Name"
                disabled
                className="bg-slate-50 dark:bg-background-dashboard-dark/50"
                leftIcon={<User className="w-5 h-5" />}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-wide">
                Email Address
              </label>
              <Input
                type="email"
                {...register("email")}
                disabled={isUpdating}
                className={errors.email ? "border-red-500" : ""}
                leftIcon={<Mail className="w-5 h-5" />}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-wide">
                Phone Number
              </label>
              <Input
                type="tel"
                {...register("phone_number")}
                disabled={isUpdating}
                placeholder="Add your phone number"
                leftIcon={<Phone className="w-5 h-5" />}
              />
              {errors.phone_number && (
                <p className="text-red-500 text-xs">
                  {errors.phone_number.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Academic Info Card */}
        <div className="bg-card-dashboard-light dark:bg-card-dashboard-dark rounded-xl p-6 shadow-sm border border-slate-200 dark:border-transparent transition-all duration-300">
          <h3 className="text-slate-900 dark:text-white text-lg font-bold mb-6">
            Academic Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-wide">
                Student ID
              </label>
              <div className="relative">
                <Input
                  disabled
                  type="text"
                  defaultValue="MED-2024-8921"
                  className="bg-slate-50 dark:bg-background-dashboard-dark/50 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                />
                <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
              </div>
              <p className="text-[10px] text-text-dashboard-secondary-light mt-1 pl-1">
                Cannot be changed
              </p>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark uppercase tracking-wide">
                Expected Graduation
              </label>
              <Input type="text" defaultValue="May 2026" />
            </div>
            <div className="md:col-span-2 p-4 rounded-xl border border-dashed border-primary-dashboard/30 bg-primary-dashboard/5 flex items-center justify-between group cursor-pointer hover:bg-primary-dashboard/10 transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="size-10 rounded-full bg-primary-dashboard/20 flex items-center justify-center text-primary-dashboard group-hover:bg-primary-dashboard group-hover:text-surface-dashboard-dark transition-all duration-300">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white text-sm">
                    Add Specialty Interest
                  </p>
                  <p className="text-xs text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark">
                    Let mentors know what fields you are interested in
                  </p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-text-dashboard-secondary-light group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            className="px-8 font-bold"
            onClick={() => reset()}
            disabled={!isDirty || isUpdating}
          >
            Discard
          </Button>
          <Button
            type="submit"
            variant="dashboard"
            className="px-8"
            disabled={!isDirty || isUpdating}
          >
            {isUpdating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
