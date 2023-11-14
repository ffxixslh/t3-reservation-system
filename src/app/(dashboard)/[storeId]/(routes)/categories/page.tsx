import { format } from "date-fns";

import { api } from "~/trpc/server";

import { type CategoryColumn } from "./components/columns";
import { CategoriesClient } from "./components/client";

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

const CategoriesPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  await Promise.resolve(1);
  // const categories = await api.category.findMany({
  //   where: {
  //     storeId: params.storeId,
  //   },
  //   include: {
  //     billboard: true,
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });

  // const formattedCategories: CategoryColumn[] =
  //   categories.map((item) => ({
  //     id: item.id,
  //     name: item.name,
  //     billboardLabel: item.billboard.label,
  //     createdAt: format(item.createdAt, "MMMM do, yyyy"),
  //   }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={data} />
      </div>
    </div>
  );
};

export default CategoriesPage;
