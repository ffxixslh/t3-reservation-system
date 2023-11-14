import { api } from "~/trpc/server";

export const getSalesCount = async (storeId: string) => {
  const salesCount = await api.order.count({
    where: {
      storeId,
      isPaid: true,
    },
  });

  return salesCount;
};
