import { redirect } from "next/navigation";
import { DoctorMainNav } from "~/components/doctor/doctor-main-nav";
import { IconNav } from "~/components/icon-nav";
import Navbar from "~/components/navbar";
import { UserMenu } from "~/components/user/user-menu";
import { DoctorInfoProvider } from "~/providers/doctor/doctor-info-provider";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function DoctorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { doctorId: string };
}) {
  const session = await getServerAuthSession();
  if (!session) {
    redirect("/");
  }

  const doctor = await api.doctor.getOneByDoctorId.query({
    id: params.doctorId,
  });

  if (!doctor) {
    redirect("/");
  }

  return (
    <DoctorInfoProvider value={doctor}>
      <Navbar
        mainNav={<DoctorMainNav />}
        subNav={<UserMenu />}
        iconNav={<IconNav />}
      />
      {children}
    </DoctorInfoProvider>
  );
}
