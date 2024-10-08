"use client";

import {
  Copy,
  FileText,
  MoreHorizontal,
  CheckCircle,
  Trash,
  PlusCircleIcon,
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
import { useAppointmentDetailModal } from "~/hooks/use-appointment-detail-modal";

import { type TAppointment } from "~/types";
import { api } from "~/trpc/react";

interface CellActionProps {
  data: TAppointment;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const appointmentDetailModal =
    useAppointmentDetailModal();

  const appointmentUpdateMutation =
    api.appointment.updateAppointment.useMutation();

  const onSelect = (data: TAppointment) => {
    appointmentDetailModal.setData(data);
    appointmentDetailModal.onOpen();
  };

  const onConfirm = async () => {
    try {
      setLoading(true);
      const nextAppointment =
        await appointmentUpdateMutation.mutateAsync({
          ...data,
          status: "CONFIRMED",
        });
      await fetch("/api/cron", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time: nextAppointment.time,
          patientId: nextAppointment.patientId,
          doctorId: nextAppointment.doctorId,
        }),
      });
      toast.success(`预约数据已确认。`);
      router.refresh();
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onCancel = async () => {
    try {
      setLoading(true);
      const nextAppointment =
        await appointmentUpdateMutation.mutateAsync({
          ...data,
          status: "CANCELED",
        });
      await fetch("/api/cron", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time: nextAppointment.time,
          patientId: nextAppointment.patientId,
          doctorId: nextAppointment.doctorId,
        }),
      });
      toast.success(`预约数据已取消。`);
      router.refresh();
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onCompleted = async () => {
    try {
      setLoading(true);
      const nextAppointment =
        await appointmentUpdateMutation.mutateAsync({
          ...data,
          status: "COMPLETED",
        });
      await fetch("/api/cron", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time: nextAppointment.time,
          patientId: nextAppointment.patientId,
          doctorId: nextAppointment.doctorId,
        }),
      });
      toast.success(`预约数据已完成。`);
      router.refresh();
    } catch (error) {
      toast.error(error as string);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const onCopy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    toast.success("预约 ID 已复制到剪贴板。");
  };

  const onCreateRecord = () => {
    router.push(
      `/doctor/${data.doctorId}/records/new?patientId=${data.patientId}`,
    );
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onCancel}
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
            <span>{`复制 ID`}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSelect(data)}>
            <FileText className="mr-2 h-4 w-4" />
            <span>{`详情`}</span>
          </DropdownMenuItem>
          {data.status === "PENDING" && (
            <>
              <DropdownMenuItem onClick={onConfirm}>
                <CheckCircle className="mr-2 h-4 w-4" />
                <span>{`确认`}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setOpen(true)}
              >
                <Trash className="mr-2 h-4 w-4" />
                <span>{`取消`}</span>
              </DropdownMenuItem>
            </>
          )}
          {data.status === "CONFIRMED" && (
            <DropdownMenuItem onClick={onCreateRecord}>
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              <span>{`创建病历`}</span>
            </DropdownMenuItem>
          )}
          {data.status === "CONFIRMED" && (
            <DropdownMenuItem onClick={onCompleted}>
              <CheckCircle className="mr-2 h-4 w-4" />
              <span>{`完成`}</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
