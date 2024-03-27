import { Metadata } from "next";

import { getServerAuthSession } from "~/server/auth";
import { ChangePasswordForm } from "./component/change-password-form";
import { UnsignedChangePasswordForm } from "./component/unsigned-change-password-form";

export const metadata: Metadata = {
  title: "忘记密码",
};

export default async function ChangePassword() {
  const session = await getServerAuthSession();

  return (
    <>
      {session ? (
        <ChangePasswordForm />
      ) : (
        <UnsignedChangePasswordForm />
      )}
    </>
  );
}
