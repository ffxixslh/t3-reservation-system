import { api } from "~/trpc/server";
import { SignUpForm } from "../signup/component/sign-up-form";

export default async function SignUpPage() {
  const hospitals = await api.hospital.getAll.query();

  return (
    <section className="grid min-h-screen place-items-center">
      <div className="container mx-auto flex h-full items-center justify-center px-6 py-12">
        <div className="rounded-xl bg-blue-600 px-8 py-6 dark:bg-opacity-10">
          <SignUpForm hospitals={hospitals} />
        </div>
      </div>
    </section>
  );
}
