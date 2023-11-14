import { redirect } from "next/navigation";
// import { auth } from "@clerk/nextjs";

import { api } from "~/trpc/server";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await Promise.resolve(1);
  //   const { userId } = auth();

  // if (!userId) {
  //   redirect("/sign-in");
  // }

  // const store = await api.store.findFirst({
  //   where: {
  //     userId,
  //   },
  // });

  // if (store) {
  //   redirect(`/${store.id}`);
  // }

  return <>{children}</>;
}
