import { apiClient } from "@/lib/api-client";
import { ApiResponse } from "@/lib/types/auth";

export interface WaitlistPayload {
  email: string;
  fullName: string;
  isStudent: boolean;
  courseOfStudy?: string;
  specificCourse?: string;
  yearOfStudy?: string;
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
