"use client";

import { useEffect, useState } from "react";

import { CreateModal } from "~/components/modals/create-modal";

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
      <CreateModal />
    </>
  );
};
