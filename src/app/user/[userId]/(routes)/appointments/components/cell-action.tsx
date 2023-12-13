"use client";

import { Copy, Edit, MoreHorizontal } from "lucide-react";
import { toast } from "react-hot-toast";

import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { useAppointmentDetailModal } from "~/hooks/use-appointment-detail-modal";

import { type TAppointment } from "~/types";

interface CellActionProps {
  data: TAppointment;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const appointmentDetailModal =
    useAppointmentDetailModal();

  const onSelect = (data: TAppointment) => {
    appointmentDetailModal.setData(data);
    appointmentDetailModal.onOpen();
  };

  const onCopy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    toast.success("预约 ID 已复制到剪贴板。");
  };

  return (
    <>
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
            <Edit className="mr-2 h-4 w-4" />
            <span>{`详情`}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
