"use client";

import { useEffect, useState } from "react";

import { TextModal } from "~/components/modals/text-modal";
import { useTextModal } from "~/hooks/use-text-modal";

export const TextModalProvider = () => {
  const textModal = useTextModal();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <TextModal initialValue={textModal.text} />
    </>
  );
};
