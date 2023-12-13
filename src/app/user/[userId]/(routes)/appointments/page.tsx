import { api } from "~/trpc/server";

import { AppointmentsClient } from "./components/client";
import { getServerAuthSession } from "~/server/auth";

const UserAppointmentsPage = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }
  const appointments =
    await api.appointment.getAllByPatientId.query();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AppointmentsClient data={appointments} />
      </div>
    </div>
  );
};

export default UserAppointmentsPage;
