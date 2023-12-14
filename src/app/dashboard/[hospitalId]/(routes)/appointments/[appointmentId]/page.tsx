import { api } from "~/trpc/server";
import { AppointmentForm } from "./components/appointment-form";

interface AppointmentPageProps {
  params: { appointmentId: string; hospitalId: string };
}

const AppointmentPage: React.FC<
  AppointmentPageProps
> = async ({ params }) => {
  const appointment = await api.appointment.getOne.query({
    id: params.appointmentId,
  });

  const departments = await api.department.getAll.query({
    hospitalId: params.hospitalId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AppointmentForm
          initialData={appointment}
          departments={departments}
        />
      </div>
    </div>
  );
};

export default AppointmentPage;
