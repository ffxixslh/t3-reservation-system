"use client";

import { createContext, useContext } from "react";
import { type TUser } from "~/types";

const UserInfoContext = createContext<TUser | null>(null);

export const useUserInfoContext = () =>
  useContext(UserInfoContext);

export const UserInfoProvider = ({
  value,
  children,
}: {
  value: TUser;
  children: React.ReactNode;
}) => {
  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
};
