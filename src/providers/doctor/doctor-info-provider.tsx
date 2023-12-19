"use client";

import { createContext, useContext } from "react";
import { type TDoctor } from "~/types";

const DoctorInfoContext = createContext<TDoctor | null>(
  null,
);

export const useDoctorInfoContext = () =>
  useContext(DoctorInfoContext);

export const DoctorInfoProvider = ({
  value,
  children,
}: {
  value: TDoctor | null;
  children: React.ReactNode;
}) => {
  return (
    <DoctorInfoContext.Provider value={value}>
      {children}
    </DoctorInfoContext.Provider>
  );
};
