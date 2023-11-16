import { format } from "date-fns";

import { api } from "~/trpc/server";

import { type BillboardColumn } from "./components/columns";
import { BillboardClient } from "./components/client";

const data: BillboardColumn[] = [
  {
    id: "1",
    label: "Billboard 1",
    createdAt: "January 1, 2022",
  },
  {
    id: "2",
    label: "Billboard 2",
    createdAt: "January 2, 2022",
  },
  {
    id: "3",
    label: "Billboard 3",
    createdAt: "January 3, 2022",
  },
  {
    id: "4",
    label: "Billboard 4",
    createdAt: "January 4, 2022",
  },
];

const BillboardsPage = async ({
  params,
}: {
  params: { hospitalId: string };
}) => {
  await Promise.resolve(1);
  // const billboards = await api.billboard.findMany({
  //   where: {
  //     hospitalId: params.hospitalId,
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });

  // const formattedBillboards: BillboardColumn[] =
  //   billboards.map((item) => ({
  //     id: item.id,
  //     label: item.label,
  //     createdAt: format(item.createdAt, "MMMM do, yyyy"),
  //   }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={data} />
      </div>
    </div>
  );
};

export default BillboardsPage;
