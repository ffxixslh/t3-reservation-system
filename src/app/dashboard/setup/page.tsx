"use client";

import { useEffect } from "react";

import { useHospitalModal } from "~/hooks/use-hospital-modal";

const DashboardSetupPage = () => {
  const onOpen = useHospitalModal((state) => state.onOpen);
  const isOpen = useHospitalModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return null;
};

export default DashboardSetupPage;
