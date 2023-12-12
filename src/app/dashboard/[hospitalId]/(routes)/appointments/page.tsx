import { api } from "~/trpc/server";

import { AppointmentsClient } from "./components/client";

const AppointmentsPage = async ({
  params,
}: {
  params: { hospitalId: string };
}) => {
  const appointments =
    await api.appointment.getAllByHospitalId.query({
      hospitalId: params.hospitalId,
    });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AppointmentsClient data={appointments} />
      </div>
    </div>
  );
};

export default AppointmentsPage;
