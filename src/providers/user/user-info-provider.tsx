"use client";

import { createContext, useContext } from "react";
import { type TUserOrigin } from "~/types";

const UserInfoContext = createContext<TUserOrigin | null>(
  null,
);

export const useUserInfoContext = () =>
  useContext(UserInfoContext);

export const UserInfoProvider = ({
  value,
  children,
}: {
  value: TUserOrigin | null;
  children: React.ReactNode;
}) => {
  return (
    <UserInfoContext.Provider value={value}>
      {children}
    </UserInfoContext.Provider>
  );
};
