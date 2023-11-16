import { redirect } from "next/navigation";

import { api } from "~/trpc/server";

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hospitals = await api.hospital.getAll.query();

  if (hospitals.length < 1) {
    redirect(`/dashboard/setup`);
  }
  return <div className="h-full w-full">{children}</div>;
}
