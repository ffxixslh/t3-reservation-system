import { PatientForm } from "../[patientId]/components/patient-form";

const PatientsPage = async () => {
  await Promise.resolve();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <PatientForm initialData={null} />
      </div>
    </div>
  );
};

export default PatientsPage;
