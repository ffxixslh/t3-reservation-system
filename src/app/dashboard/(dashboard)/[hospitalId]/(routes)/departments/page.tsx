import { api } from "~/trpc/server";

import { DepartmentClient } from "./components/client";

const DepartmentsPage = async ({
  params,
}: {
  params: { hospitalId: string };
}) => {
  const departments = await api.department.getAll.query({
    hospitalId: params.hospitalId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DepartmentClient data={departments} />
      </div>
    </div>
  );
};

export default DepartmentsPage;
