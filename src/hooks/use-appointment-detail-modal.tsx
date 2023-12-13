"use client";

import { create } from "zustand";
import { type TAppointment } from "~/types";

type State = {
  data: TAppointment | null;
  isOpen: boolean;
};

type Action = {
  setData: (data: TAppointment) => void;
  onOpen: () => void;
  onClose: () => void;
};

export type AppointmentDetailModalProps = State & Action;

export const useAppointmentDetailModal =
  create<AppointmentDetailModalProps>((set) => ({
    data: null,
    isOpen: false,
    setData: (data) => set({ data }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
