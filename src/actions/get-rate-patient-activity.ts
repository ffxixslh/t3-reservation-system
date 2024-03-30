import { api } from "~/trpc/server";

export async function getRatePatientActivity(
  hospitalId: string,
) {
  const users = await api.user.getAll.query({ hospitalId });
  const patients = users.filter(
    (user) => user.role === "PATIENT",
  );

  let patientActivity = 0;
  patients.forEach((patient) => {
    const patientActivityFlag = patient.appointments.some(
      (appointment) =>
        new Date().getDay() -
          appointment.createdAt.getDay() <
        7,
    );

    if (patientActivityFlag) {
      patientActivity += 1;
    }
  });

  const patientActivityRate =
    (patientActivity / patients.length) * 100;

  return patientActivityRate;
}
