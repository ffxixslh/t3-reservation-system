import { api } from "~/trpc/server";

import { PatientForm } from "./components/patient-form";

const PatientPage = async ({
  params,
}: {
  params: { patientId: string; hospitalId: string };
}) => {
  const patient = await api.user.getOne.query({
    id: params.patientId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PatientForm initialData={patient} />
      </div>
    </div>
  );
};

export default PatientPage;
