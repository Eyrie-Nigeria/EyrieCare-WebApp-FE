import { useAuthStore } from "@/lib/store/useAuthStore";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

interface ApiClientOptions extends RequestInit {
  requireAuth?: boolean;
}

export const apiClient = async <T>(
  endpoint: string,
  { requireAuth = true, ...customConfig }: ApiClientOptions = {},
): Promise<T> => {
  const headers: HeadersInit = {
    Accept: "application/json",
  };

  // Only set Content-Type to application/json if the body is not FormData
  if (!(customConfig.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  if (requireAuth) {
    const tokens = useAuthStore.getState().tokens;
    if (tokens?.access_token) {
      headers["Authorization"] = `Bearer ${tokens.access_token}`;
    }
  }

  const config: RequestInit = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  const data = await response.json();

  if (!response.ok) {
    // Handle the generic ApiResponse error format if it exists
    const errorMessage = data?.message || data?.error || response.statusText;
    throw new Error(errorMessage);
  }

  return data as T;
};
