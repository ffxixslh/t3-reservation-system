import { api } from "~/trpc/server";
import { AppointmentForm } from "../[appointmentId]/components/appointment-form";

interface AppointmentNewPageProps {
  params: { hospitalId: string };
}

const AppointmentNewPage: React.FC<
  AppointmentNewPageProps
> = async ({ params }) => {
  const departments = await api.department.getAll.query({
    hospitalId: params.hospitalId,
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <AppointmentForm
          initialData={null}
          departments={departments}
        />
      </div>
    </div>
  );
};

export default AppointmentNewPage;
