import { api } from "~/trpc/server";

import { DoctorForm } from "../[doctorId]/components/doctor-form";

interface DoctorNewPageProps {
  params: { doctorId: string; hospitalId: string };
}

const DoctorNewPage: React.FC<DoctorNewPageProps> = async ({
  params,
}) => {
  const departments = await api.department.getAll.query({
    hospitalId: params.hospitalId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DoctorForm
          initialData={null}
          departments={departments}
        />
      </div>
    </div>
  );
};

export default DoctorNewPage;
