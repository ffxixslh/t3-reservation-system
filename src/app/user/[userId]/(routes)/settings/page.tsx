"use client";

import React from "react";

import { SettingsForm } from "./components/settings-form";
import { useUserInfoContext } from "~/providers/user/user-info-provider";

interface SettingsPageParams {
  params: { userId: string };
}

const SettingsPage: React.FC<SettingsPageParams> = () => {
  const user = useUserInfoContext();
  if (!user) {
    return null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={user} />
      </div>
    </div>
  );
};

export default SettingsPage;
