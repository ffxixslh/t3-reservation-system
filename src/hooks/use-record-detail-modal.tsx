"use client";

import { create } from "zustand";
import { type TRecord } from "~/types";

type State = {
  data: TRecord | null;
  isOpen: boolean;
};

type Action = {
  setData: (data: TRecord) => void;
  onOpen: () => void;
  onClose: () => void;
};

export type RecordDetailModalProps = State & Action;

export const useRecordDetailModal =
  create<RecordDetailModalProps>((set) => ({
    data: null,
    isOpen: false,
    setData: (data) => set({ data }),
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  }));
