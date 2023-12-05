"use client";

import { useEffect, useState } from "react";

import { HospitalModal } from "~/components/modals/hospital-modal";

export const HospitalModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <HospitalModal />
    </>
  );
};
