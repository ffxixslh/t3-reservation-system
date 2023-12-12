import { api } from "~/trpc/server";
import { AppointmentForm } from "../[appointmentId]/components/appointment-form";

interface AppointmentNewPageProps {
  params: { hospitalId: string };
}

const AppointmentNewPage: React.FC<
  AppointmentNewPageProps
> = async ({ params }) => {
  const doctors = await api.doctor.getAll.query({
    hospitalId: params.hospitalId,
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

export default AppointmentNewPage;
