import { api } from "~/trpc/server";

export async function getRateAcceptedAppointments(
  hospitalId: string,
) {
  const appointments =
    await api.appointment.getAllByHospitalId.query({
      hospitalId,
    });

  const acceptedAppointments = appointments.filter(
    (appointment) => appointment.status === "CONFIRMED",
  );

  const rate =
    (acceptedAppointments.length / appointments.length) *
    100;
  return rate;
}
