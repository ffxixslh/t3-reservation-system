import React from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "预约",
};

interface AppointmentLayoutProps {
  children: React.ReactNode;
}

const AppointmentLayout: React.FC<
  AppointmentLayoutProps
> = ({ children }) => {
  return <>{children}</>;
};

export default AppointmentLayout;
