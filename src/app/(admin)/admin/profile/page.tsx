"use client";

import { ProfileView } from "@/components/profile";
import { Suspense } from "react";

export default function AdminProfilePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProfileView userType="admin" />
    </Suspense>
  );
}
