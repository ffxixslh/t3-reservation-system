"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { ApiList } from "~/components/ui/api-list";

import { columns } from "./columns";
import { type TAppointment } from "~/types";

interface AppointmentsClientProps {
  data: TAppointment[];
}

export const AppointmentsClient: React.FC<
  AppointmentsClientProps
> = ({ data }) => {
  const params = useParams<{
    hospitalId: string;
  }>();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`预约 (${data.length})`}
          description={`管理医院的预约数据`}
        />
        <Button
          onClick={() =>
            router.push(
              `/dashboard/${params.hospitalId}/appointments/new`,
            )
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          <span>{`新增`}</span>
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
      <Heading title="API" description="预约接口调用" />
      <Separator />
      <ApiList
        entityName="appointments"
        entityIdName="appointmentId"
      />
    </>
  );
};
