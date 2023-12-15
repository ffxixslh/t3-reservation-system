"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { ApiList } from "~/components/ui/api-list";

import { columns } from "./columns";
import { type TDepartment } from "~/types";

interface DepartmentClientProps {
  data: TDepartment[];
}

export const DepartmentClient: React.FC<
  DepartmentClientProps
> = ({ data }) => {
  const params = useParams<{
    hospitalId: string;
  }>();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`部门 (${data.length})`}
          description={`管理医院的部门数据`}
        />
        <Button
          onClick={() =>
            router.push(
              `/dashboard/${params.hospitalId}/departments/new`,
            )
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          <span>{`新增`}</span>
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
      <Heading title="API" description="部门接口调用" />
      <Separator />
      <ApiList
        entityName="departments"
        entityIdName="departmentId"
      />
    </>
  );
};
