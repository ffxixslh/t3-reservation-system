"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";

import { columns } from "./columns";
import { type TAppointment } from "~/types";
import { useSession } from "next-auth/react";
import { AppointmentDetailModal } from "~/components/modals/appointment-detail-modal";

interface AppointmentsClientProps {
  data: TAppointment[];
}

export const AppointmentsClient: React.FC<
  AppointmentsClientProps
> = ({ data }) => {
  const { data: session } = useSession();

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
              `/user/${session?.user.id}/appointments/new`,
            )
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          <span>{`新增`}</span>
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
