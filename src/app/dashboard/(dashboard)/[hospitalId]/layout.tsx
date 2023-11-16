import { redirect } from "next/navigation";

import Navbar from "~/components/navbar";
import { api } from "~/trpc/server";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { hospitalId: string };
}) {
  const hospital = await api.hospital.getOne.query({
    id: params.hospitalId,
  });

  if (!hospital) {
    redirect(`/`);
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
