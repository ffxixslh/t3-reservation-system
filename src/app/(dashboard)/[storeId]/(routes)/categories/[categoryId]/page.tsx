import { api } from "~/trpc/server";

import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({
  params,
}: {
  params: { categoryId: string; storeId: string };
}) => {
  // const category = await api.category.findUnique({
  //   where: {
  //     id: params.categoryId,
  //   },
  // });

  // const billboards = await api.billboard.findMany({
  //   where: {
  //     storeId: params.storeId,
  //   },
  // });

  const { category, billboards } = await Promise.resolve({
    category: {
      name: "Category 1",
      billboardId: "1",
    },
    billboards: [
      {
        id: "1",
        label: "Billboard 1",
      },
    ],
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm
          billboards={billboards}
          initialData={category}
        />
      </div>
    </div>
  );
};

export default CategoryPage;
