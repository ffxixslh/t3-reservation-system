import { api } from "~/trpc/server";

import { DepartmentForm } from "./components/department-form";

const DepartmentPage = async ({
  params,
}: {
  params: { departmentId: string };
}) => {
  const department = await api.department.getOne.query({
    id: Number(params.departmentId),
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DepartmentForm initialData={department} />
      </div>
    </div>
  );
};

export default DepartmentPage;
