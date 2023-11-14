import { format } from "date-fns";

import { api } from "~/trpc/server";

import { type ColorColumn } from "./components/columns";
import { ColorClient } from "./components/client";

const data: ColorColumn[] = [
  {
    id: "1",
    name: "Color1",
    value: "#3498db",
    createdAt: "January 1, 2022",
  },
  {
    id: "2",
    name: "Color2",
    value: "#888888",
    createdAt: "January 2, 2022",
  },
];

const ColorsPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  await Promise.resolve();
  // const colors = await api.color.findMany({
  //   where: {
  //     storeId: params.storeId,
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });

  // const formattedColors: ColorColumn[] = colors.map(
  //   (item) => ({
  //     id: item.id,
  //     name: item.name,
  //     value: item.value,
  //     createdAt: format(item.createdAt, "MMMM do, yyyy"),
  //   }),
  // );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={data} />
      </div>
    </div>
  );
};

export default ColorsPage;
