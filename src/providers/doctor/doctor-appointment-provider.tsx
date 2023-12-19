"use client";

import { createContext, useContext } from "React";
import { type TAppointment } from "~/types";

const AppointmentContext =
  createContext<TAppointment | null>(null);

export const useUserAppointmentContext = () =>
  useContext(AppointmentContext);

export const UserAppointmentContextProvider = ({
  value,
  children,
}: {
  value: TAppointment;
  children: React.ReactNode;
}) => {
  return (
    <AppointmentContext.Provider value={value}>
      {children}
    </AppointmentContext.Provider>
  );
};
