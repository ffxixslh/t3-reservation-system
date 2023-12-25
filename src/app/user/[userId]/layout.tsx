import { redirect } from "next/navigation";
import UserNavbar from "~/components/user/user-navbar";
import { UserInfoProvider } from "~/providers/user/user-info-provider";
import { api } from "~/trpc/server";

export default async function UserLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { userId: string };
}) {
  const user = await api.user.getOneById.query({
    id: params.userId,
  });

  if (!user) {
    redirect("/");
  }

  return (
    <UserInfoProvider value={user}>
      <UserNavbar />
      {children}
    </UserInfoProvider>
  );
}
