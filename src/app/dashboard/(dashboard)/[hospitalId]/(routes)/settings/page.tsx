import { redirect } from "next/navigation";
// import { auth } from "@clerk/nextjs";

import { api } from "~/trpc/server";

import { SettingsForm } from "./components/settings-form";

const SettingsPage = async ({
  params,
}: {
  params: { hospitalId: string };
}) => {
  const hospital = await api.hospital.getOne.query({
    id: params.hospitalId,
  });

  if (!hospital) {
    redirect(`/`);
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={hospital} />
      </div>
    </div>
  );
};

export default SettingsPage;
