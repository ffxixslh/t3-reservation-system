"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";

import { columns } from "./columns";
import { type TAppointment } from "~/types";
import { AppointmentDetailModal } from "~/components/modals/appointment-detail-modal";
import AppointmentCalendar from "~/app/doctor/[doctorId]/(routes)/appointments/components/appointment-calendar";

interface AppointmentsClientProps {
  data: TAppointment[];
}

export const AppointmentsClient: React.FC<
  AppointmentsClientProps
> = ({ data }) => {
  const { data: session } = useSession();
  const [selectedDay, setSelectedDay] = useState<Date>();

  const selectedDayAppointments = data.filter(
    (appointment) =>
      appointment.time.getDate() === selectedDay?.getDate(),
  );

  const router = useRouter();

  return (
    <>
      <AppointmentDetailModal
        title={"预约详情"}
        description={""}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={`预约 (${data.length})`}
          description={`查看你的预约数据`}
        />
        <Button
          onClick={() =>
            router.push(
              `/doctor/${session?.user.doctorId}/appointments/new`,
            )
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          <span>{`新增`}</span>
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
      <Heading
        title={`预约日历`}
        description="查看当日预约数据"
      />
      <Separator />
      <AppointmentCalendar
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        selectedDateAppointments={selectedDayAppointments}
      />
    </>
  );
};
