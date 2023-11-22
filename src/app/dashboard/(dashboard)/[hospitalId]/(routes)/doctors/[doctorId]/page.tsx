import { api } from "~/trpc/server";

import { DoctorForm } from "./components/doctor-form";

const DoctorPage = async ({
  params,
}: {
  params: { doctorId: string; hospitalId: string };
}) => {
  const doctor = await api.doctor.getOne.query({
    id: params.doctorId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DoctorForm initialData={doctor} />
      </div>
    </div>
  );
};

export default DoctorPage;
