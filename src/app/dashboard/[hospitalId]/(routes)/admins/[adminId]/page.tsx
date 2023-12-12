import { api } from "~/trpc/server";

import { ProductForm } from "./components/product-form";

const ProductPage = async ({
  params,
}: {
  params: { productId: string; hospitalId: string };
}) => {
  // const product = await api.product.findUnique({
  //   where: {
  //     id: params.productId,
  //   },
  //   include: {
  //     images: true,
  //   },
  // });

  // const categories = await api.category.findMany({
  //   where: {
  //     hospitalId: params.hospitalId,
  //   },
  // });

  // const sizes = await api.size.findMany({
  //   where: {
  //     hospitalId: params.hospitalId,
  //   },
  // });

  // const colors = await api.color.findMany({
  //   where: {
  //     hospitalId: params.hospitalId,
  //   },
  // });

  const { categories, colors, sizes, product } =
    await Promise.resolve({
      categories: [],
      colors: [],
      sizes: [],
      product: {
        id: "",
        name: "",
        price: "",
        images: [],
      },
    });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
