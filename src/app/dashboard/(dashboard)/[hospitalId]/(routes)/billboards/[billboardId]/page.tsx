import { api } from "~/trpc/server";

import { BillboardForm } from "./components/billboard-form";

const billboard = {
  id: "1",
  label: "Billboard 1",
  createdAt: "January 1, 2022",
};

const BillboardPage = async ({
  params,
}: {
  params: { billboardId: string };
}) => {
  await Promise.resolve(1);
  // const billboard = await api.billboard.findUnique({
  //   where: {
  //     id: params.billboardId,
  //   },
  // });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
