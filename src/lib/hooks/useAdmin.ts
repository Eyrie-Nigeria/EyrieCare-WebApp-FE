import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";
import {
  CreateOrganizationPayload,
  UpdateOrganizationPayload,
  CreateUserPayload,
  BulkUserPayload,
} from "@/lib/types/admin";

export const useOrganizations = (params?: {
  page?: number;
  per_page?: number;
  search?: string;
  include_deleted?: boolean;
}) => {
  return useQuery({
    queryKey: ["organizations", params],
    queryFn: () => adminService.getOrganizations(params),
  });
};

export const useSearchOrganizations = (params: {
  q: string;
  page?: number;
  per_page?: number;
}) => {
  return useQuery({
    queryKey: ["organizations", "search", params],
    queryFn: () => adminService.searchOrganizations(params),
    enabled: !!params.q,
  });
};

export const useOrganization = (id: string) => {
  return useQuery({
    queryKey: ["organizations", id],
    queryFn: () => adminService.getOrganizationById(id),
    enabled: !!id,
  });
};

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOrganizationPayload) =>
      adminService.createOrganization(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateOrganizationPayload;
    }) => adminService.updateOrganization(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({
        queryKey: ["organizations", variables.id],
      });
    },
  });
};

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.deleteOrganization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

export const useRestoreOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => adminService.restoreOrganization(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
    },
  });
};

export const useUsers = (params?: {
  page?: number;
  per_page?: number;
  role?: string;
  organization_id?: string;
  search?: string;
}) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => adminService.getUsers(params),
  });
};

export const useMyOrganizationAdmins = (params?: {
  page?: number;
  per_page?: number;
}) => {
  return useQuery({
    queryKey: ["my-organization", "admins", params],
    queryFn: () => adminService.getMyOrganizationAdmins(params),
  });
};

export const useMyOrganizationUsers = (params?: {
  page?: number;
  per_page?: number;
}) => {
  return useQuery({
    queryKey: ["my-organization", "users", params],
    queryFn: () => adminService.getMyOrganizationUsers(params),
  });
};

export const useOrganizationAdmins = (
  orgId: string,
  params?: { page?: number; per_page?: number },
) => {
  return useQuery({
    queryKey: ["organizations", orgId, "admins", params],
    queryFn: () => adminService.getOrganizationAdmins(orgId, params),
    enabled: !!orgId,
  });
};

export const useOrganizationUsers = (
  orgId: string,
  params?: { page?: number; per_page?: number },
) => {
  return useQuery({
    queryKey: ["organizations", orgId, "users", params],
    queryFn: () => adminService.getOrganizationUsers(orgId, params),
    enabled: !!orgId,
  });
};

export const useSearchUsersByEmail = (params: {
  q: string;
  page?: number;
  per_page?: number;
}) => {
  return useQuery({
    queryKey: ["users", "search", params],
    queryFn: () => adminService.searchUsersByEmail(params),
    enabled: !!params.q,
  });
};

export const useBulkAssignUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orgId, data }: { orgId: string; data: BulkUserPayload }) =>
      adminService.bulkAssignUsers(orgId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({
        queryKey: ["organizations", variables.orgId, "users"],
      });
    },
  });
};

export const useBulkRemoveUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orgId, data }: { orgId: string; data: BulkUserPayload }) =>
      adminService.bulkRemoveUsers(orgId, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({
        queryKey: ["organizations", variables.orgId, "users"],
      });
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserPayload) => adminService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useUnapprovedUsers = (params?: {
  page?: number;
  per_page?: number;
}) => {
  return useQuery({
    queryKey: ["unapproved-users", params],
    queryFn: () => adminService.getUnapprovedUsers(params),
  });
};

export const useGrantAccess = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: number) => adminService.grantAccess(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unapproved-users"] });
    },
  });
};

export const useBulkGrantAccess = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userIds: number[]) => adminService.bulkGrantAccess(userIds),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["unapproved-users"] });
    },
  });
};

export function useUser(id: string) {
  return useQuery({
    queryKey: ["admin", "user", id],
    queryFn: () => adminService.getUserById(id),
    enabled: !!id,
  });
}
export function useUnassignedAdmins(params?: {
  page?: number;
  per_page?: number;
}) {
  return useQuery({
    queryKey: ["admin", "users", "unassigned", "admins", params],
    queryFn: () => adminService.getUnassignedAdmins(params),
  });
}

export function useUnassignedUsers(params?: {
  page?: number;
  per_page?: number;
}) {
  return useQuery({
    queryKey: ["admin", "users", "unassigned", params],
    queryFn: () => adminService.getUnassignedUsers(params),
  });
}
