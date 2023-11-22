import { api } from "~/trpc/server";

import { DoctorsClient } from "./components/client";

const DoctorsPage = async ({
  params,
}: {
  params: { hospitalId: string };
}) => {
  const data = await api.doctor.getAll.query({
    hospitalId: params.hospitalId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DoctorsClient data={data} />
      </div>
    </div>
  );
};

export default DoctorsPage;
