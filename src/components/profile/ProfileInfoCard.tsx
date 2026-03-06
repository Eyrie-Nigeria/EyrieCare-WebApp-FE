"use client";

import {
  Camera,
  GraduationCap,
  Stethoscope,
  MapPin,
  Loader2,
} from "lucide-react";
import { useRef } from "react";
import { useProfile, useUploadProfilePicture } from "@/lib/hooks/useAuth";
import { toast } from "sonner";

export function ProfileInfoCard() {
  const { data: profileResponse } = useProfile();
  const { mutate: uploadPicture, isPending } = useUploadProfilePicture();
  const user = profileResponse?.data;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
    const file = _e.target.files?.[0];
    if (!file || !user?.id) return;

    // Validate if necessary
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    uploadPicture(
      { id: user.id, file },
      {
        onSuccess: (res) => {
          toast.success(res.message || "Profile picture updated successfully");
        },
        onError: (err) => {
          toast.error(err.message || "Failed to update profile picture");
        },
        onSettled: () => {
          // Reset file input
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        },
      },
    );
  };

  // Fallback to the previous default if the user has no custom picture
  const avatarUrl =
    user?.profile_picture_url ||
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBO31lvdoCr6L5WXM8qUYxa9Md8rXwogb2zLFVXK96e-Ix4nHsKDSmzP1xl8Mx3Dru_StdgiCGNlCkP55c6MPidspN8JFHzqZ_HZi8P7vk5SvR5Z9-y1KQeoqLnIUB7o1pFuw_eQutHCxxSioRBJPK6yN5pmsJsgToL6mBQg9xpfoDH-N_mBdbx3Cw6DI7VJah-bZVQyaCaKNzBmsPCbSdS3I5_0UUsYZjmiJhSSZFI4bR2UoqxqsfqkLUrKQPCRZJOp4_yDPflbMU";

  return (
    <section className="bg-card-dashboard-light dark:bg-card-dashboard-dark rounded-2xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-transparent transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center">
        {/* Avatar Section */}
        <div className="relative group">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <div
            className={`bg-center bg-no-repeat bg-cover rounded-full size-32 md:size-40 border-4 border-slate-100 dark:border-background-dashboard-dark shadow-md ${isPending ? "opacity-50" : ""}`}
            style={{ backgroundImage: `url("${avatarUrl}")` }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isPending}
            className="absolute bottom-2 right-2 p-2.5 bg-primary-dashboard hover:scale-110 active:scale-95 text-surface-dashboard-dark rounded-full shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Change Avatar"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Camera className="w-5 h-5 font-bold" />
            )}
          </button>
        </div>

        {/* Info Section */}
        <div className="flex flex-1 flex-col gap-2 w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
            <div>
              <h1 className="text-slate-900 dark:text-white text-3xl font-bold tracking-tight capitalize">
                {user?.email?.split("@")[0] || "User"}
              </h1>
              <p className="text-primary-dashboard text-lg font-medium mt-1">
                3rd Year Medical Student
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-y-2 gap-x-6 mt-3 text-sm text-text-dashboard-secondary-light dark:text-text-dashboard-secondary-dark font-medium">
            <div className="flex items-center gap-2 group cursor-default">
              <GraduationCap className="w-5 h-5 text-primary-dashboard" />
              <span className="text-slate-700 dark:text-gray-300">
                Stanford Medicine
              </span>
            </div>
            <div className="flex items-center gap-2 group cursor-default">
              <div className="bg-primary-dashboard/10 text-primary-dashboard px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5" />
                Rotation: Cardiology
              </div>
            </div>
            <div className="flex items-center gap-2 group cursor-default">
              <MapPin className="w-5 h-5 text-primary-dashboard" />
              <span className="text-slate-700 dark:text-gray-300">
                Palo Alto, CA
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
