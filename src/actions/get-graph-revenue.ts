import { api } from "~/trpc/server";

interface GraphData {
  name: string;
  total: number;
}

export const getGraphAcceptedAppointments = async (
  hospitalId: string,
): Promise<GraphData[]> => {
  const appointments =
    await api.appointment.getAllByHospitalId.query({
      hospitalId,
    });

  const monthlyAccepted: { [key: number]: number } = {};

  for (const appointment of appointments) {
    const month = appointment.createdAt.getMonth(); // 0 for Jan, 1 for Feb, ...
    let acceptedAppointment = 0;

    if (appointment.status === "CONFIRMED") {
      acceptedAppointment += 1;
    }

    monthlyAccepted[month] =
      (monthlyAccepted[month] || 0) + acceptedAppointment;
  }

  const graphData: GraphData[] = [
    { name: "Jan", total: 0 },
    { name: "Feb", total: 0 },
    { name: "Mar", total: 0 },
    { name: "Apr", total: 0 },
    { name: "May", total: 0 },
    { name: "Jun", total: 0 },
    { name: "Jul", total: 0 },
    { name: "Aug", total: 0 },
    { name: "Sep", total: 0 },
    { name: "Oct", total: 0 },
    { name: "Nov", total: 0 },
    { name: "Dec", total: 0 },
  ];

  for (const month in monthlyAccepted) {
    const monthIndex = parseInt(month);
    const data = graphData[monthIndex];
    const monthlyTotal = monthlyAccepted[monthIndex];

    data!.total = monthlyTotal!;
  }

  return graphData;
};
