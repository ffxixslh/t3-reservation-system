import HospitalSwitcher from "~/components/dashboard/hospital-switcher";
import { DashboardMainNav } from "~/components/dashboard/dashboard-main-nav";
import { ThemeToggle } from "~/components/theme-toggle";
import { api } from "~/trpc/server";

export default async function DashboardNavbar() {
  const hospitals = await api.hospital.getAll.query();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <HospitalSwitcher items={hospitals} />
        <DashboardMainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
