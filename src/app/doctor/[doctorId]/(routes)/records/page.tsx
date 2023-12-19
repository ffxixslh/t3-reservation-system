import { api } from "~/trpc/server";

import { DoctorRecordsClient } from "./components/client";

const DoctorRecordsPage = async () => {
  const records = await api.record.getAllByDoctorId.query();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DoctorRecordsClient data={records} />
      </div>
    </div>
  );
};

export default DoctorRecordsPage;
