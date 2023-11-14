import {
  CreditCard,
  DollarSign,
  Package,
} from "lucide-react";

import { Separator } from "~/components/ui/separator";
import { Overview } from "~/components/overview";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Heading } from "~/components/ui/heading";
import { getTotalRevenue } from "~/actions/get-total-revenue";
import { getSalesCount } from "~/actions/get-sales-count";
import { getGraphRevenue } from "~/actions/get-graph-revenue";
import { getStockCount } from "~/actions/get-stock-count";
import { formatter } from "~/lib/utils";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params,
}) => {
  await Promise.resolve(1);

  const data = [
    {
      name: "Jan",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Feb",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Mar",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Apr",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "May",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Jun",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Jul",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Aug",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Sep",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Oct",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Nov",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Dec",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
  ];
  // const totalRevenue = await getTotalRevenue(
  //   params.storeId,
  // );
  // const graphRevenue = await getGraphRevenue(
  //   params.storeId,
  // );
  // const salesCount = await getSalesCount(params.storeId);
  // const stockCount = await getStockCount(params.storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Dashboard"
          description="Overview of your store"
        />
        <Separator />
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {/* {formatter.format(totalRevenue)} */}
                {"1234"}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sales
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {/* +{salesCount} */}+{1234}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {/* {stockCount} */}
                {1234}
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={data} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
