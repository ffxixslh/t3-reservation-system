import { DoctorForm } from "../[doctorId]/components/doctor-form";

const DoctorsPage = async () => {
  await Promise.resolve();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <DoctorForm initialData={null} />
      </div>
    </div>
  );
};

export default DoctorsPage;
