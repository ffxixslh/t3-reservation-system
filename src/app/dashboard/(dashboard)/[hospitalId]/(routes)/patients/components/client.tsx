"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";
import { ApiList } from "~/components/ui/api-list";

import { columns } from "./columns";
import { type Patient } from "~/types";

interface PatientsClientProps {
  data: Patient[];
}

export const PatientsClient: React.FC<
  PatientsClientProps
> = ({ data }) => {
  const params = useParams<{
    hospitalId: string;
  }>();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`用户 (${data.length})`}
          description={`管理医院的用户数据`}
        />
        <Button
          onClick={() =>
            router.push(
              `/dashboard/${params.hospitalId}/patients/new`,
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
      <Heading
        title="API"
        description="API Calls for Products"
      />
      <Separator />
      <ApiList
        entityName="products"
        entityIdName="productId"
      />
    </>
  );
};
