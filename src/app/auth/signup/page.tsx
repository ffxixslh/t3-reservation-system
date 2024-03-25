import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

import { api } from "~/trpc/server";

import { SignUpForm } from "../signup/component/sign-up-form";

export default async function SignUpPage() {
  const session = await getServerAuthSession();

  if (session) {
    redirect(`/user/${session.user.id}`);
  }

  const hospitals = await api.hospital.getAll.query();

  return <SignUpForm hospitals={hospitals} />;
}
