import React from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "预约",
};

interface DoctorAppointmentLayoutProps {
  children: React.ReactNode;
}

const DoctorAppointmentLayout: React.FC<
  DoctorAppointmentLayoutProps
> = ({ children }) => {
  return <>{children}</>;
};

export default DoctorAppointmentLayout;
