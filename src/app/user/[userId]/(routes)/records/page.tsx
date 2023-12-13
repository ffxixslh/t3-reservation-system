import { api } from "~/trpc/server";

import { RecordsClient } from "./components/client";

const RecordsPage = async () => {
  const records =
    await api.record.getAllByPatientId.query();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <RecordsClient data={records} />
      </div>
    </div>
  );
};

export default RecordsPage;
