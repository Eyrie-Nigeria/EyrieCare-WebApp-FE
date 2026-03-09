import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/lib/types/auth";

export interface WaitlistPayload {
  email: string;
  metadata?: Record<string, unknown>;
}

export const publicService = {
  joinWaitlist: async (data: WaitlistPayload): Promise<ApiResponse<null>> => {
    return apiClient<ApiResponse<null>>("/public/waitlist", {
      method: "POST",
      body: JSON.stringify(data),
      requireAuth: false,
    });
  },
};
