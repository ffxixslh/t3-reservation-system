"use client";

import { createContext, useContext } from "react";
import { type TPatientWithoutPassword } from "~/types";

const UserInfoContext =
  createContext<TPatientWithoutPassword | null>(null);

export const useUserInfoContext = () =>
  useContext(UserInfoContext);

export const UserInfoProvider = ({
  value,
  children,
}: {
  value: TPatientWithoutPassword;
  children: React.ReactNode;
}) => {
  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
};
