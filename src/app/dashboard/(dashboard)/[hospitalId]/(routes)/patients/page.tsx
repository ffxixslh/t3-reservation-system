import { api } from "~/trpc/server";

import { PatientsClient } from "./components/client";

const PatientsPage = async ({
  params,
}: {
  params: { hospitalId: string };
}) => {
  const patients = await api.user.getAll.query({
    hospitalId: params.hospitalId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PatientsClient data={patients} />
      </div>
    </div>
  );
};

export default PatientsPage;
