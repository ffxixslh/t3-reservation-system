import React from "react";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "预约",
};

interface UserAppointmentLayoutProps {
  children: React.ReactNode;
}

const UserAppointmentLayout: React.FC<
  UserAppointmentLayoutProps
> = ({ children }) => {
  return <>{children}</>;
};

export default UserAppointmentLayout;
