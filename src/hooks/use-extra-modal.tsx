import { create } from "zustand";
import { type useBasicModalStore } from "~/hooks/use-basic-modal";

type ExtraConfig = {
  isEdit: boolean;
  editId?: string;
  onEdit: (id: string) => void;
};

export const useExtraModal = create<
  useBasicModalStore & ExtraConfig
>((set) => ({
  isOpen: false,
  isEdit: false,
  editId: undefined,
  onOpen: () => set({ isOpen: true }),
  onEdit: (id: string) =>
    set({ isOpen: true, isEdit: true, editId: id }),
  onClose: () =>
    set({
      isOpen: false,
      isEdit: false,
      editId: undefined,
    }),
}));
