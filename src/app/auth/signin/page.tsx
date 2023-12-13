import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

import { SignInForm } from "../signin/component/sign-in-form";

export default async function SignInPage() {
  const session = await getServerAuthSession();

  if (session) {
    redirect(`/user/${session.user.id}`);
  }

  return (
    <section className="grid min-h-screen place-items-center">
      <div className="container mx-auto flex h-full items-center justify-center px-6 py-12">
        <div className="rounded-xl bg-orange-600 px-8 py-6 dark:bg-opacity-10">
          <SignInForm />
        </div>
      </div>
    </section>
  );
}
