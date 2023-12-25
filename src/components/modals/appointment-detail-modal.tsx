import { useEffect, useState } from "react";

import { Modal } from "~/components/ui/modal";

import { useAppointmentDetailModal } from "~/hooks/use-appointment-detail-modal";
import {
  dateFormatter,
  statusFormatter,
} from "~/lib/utils";
import DescriptionItem from "../ui/description-item";

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
        <DescriptionItem
          title={"预约状态"}
          content={statusFormatter(
            appointmentDetailModal.data?.status ??
              "PENDING",
          )}
        />
        <DescriptionItem
          title={"预约时间"}
          content={dateFormatter(
            appointmentDetailModal.data?.time ?? 0,
          )}
        />
        <DescriptionItem
          title={"预约医生"}
          content={appointmentDetailModal.data?.doctor.name}
        />
        <DescriptionItem
          title={"预约患者"}
          content={
            appointmentDetailModal.data?.patient.name
          }
        />
        <DescriptionItem
          title={"病情描述"}
          content={appointmentDetailModal.data?.description}
        />
      </div>
    </Modal>
  );
};
