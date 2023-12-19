import HospitalSwitcher from "~/components/dashboard/hospital-switcher";
import { DashboardMainNav } from "~/components/dashboard/dashboard-main-nav";
import { api } from "~/trpc/server";
import { UserMenu } from "../user-menu";
import { getServerAuthSession } from "~/server/auth";
import Navbar from "../navbar";

export default async function DashboardNavbar() {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }

  const user = await api.user.getOneById.query({
    id: session.user.id,
  });

  const hospitals = await api.hospital.getAll.query();

  return (
    <Navbar
      mainNav={
        <div className="flex items-center">
          <HospitalSwitcher items={hospitals} />
          <DashboardMainNav className="mx-6" />
        </div>
      }
      subNav={<UserMenu user={user} />}
    />
  );
}
