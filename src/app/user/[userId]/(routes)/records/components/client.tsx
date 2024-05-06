"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "~/components/ui/button";
import { DataTable } from "~/components/ui/data-table";
import { Heading } from "~/components/ui/heading";
import { Separator } from "~/components/ui/separator";

import { columns } from "./columns";
import { type TRecord } from "~/types";
import { RecordDetailModal } from "~/components/modals/record-detail-modal";

interface RecordsClientProps {
  data: TRecord[];
}

export const RecordsClient: React.FC<
  RecordsClientProps
> = ({ data }) => {
  const params = useParams<{
    userId: string;
  }>();
  const router = useRouter();

  return (
    <>
      <RecordDetailModal
        title={"病历详情"}
        description={""}
      />
      <div className="flex items-center justify-between">
        <Heading
          title={`病历 (${data.length})`}
          description={`查看你的病历数据`}
        />
      </div>
      <Separator />
      <DataTable columns={columns} data={data} />
    </>
  );
};
