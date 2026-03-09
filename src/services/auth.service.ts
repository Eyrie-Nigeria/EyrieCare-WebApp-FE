import { apiClient } from "@/lib/api-client";
import {
  ApiResponse,
  AuthTokens,
  LoginPayload,
  SignupPayload,
  UpdateProfilePayload,
  ChangePasswordPayload,
  AcceptInvitePayload,
  User,
} from "@/lib/types/auth";

export const authService = {
  login: async (data: LoginPayload): Promise<ApiResponse<AuthTokens>> => {
    return apiClient<ApiResponse<AuthTokens>>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      requireAuth: false, // Don't need token to login
    });
  },

  register: async (data: SignupPayload): Promise<ApiResponse<AuthTokens>> => {
    return apiClient<ApiResponse<AuthTokens>>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
      requireAuth: false, // Don't need token to register
    });
  },

  logout: async (): Promise<ApiResponse<null>> => {
    return apiClient<ApiResponse<null>>("/auth/logout", {
      method: "POST",
      // requireAuth defaults to true in apiClient, so it will automatically attach the Bearer token
    });
  },

  getProfile: async (): Promise<ApiResponse<User>> => {
    return apiClient<ApiResponse<User>>("/auth/me", {
      method: "GET",
    });
  },

  updateProfile: async (
    id: string,
    data: UpdateProfilePayload,
  ): Promise<ApiResponse<User>> => {
    return apiClient<ApiResponse<User>>(`/users/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  changePassword: async (
    data: ChangePasswordPayload,
  ): Promise<ApiResponse<null>> => {
    return apiClient<ApiResponse<null>>("/auth/change-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  uploadProfilePicture: async (
    id: string,
    file: File,
  ): Promise<ApiResponse<User>> => {
    const formData = new FormData();
    formData.append("file", file);

    return apiClient<ApiResponse<User>>(`/users/${id}/profile-picture`, {
      method: "POST",
      body: formData,
    });
    // Wait, let's check apiClient implementation first. It might not handle FormData correctly
    // without stripping the default Content-Type header. I will look at apiClient next.
  },

  deleteProfilePicture: async (id: string): Promise<ApiResponse<User>> => {
    return apiClient<ApiResponse<User>>(`/users/${id}/profile-picture`, {
      method: "DELETE",
    });
  },

  acceptInvite: async (
    data: AcceptInvitePayload,
  ): Promise<ApiResponse<AuthTokens>> => {
    return apiClient<ApiResponse<AuthTokens>>("/auth/accept-invite", {
      method: "POST",
      body: JSON.stringify(data),
      requireAuth: false,
    });
  },
};
