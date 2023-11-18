import { Building } from "lucide-react";
import Link from "next/link";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";

import { redirect } from "next/navigation";

import { api } from "~/trpc/server";

export default async function DashboardRootPage() {
  const hospitals = await api.hospital.getAll.query();

  if (hospitals.length < 1) {
    redirect(`/dashboard/setup`);
  }

  return (
    <div className="flex h-screen w-screen flex-col place-items-center justify-center">
      <div className="h-72 w-80">
        <div className="mb-2 px-1 text-start text-2xl font-bold">
          {`医院仪表板`}
        </div>
        <Command className="rounded-lg border">
          <CommandList>
            <CommandInput placeholder={`搜索医院...`} />
            <CommandEmpty>{`找不到该医院。`}</CommandEmpty>
            <CommandGroup heading={`点击进入仪表板`}>
              {hospitals.map((hospital) => (
                <Link
                  key={hospital.id}
                  href={`/dashboard/${hospital.id}`}
                >
                  <CommandItem className="text-md cursor-pointer">
                    <Building className="mr-2 h-4 w-4" />
                    {hospital.name}
                  </CommandItem>
                </Link>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
    </div>
  );
}
