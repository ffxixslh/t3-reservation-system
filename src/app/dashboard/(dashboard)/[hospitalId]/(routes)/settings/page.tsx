import React from "react";
import { redirect } from "next/navigation";

import { api } from "~/trpc/server";

import { SettingsForm } from "./components/settings-form";

interface SettingsPageParams {
  params: { hospitalId: string };
}

const SettingsPage: React.FC<SettingsPageParams> = async ({
  params,
}) => {
  const hospital = await api.hospital.getOne.query({
    id: params.hospitalId,
  });

  if (!hospital) {
    redirect(`/dashboard`);
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
