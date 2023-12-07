"use client";

import { type getServerAuthSession } from "~/server/auth";
import { SessionProvider } from "next-auth/react";

export const AuthSessionProvider = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Awaited<ReturnType<typeof getServerAuthSession>>;
}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  );
};
