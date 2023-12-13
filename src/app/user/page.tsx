import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import { Loader } from "~/components/ui/loader";

export default async function UserPage() {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }
  if (session.user.role === "PATIENT") {
    redirect(`/user/${session.user.id}`);
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader />
    </div>
  );
}
