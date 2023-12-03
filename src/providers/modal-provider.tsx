"use client";

import { useEffect, useState } from "react";

import { HospitalCreateModal } from "~/components/modals/hospital-create-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <HospitalCreateModal />
    </>
  );
};
