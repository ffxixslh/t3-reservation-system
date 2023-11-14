import { format } from "date-fns";

import { api } from "~/trpc/server";
import { formatter } from "~/lib/utils";

import { type OrderColumn } from "./components/columns";
import { OrderClient } from "./components/client";

const data = [
  {
    id: "1",
    phone: "13000000001",
    address: "NY",
    isPaid: false,
    totalPrice: "1234",
    products: "Product 1",
    createdAt: "January 1, 2022",
  },
  {
    id: "2",
    phone: "13000000002",
    address: "NY",
    isPaid: false,
    totalPrice: "123",
    products: "Product 2",
    createdAt: "January 2, 2022",
  },
];

const OrdersPage = async ({
  params,
}: {
  params: { storeId: string };
}) => {
  await Promise.resolve(1);
  // const orders = await api.order.findMany({
  //   where: {
  //     storeId: params.storeId,
  //   },
  //   include: {
  //     orderItems: {
  //       include: {
  //         product: true,
  //       },
  //     },
  //   },
  //   orderBy: {
  //     createdAt: "desc",
  //   },
  // });

  // const formattedOrders: OrderColumn[] = orders.map(
  //   (item) => ({
  //     id: item.id,
  //     phone: item.phone,
  //     address: item.address,
  //     products: item.orderItems
  //       .map((orderItem) => orderItem.product.name)
  //       .join(", "),
  //     totalPrice: formatter.format(
  //       item.orderItems.reduce((total, item) => {
  //         return total + Number(item.product.price);
  //       }, 0),
  //     ),
  //     isPaid: item.isPaid,
  //     createdAt: format(item.createdAt, "MMMM do, yyyy"),
  //   }),
  // );

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={data} />
      </div>
    </div>
  );
};

export default OrdersPage;
