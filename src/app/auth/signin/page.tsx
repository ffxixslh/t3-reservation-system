import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";

import { SignInForm } from "../signin/component/sign-in-form";
import Link from "next/link";

export default async function SignInPage() {
  const session = await getServerAuthSession();

  if (session) {
    redirect(`/user/${session.user.id}`);
  }

  return (
    <>
      <SignInForm />
      <div className="mt-4 text-sm font-thin">
        忘记您的密码了吗?
        <Link href="/auth/reset-password">
          <span className="ml-4 w-full text-right text-blue-500 hover:border-b">
            前往重置密码
          </span>
        </Link>
      </div>
    </>
  );
}
