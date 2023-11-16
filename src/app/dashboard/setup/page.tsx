"use client";

import { useEffect } from "react";

import { useBasicModal } from "~/hooks/use-basic-modal";

const SetupPage = () => {
  const useCreateModal = useBasicModal;
  const onOpen = useCreateModal((state) => state.onOpen);
  const isOpen = useCreateModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default SetupPage;
