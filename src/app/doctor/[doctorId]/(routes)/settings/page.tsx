"use client";

import React from "react";

import { SettingsForm } from "./components/settings-form";
import { useDoctorInfoContext } from "~/providers/doctor/doctor-info-provider";

interface SettingsPageParams {
  params: { doctorId: string };
}

const SettingsPage: React.FC<SettingsPageParams> = () => {
  const doctor = useDoctorInfoContext();
  if (!doctor) {
    return null;
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={doctor} />
      </div>
    </div>
  );
};

export default SettingsPage;
