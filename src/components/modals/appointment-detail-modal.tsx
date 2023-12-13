import { useEffect, useState } from "react";

import { Modal } from "~/components/ui/modal";
import { useAppointmentDetailModal } from "~/hooks/use-appointment-detail-modal";
import {
  dateFormatter,
  statusFormatter,
} from "~/lib/utils";
import { zhCN } from "date-fns/locale";
import { Label } from "../ui/label";

interface AppointmentDetailModalProps {
  title: string;
  description: string;
}

export const AppointmentDetailModal: React.FC<
  AppointmentDetailModalProps
> = ({ title, description }) => {
  const appointmentDetailModal =
    useAppointmentDetailModal();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      description={description}
      isOpen={appointmentDetailModal.isOpen}
      onClose={appointmentDetailModal.onClose}
    >
      <div className="flex flex-col gap-4">
        <Label
          className="text-muted-foreground"
          htmlFor="appointment-modal-status"
        >
          {"预约状态"}
        </Label>
        <p
          id="appointment-modal-status"
          className="font-300 px-2 text-xl"
        >
          {statusFormatter(
            appointmentDetailModal.data?.status ??
              "PENDING",
          )}
        </p>
        <Label
          className="text-muted-foreground"
          htmlFor="appointment-modal-time"
        >
          {"预约时间"}
        </Label>
        <p
          id="appointment-modal-time"
          className="font-300 px-2 text-xl"
        >
          {dateFormatter(
            appointmentDetailModal.data?.time ?? 0,
            zhCN,
          )}
        </p>
        <Label
          className="text-muted-foreground"
          htmlFor="appointment-modal-doctor"
        >
          {"预约医生"}
        </Label>
        <p
          id="appointment-modal-doctor"
          className="font-300 px-2 text-xl"
        >
          {appointmentDetailModal.data?.doctor.name}
        </p>
        <Label
          className="text-muted-foreground"
          htmlFor="appointment-modal-description"
        >
          {"病情描述"}
        </Label>
        <p
          id="appointment-modal-description"
          className="font-300 px-2 text-xl"
        >
          {appointmentDetailModal.data?.description}
        </p>
      </div>
    </Modal>
  );
};
