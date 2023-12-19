import { DoctorRecordForm } from "../[recordId]/components/record-form";
import { getServerAuthSession } from "~/server/auth";

const UserRecordNewPage = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DoctorRecordForm initialData={null} />
      </div>
    </div>
  );
};

export default UserRecordNewPage;
