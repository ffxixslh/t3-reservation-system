"use client";
import { create } from "zustand";

export type useBasicModalStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useBasicModal = create<useBasicModalStore>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }),
);
