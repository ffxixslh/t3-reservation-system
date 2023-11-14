import { api } from "~/trpc/server";

export const getStockCount = async (storeId: string) => {
  const stockCount = await api.product.count({
    where: {
      storeId,
      isArchived: false,
    },
  });

  return stockCount;
};
