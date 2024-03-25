import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

import { SignInForm } from "../signin/component/sign-in-form";

export default async function SignInPage() {
  const session = await getServerAuthSession();

  if (session) {
    redirect(`/user/${session.user.id}`);
  }

  return <SignInForm />;
}
