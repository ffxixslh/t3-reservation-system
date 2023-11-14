import { redirect } from "next/navigation";
// import { auth } from "@clerk/nextjs";

import { api } from "~/trpc/server";

import { SettingsForm } from "./components/settings-form";

const data: CategoryColumn[] = [
  {
    id: "1",
    name: "Category 1",
    billboardLabel: "Billboard 1",
    createdAt: "January 1, 2022",
  },
  {
    id: "2",
    name: "Category 2",
    billboardLabel: "Billboard 2",
    createdAt: "January 2, 2022",
  },
];

const SettingsPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  await Promise.resolve(1);
  // const { userId } = auth();

  // if (!userId) {
  //   redirect("/sign-in");
  // }

  // const store = await api.store.findFirst({
  //   where: {
  //     id: params.storeId,
  //     userId,
  //   },
  // });

  // if (!store) {
  //   redirect("/");
  // }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={data} />
      </div>
    </div>
  );
};

export default SettingsPage;
