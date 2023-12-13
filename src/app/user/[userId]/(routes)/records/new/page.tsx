import { api } from "~/trpc/server";

import { RecordForm } from "../[recordId]/components/record-form";
import { getServerAuthSession } from "~/server/auth";

const UserRecordNewPage = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }

  const doctors = await api.doctor.getAll.query({
    hospitalId: session.user.hospitalId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <RecordForm initialData={null} doctors={doctors} />
      </div>
    </div>
  );
};

export default UserRecordNewPage;
