"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface UserAddressState {
  address: string | null;
  signature: string | null;
  setTokens: (address: string, signature: string) => void;
  clearTokens: () => void;
}

export const useUserAddress = create<UserAddressState>()(
  persist(
    (set) => ({
      address: null,
      signature: null,
      setTokens: async (address: string, signature: string) => {
        set({ address, signature });
      },
      clearTokens: async () => {
        set({ address: null, signature: null });
      },
    }),
    {
      name: "user-address",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
