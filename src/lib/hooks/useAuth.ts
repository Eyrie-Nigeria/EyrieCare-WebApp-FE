import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import {
  LoginPayload,
  SignupPayload,
  UpdateProfilePayload,
  ChangePasswordPayload,
  AcceptInvitePayload,
  ApiResponse,
  AuthTokens,
  User,
} from "@/lib/types/auth";
import { useAuthStore } from "@/lib/store/useAuthStore";

export const useLogin = () => {
  const setTokens = useAuthStore((state) => state.setTokens);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  return useMutation<ApiResponse<AuthTokens>, Error, LoginPayload>({
    mutationFn: authService.login,
    onSuccess: async (response) => {
      if (response.success && response.data) {
        setTokens(response.data);

        // Fetch user profile immediately to get the role
        try {
          const profileRes = await authService.getProfile();
          if (profileRes.success && profileRes.data) {
            setUser(profileRes.data);

            // Role-based redirect
            const role = profileRes.data.role.toLowerCase();
            if (role === "superadmin") {
              router.push("/superadmin");
            } else if (role === "admin") {
              router.push("/admin");
            } else {
              router.push("/dashboard");
            }
          }
        } catch {
          router.push("/dashboard");
        }
      }
    },
  });
};

export const useSignup = () => {
  const setTokens = useAuthStore((state) => state.setTokens);
  const setUser = useAuthStore((state) => state.setUser);
  const router = useRouter();

  return useMutation<ApiResponse<AuthTokens>, Error, SignupPayload>({
    mutationFn: authService.register,
    onSuccess: async (response) => {
      if (response.success && response.data) {
        setTokens(response.data);

        try {
          const profileRes = await authService.getProfile();
          if (profileRes.success && profileRes.data) {
            setUser(profileRes.data);

            // Role-based redirect
            const role = profileRes.data.role.toLowerCase();
            if (role === "superadmin") {
              router.push("/superadmin");
            } else if (role === "admin") {
              router.push("/admin");
            } else {
              router.push("/dashboard");
            }
          }
        } catch {
          router.push("/dashboard");
        }
      }
    },
  });
};

export const useLogout = () => {
  const logout = useAuthStore((state) => state.logout);

  return useMutation<ApiResponse<null>, Error, void>({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      // Clear the tokens from Zustand (and cookies) regardless of whether
      // the backend actually succeeds or fails (e.g. if token was already expired)
      logout();
    },
    onError: () => {
      // Still log them out locally even if the server request fails
      logout();
    },
  });
};

export const useProfile = () => {
  return useQuery<ApiResponse<User>, Error>({
    queryKey: ["profile"],
    queryFn: authService.getProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<User>,
    Error,
    { id: string; data: UpdateProfilePayload }
  >({
    mutationFn: ({ id, data }) => authService.updateProfile(id, data),
    onSuccess: (response) => {
      // Update the user profile cache so the UI updates immediately
      if (response.success && response.data) {
        queryClient.setQueryData(["profile"], response);
      }
    },
  });
};

export const useUploadProfilePicture = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<User>, Error, { id: string; file: File }>({
    mutationFn: ({ id, file }) => authService.uploadProfilePicture(id, file),
    onSuccess: (response) => {
      // Update the user profile cache so the avatar updates immediately
      if (response.success && response.data) {
        queryClient.setQueryData(["profile"], response);
      }
    },
  });
};

export const useDeleteProfilePicture = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<User>, Error, string>({
    mutationFn: (id) => authService.deleteProfilePicture(id),
    onSuccess: (response) => {
      // Update the user profile cache so the avatar is removed immediately
      if (response.success && response.data) {
        queryClient.setQueryData(["profile"], response);
      }
    },
  });
};

export const useChangePassword = () => {
  return useMutation<ApiResponse<null>, Error, ChangePasswordPayload>({
    mutationFn: authService.changePassword,
  });
};

export const useAcceptInvite = () => {
  return useMutation<ApiResponse<AuthTokens>, Error, AcceptInvitePayload>({
    mutationFn: authService.acceptInvite,
  });
};
