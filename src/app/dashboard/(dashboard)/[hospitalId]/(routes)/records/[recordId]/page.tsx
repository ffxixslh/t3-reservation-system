import React from "react";
import { api } from "~/trpc/server";

import { RecordForm } from "./components/record-form";

interface RecordPageProps {
  params: { recordId: string; hospitalId: string };
}

const RecordPage: React.FC<RecordPageProps> = async ({
  params,
}) => {
  const record = await api.record.getOne.query({
    id: params.recordId,
  });

  const doctors = await api.doctor.getAll.query({
    hospitalId: params.hospitalId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <RecordForm
          initialData={record}
          doctors={doctors}
        />
      </div>
    </div>
  );
};

export default RecordPage;
