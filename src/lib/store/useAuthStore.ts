import { create } from "zustand";
import { persist, StateStorage, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import { AuthTokens } from "@/lib/types/auth";

interface AuthState {
  tokens: AuthTokens | null;
  setTokens: (tokens: AuthTokens | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
}

// Custom storage object to let Zustand use cookies instead of localStorage
const cookieStorage: StateStorage = {
  getItem: (name: string): string | Promise<string | null> | null => {
    return Cookies.get(name) || null;
  },
  setItem: (name: string, value: string): void | Promise<void> => {
    // Standard access tokens typically expire in a short time.
    // So setting the cookie to expire in 7 days (or match refresh token)
    Cookies.set(name, value, { expires: 7, secure: true, sameSite: "strict" });
  },
  removeItem: (name: string): void | Promise<void> => {
    Cookies.remove(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      tokens: null,
      isAuthenticated: false,
      setTokens: (tokens) => set({ tokens, isAuthenticated: !!tokens }),
      logout: () => set({ tokens: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage", // This will be the name of the cookie
      storage: createJSONStorage(() => cookieStorage),
    },
  ),
);
