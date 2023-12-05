"use client";
import { create } from "zustand";

export interface HospitalModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useHospitalModal = create<HospitalModalProps>(
  (set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }),
);
