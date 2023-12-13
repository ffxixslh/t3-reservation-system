import { api } from "~/trpc/server";
import { AppointmentForm } from "../[appointmentId]/components/appointment-form";
import { getServerAuthSession } from "~/server/auth";

interface AppointmentNewPageProps {
  params: { userId: string };
}

const UserAppointmentNewPage: React.FC<
  AppointmentNewPageProps
> = async () => {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }
  const doctors = await api.doctor.getAll.query({
    hospitalId: session.user.hospitalId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AppointmentForm
          initialData={null}
          doctors={doctors}
        />
      </div>
    </div>
  );
};

export default UserAppointmentNewPage;
