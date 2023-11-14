import { format } from "date-fns";

import { api } from "~/trpc/server";

import { type SizeColumn } from "./components/columns";
import { SizesClient } from "./components/client";

const SizesPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  // const sizes = await api.size.findMany({
  //   where: {
  //     storeId: params.storeId,
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });

  // const formattedSizes: SizeColumn[] = sizes.map(
  //   (item) => ({
  //     id: item.id,
  //     name: item.name,
  //     value: item.value,
  //     createdAt: format(item.createdAt, "MMMM do, yyyy"),
  //   }),
  // );
  const formattedSizes = await Promise.resolve([
    {
      id: "1",
      name: "Size1",
      value: "1",
      createdAt: "January 1, 2022",
    },
  ]);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedSizes} />
      </div>
    </div>
  );
};

export default SizesPage;
