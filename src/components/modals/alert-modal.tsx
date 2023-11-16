"use client";

import { useEffect, useState } from "react";

import { Modal } from "~/components/ui/modal";
import { Button } from "~/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={`你确定吗？`}
      description={`此操作无法撤消。`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="flex w-full items-center justify-end space-x-2 pt-6">
        <Button
          disabled={loading}
          variant="outline"
          onClick={onClose}
        >
          {`取消`}
        </Button>
        <Button
          disabled={loading}
          variant="destructive"
          onClick={onConfirm}
        >
          {`继续`}
        </Button>
      </div>
    </Modal>
  );
};
