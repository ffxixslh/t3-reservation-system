"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { ApiList } from "~/components/ui/api-list";

import { columns } from "./columns";
import { type TDoctor } from "~/types";

interface DoctorsClientProps {
  data: TDoctor[];
}

export const DoctorsClient: React.FC<
  DoctorsClientProps
> = ({ data }) => {
  const params = useParams<{
    hospitalId: string;
  }>();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`医生 (${data.length})`}
          description={`管理医院的医生数据`}
        />
        <Button
          onClick={() =>
            router.push(
              `/dashboard/${params.hospitalId}/doctors/new`,
            )
          }
        >
          <Plus className="mr-2 h-4 w-4" />{" "}
          <span>{`新增`}</span>
        </Button>
      </div>
      <Separator />
      <DataTable
        searchKey="name"
        columns={columns}
        data={data}
      />
      <Heading title="API" description="医生接口调用" />
      <Separator />
      <ApiList
        entityName="doctors"
        entityIdName="doctorId"
      />
    </>
  );
};
