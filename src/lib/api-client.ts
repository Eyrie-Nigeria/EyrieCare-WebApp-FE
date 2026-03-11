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

  // If unauthorized, attempt to handle token refresh
  if (response.status === 401 && requireAuth) {
    const currentState = useAuthStore.getState();
    const refreshToken = currentState.tokens?.refresh_token;

    if (refreshToken && endpoint !== "/auth/refresh") {
      try {
        // Attempt to refresh the token directly via the API
        const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        if (refreshRes.ok) {
          const refreshData = await refreshRes.json();
          // Update the auth store with new tokens
          if (refreshData?.data) {
            currentState.setTokens(refreshData.data);

            // Re-run the original request with the new access token
            const retryConfig = {
              ...config,
              headers: {
                ...config.headers,
                Authorization: `Bearer ${refreshData.data.access_token}`,
              },
            };

            const retryResponse = await fetch(
              `${API_BASE_URL}${endpoint}`,
              retryConfig,
            );
            const retryData = await retryResponse.json();

            if (!retryResponse.ok) {
              throw new Error(
                retryData?.message ||
                  retryData?.error ||
                  retryResponse.statusText,
              );
            }
            return retryData as T;
          }
        }
      } catch (error) {
        // Fall through to logout if refresh fails
        console.error("Token refresh failed", error);
      }
    }

    // If there's no refresh token, or the refresh failed, flush cache & logout
    currentState.logout();
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    throw new Error("Session expired. Please log in again.");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || data?.error || response.statusText);
  }

  return data as T;
};
