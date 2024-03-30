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
import { getGraphAcceptedAppointments } from "~/actions/get-graph-revenue";
import { getRateAcceptedAppointments } from "~/actions/get-rate-accepted-appointment";
import { getRatePatientActivity } from "~/actions/get-rate-patient-activity";
import { getRateSystemUse } from "~/actions/get-rate-system-use";

interface DashboardPageProps {
  params: {
    hospitalId: string;
  };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params,
}) => {
  const acceptedAppointmentsRate =
    await getRateAcceptedAppointments(params.hospitalId);
  const patientActivityRate = await getRatePatientActivity(
    params.hospitalId,
  );
  const systemUseRate = await getRateSystemUse(
    params.hospitalId,
  );
  const graphRevenue = await getGraphAcceptedAppointments(
    params.hospitalId,
  );

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
                医生预约率
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {acceptedAppointmentsRate}%
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                患者活跃度
              </CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {patientActivityRate}%
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                系统使用统计
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {systemUseRate}%
              </div>
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>预约总览</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
