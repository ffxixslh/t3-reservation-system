import { api } from "~/trpc/server";

import { DoctorForm } from "./components/doctor-form";

interface DoctorPageProps {
  params: { doctorId: string; hospitalId: string };
}

const DoctorPage: React.FC<DoctorPageProps> = async ({
  params,
}) => {
  const doctor = await api.doctor.getOneById.query({
    id: params.doctorId,
  });

  const departments = await api.department.getAll.query({
    hospitalId: params.hospitalId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DoctorForm
          initialData={doctor}
          departments={departments}
        />
      </div>
    </div>
  );
};

export default DoctorPage;
