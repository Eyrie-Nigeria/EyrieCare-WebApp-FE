import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/lib/types/auth";

export interface WaitlistPayload {
  email: string;
  role: "student" | "doctor";
}

export const publicService = {
  joinWaitlist: async (data: WaitlistPayload): Promise<ApiResponse<null>> => {
    return apiClient<ApiResponse<null>>("/auth/waitlist", {
      method: "POST",
      body: JSON.stringify(data),
      requireAuth: false,
    });
  },
};
