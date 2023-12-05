"use client";

import { useEffect } from "react";

import { useHospitalModal } from "~/hooks/use-hospital-modal";

const SetupPage = () => {
  const useCreateModal = useHospitalModal;
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
