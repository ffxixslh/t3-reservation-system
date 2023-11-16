import { format } from "date-fns";

import { api } from "~/trpc/server";
import { formatter } from "~/lib/utils";

import { ProductsClient } from "./components/client";
import { type ProductColumn } from "./components/columns";

const data: ProductColumn[] = [
  {
    id: "1",
    name: "Product 1",
    isFeatured: false,
    isArchived: false,
    price: "1234",
    category: "Category 1",
    size: "Size 1",
    color: "Color 1",
    createdAt: "February 1, 2022",
  },
];

const ProductsPage = async ({
  params,
}: {
  params: { hospitalId: string };
}) => {
  await Promise.resolve(1);
  // const products = await api.product.findMany({
  //   where: {
  //     hospitalId: params.hospitalId,
  //   },
  //   include: {
  //     category: true,
  //     size: true,
  //     color: true,
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });

  // const formattedProducts: ProductColumn[] = products.map(
  //   (item) => ({
  //     id: item.id,
  //     name: item.name,
  //     isFeatured: item.isFeatured,
  //     isArchived: item.isArchived,
  //     price: formatter.format(item.price.toNumber()),
  //     category: item.category.name,
  //     size: item.size.name,
  //     color: item.color.value,
  //     createdAt: format(item.createdAt, "MMMM do, yyyy"),
  //   }),
  // );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={data} />
      </div>
    </div>
  );
};

export default ProductsPage;
