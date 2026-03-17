import { apiClient } from "@/lib/api-client";
import { ApiResponse, User } from "@/lib/types/auth";
import {
  Organization,
  CreateOrganizationPayload,
  UpdateOrganizationPayload,
  PaginatedResponse,
  CreateUserPayload,
  BulkUserPayload,
  WaitlistEntry,
} from "@/lib/types/admin";

export const adminService = {
  // --- Organization Management ---
  getOrganizations: async (params?: {
    page?: number;
    per_page?: number;
    search?: string;
    include_deleted?: boolean;
  }): Promise<ApiResponse<PaginatedResponse<Organization>>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.per_page)
      queryParams.set("per_page", params.per_page.toString());
    if (params?.search) queryParams.set("search", params.search);
    if (params?.include_deleted) queryParams.set("include_deleted", "true");

    return apiClient<ApiResponse<PaginatedResponse<Organization>>>(
      `/organizations?${queryParams.toString()}`,
      { method: "GET" },
    );
  },

  searchOrganizations: async (params: {
    q: string;
    page?: number;
    per_page?: number;
  }): Promise<ApiResponse<PaginatedResponse<Organization>>> => {
    const queryParams = new URLSearchParams();
    queryParams.set("q", params.q);
    if (params.page) queryParams.set("page", params.page.toString());
    if (params.per_page)
      queryParams.set("per_page", params.per_page.toString());

    return apiClient<ApiResponse<PaginatedResponse<Organization>>>(
      `/organizations/search?${queryParams.toString()}`,
      { method: "GET" },
    );
  },

  getOrganizationById: async (
    id: string,
  ): Promise<ApiResponse<Organization>> => {
    return apiClient<ApiResponse<Organization>>(`/organizations/${id}`, {
      method: "GET",
    });
  },

  createOrganization: async (
    data: CreateOrganizationPayload,
  ): Promise<ApiResponse<Organization>> => {
    return apiClient<ApiResponse<Organization>>("/organizations", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  updateOrganization: async (
    id: string,
    data: UpdateOrganizationPayload,
  ): Promise<ApiResponse<Organization>> => {
    return apiClient<ApiResponse<Organization>>(`/organizations/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  deleteOrganization: async (id: string): Promise<ApiResponse<null>> => {
    return apiClient<ApiResponse<null>>(`/organizations/${id}`, {
      method: "DELETE",
    });
  },

  restoreOrganization: async (
    id: string,
  ): Promise<ApiResponse<Organization>> => {
    return apiClient<ApiResponse<Organization>>(
      `/organizations/${id}/restore`,
      {
        method: "POST",
      },
    );
  },

  // --- User & Member Management ---

  // Generic users list (Superadmin)
  getUsers: async (params?: {
    page?: number;
    per_page?: number;
    role?: string;
    organization_id?: string;
    search?: string;
  }): Promise<ApiResponse<PaginatedResponse<User>>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.per_page)
      queryParams.set("per_page", params.per_page.toString());
    if (params?.role) queryParams.set("role", params.role);
    if (params?.organization_id)
      queryParams.set("organization_id", params.organization_id);
    if (params?.search) queryParams.set("search", params.search);

    return apiClient<ApiResponse<PaginatedResponse<User>>>(
      `/users?${queryParams.toString()}`,
      { method: "GET" },
    );
  },

  // Admins in "my-organization" (Admin only)
  getMyOrganizationAdmins: async (params?: {
    page?: number;
    per_page?: number;
  }): Promise<ApiResponse<PaginatedResponse<User>>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.per_page)
      queryParams.set("per_page", params.per_page.toString());

    return apiClient<ApiResponse<PaginatedResponse<User>>>(
      `/organizations/my-organization/admins?${queryParams.toString()}`,
      { method: "GET" },
    );
  },

  // Users in "my-organization" (Admin only)
  getMyOrganizationUsers: async (params?: {
    page?: number;
    per_page?: number;
  }): Promise<ApiResponse<PaginatedResponse<User>>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.per_page)
      queryParams.set("per_page", params.per_page.toString());

    return apiClient<ApiResponse<PaginatedResponse<User>>>(
      `/organizations/my-organization/users?${queryParams.toString()}`,
      { method: "GET" },
    );
  },

  // Admins in specific organization (Superadmin only)
  getOrganizationAdmins: async (
    orgId: string,
    params?: { page?: number; per_page?: number },
  ): Promise<ApiResponse<PaginatedResponse<User>>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.per_page)
      queryParams.set("per_page", params.per_page.toString());

    return apiClient<ApiResponse<PaginatedResponse<User>>>(
      `/organizations/${orgId}/admins?${queryParams.toString()}`,
      { method: "GET" },
    );
  },

  // Users in specific organization (Superadmin only)
  getOrganizationUsers: async (
    orgId: string,
    params?: { page?: number; per_page?: number },
  ): Promise<ApiResponse<PaginatedResponse<User>>> => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.per_page)
      queryParams.set("per_page", params.per_page.toString());

    return apiClient<ApiResponse<PaginatedResponse<User>>>(
      `/organizations/${orgId}/users?${queryParams.toString()}`,
      { method: "GET" },
    );
  },

  // Search users within my organization by email
  searchUsersByEmail: async (params: {
    q: string;
    page?: number;
    per_page?: number;
  }): Promise<ApiResponse<PaginatedResponse<User>>> => {
    const queryParams = new URLSearchParams();
    queryParams.set("q", params.q);
    if (params.page) queryParams.set("page", params.page.toString());
    if (params.per_page)
      queryParams.set("per_page", params.per_page.toString());

    return apiClient<ApiResponse<PaginatedResponse<User>>>(
      `/users/me/search?${queryParams.toString()}`,
      { method: "GET" },
    );
  },

  // Bulk assign users to organization
  bulkAssignUsers: async (
    orgId: string,
    data: BulkUserPayload,
  ): Promise<ApiResponse<null>> => {
    return apiClient<ApiResponse<null>>(
      `/organizations/${orgId}/users/bulk-assign`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
  },

  // Bulk remove users from organization
  bulkRemoveUsers: async (
    orgId: string,
    data: BulkUserPayload,
  ): Promise<ApiResponse<null>> => {
    return apiClient<ApiResponse<null>>(
      `/organizations/${orgId}/users/bulk-remove`,
      {
        method: "POST",
        body: JSON.stringify(data),
      },
    );
  },

  createUser: async (data: CreateUserPayload): Promise<ApiResponse<User>> => {
    return apiClient<ApiResponse<User>>("/users", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  // --- Waitlist Management ---
  getUnapprovedUsers: async (): Promise<ApiResponse<WaitlistEntry[]>> => {
    return apiClient<ApiResponse<WaitlistEntry[]>>(
      "/superadmin/unapproved-users",
      {
        method: "GET",
      },
    );
  },

  grantAccess: async (userId: number): Promise<ApiResponse<User>> => {
    return apiClient<ApiResponse<User>>(`/superadmin/grant-access/${userId}`, {
      method: "POST",
    });
  },
};
