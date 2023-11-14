// import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import StoreSwitcher from "~/components/store-switcher";
import { MainNav } from "~/components/main-nav";
import { ThemeToggle } from "~/components/theme-toggle";
import { api } from "~/trpc/server";

const data: { id: string; name: string }[] = [
  {
    id: "1",
    name: "Store1",
  },
  {
    id: "2",
    name: "Store2",
  },
];

export default async function Navbar() {
  await Promise.resolve(1);
  //   const { userId } = auth();

  // if (!userId) {
  //   redirect("/sign-in");
  // }

  // const stores = await api.store.findMany({
  //   where: {
  //     userId,
  //   },
  // });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={data} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          {/* <UserButton afterSignOutUrl="/" /> */}
        </div>
      </div>
    </div>
  );
}
