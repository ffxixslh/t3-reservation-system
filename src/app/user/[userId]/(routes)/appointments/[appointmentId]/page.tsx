import { api } from "~/trpc/server";
import { AppointmentForm } from "./components/appointment-form";
import { getServerAuthSession } from "~/server/auth";

interface UserAppointmentPageProps {
  params: { userId: string; appointmentId: string };
}

const UserAppointmentPage: React.FC<
  UserAppointmentPageProps
> = async ({ params }) => {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }

  const appointment = await api.appointment.getOne.query({
    id: params.appointmentId,
  });
  const doctors = await api.doctor.getAll.query({
    hospitalId: session.user.hospitalId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AppointmentForm
          initialData={appointment}
          doctors={doctors}
        />
      </div>
    </div>
  );
};

export default UserAppointmentPage;
