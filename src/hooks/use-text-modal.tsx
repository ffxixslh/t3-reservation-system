"use client";
import { create } from "zustand";
import { type TText } from "~/types";

type State = {
  isOpen: boolean;
  text: TText;
};

type Action = {
  onOpen: () => void;
  onClose: () => void;
  setText: (title: State["text"]) => void;
};

export type TextModalProps = State & Action;

export const useTextModal = create<TextModalProps>(
  (set) => ({
    isOpen: false,
    text: {
      id: "",
      medicalRecordId: "",
      title: "",
      content: "",
    },
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setText: (text) => set(() => ({ text })),
  }),
);
