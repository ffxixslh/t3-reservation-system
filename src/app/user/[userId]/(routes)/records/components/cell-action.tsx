"use client";

import {
  Copy,
  FileText,
  MoreHorizontal,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { AlertModal } from "~/components/modals/alert-modal";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useRecordDetailModal } from "~/hooks/use-record-detail-modal";

import { api } from "~/trpc/react";
import { type TRecord } from "~/types";

interface CellActionProps {
  data: TRecord;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const recordDetailModal = useRecordDetailModal();

  const recordDeleteMutation =
    api.record.deleteRecord.useMutation();

  const onSelect = (data: TRecord) => {
    recordDetailModal.setData(data);
    recordDetailModal.onOpen();
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      await recordDeleteMutation.mutateAsync({
        id: data.id,
      });
      toast.success(`病历数据已删除。`);
      router.refresh();
    } catch (error) {
      toast.error(
        "请确保你已删除所有使用到该病历的相关数据。",
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onCopy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    toast.success("病历 ID 已复制到剪贴板。");
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">{`打开菜单`}</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{`操作`}</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-4 w-4" />
            <span>{`复制 Id`}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSelect(data)}>
            <FileText className="mr-2 h-4 w-4" />
            <span>{`详情`}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
