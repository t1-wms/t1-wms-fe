import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CurrentUser } from "./types";

interface UserStore {
  user: CurrentUser | null;
  setUser: (user: CurrentUser) => void;
  setToken: (token: string) => void;
  logout: () => void;
}

export const useUserStore = create(
  persist<UserStore>(
    (set, get) => ({
      user: null,
      setUser: (user: CurrentUser) => set({ user }),
      setToken: (token: string) =>
        set({ user: get().user ? { ...get().user!, at: token } : null }),
      logout: () => set({ user: null }),
    }),
    {
      name: "loginUser",
    }
  )
);
