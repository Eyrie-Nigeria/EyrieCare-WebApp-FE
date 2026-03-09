"use client";

import { ProfileView } from "@/components/profile";
import { Suspense } from "react";

export default function SuperadminProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileView userType="superadmin" />
    </Suspense>
  );
}
