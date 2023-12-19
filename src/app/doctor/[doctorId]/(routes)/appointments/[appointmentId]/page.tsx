import { api } from "~/trpc/server";
import { DoctorAppointmentForm } from "./components/appointment-form";
import { getServerAuthSession } from "~/server/auth";

interface DoctorAppointmentPageProps {
  params: { doctorId: string; appointmentId: string };
}

const DoctorAppointmentPage: React.FC<
  DoctorAppointmentPageProps
> = async ({ params }) => {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }

  const appointment = await api.appointment.getOne.query({
    id: params.appointmentId,
  });
  const departments = await api.department.getAll.query({
    hospitalId: session.user.hospitalId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DoctorAppointmentForm
          initialData={appointment}
          departments={departments}
        />
      </div>
    </div>
  );
};

export default DoctorAppointmentPage;
