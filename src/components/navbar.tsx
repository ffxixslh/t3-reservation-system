import HospitalSwitcher from "~/components/hospital-switcher";
import { MainNav } from "~/components/main-nav";
import { ThemeToggle } from "~/components/theme-toggle";
import { api } from "~/trpc/server";

export default async function Navbar() {
  const hospitals = await api.hospital.getAll.query();

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <HospitalSwitcher items={hospitals} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
