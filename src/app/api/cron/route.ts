import { NextRequest, NextResponse } from "next/server";
import CronJobClient from "~/server/cronJobClient";
import { api } from "~/trpc/server";
import { TNotificationContent } from "~/types";
import { handleNotification } from "../push/route";

export async function POST(request: NextRequest) {
  const data = (await request.json()) as {
    time: string;
    patientId: string;
    doctorId: string;
  };

  if (!data) {
    return NextResponse.json({
      message: "no data provided",
    });
  }

  const { time, patientId, doctorId } = data;
  if (!time) {
    return NextResponse.json({
      message: "no time provided",
    });
  }

  const doctorUser =
    await api.doctor.getOneByDoctorId.query({
      id: doctorId,
    });
  if (!doctorUser) {
    return NextResponse.json({
      message: "no doctor found",
    });
  }

  try {
    CronJobClient.createCronJob(time, async () => {
      await Promise.all(
        [patientId, doctorUser.userId].map(async (id) => {
          const subscriptionInfo =
            await api.subscriptionInfo.getOne.query({
              userId: id,
            });
          if (!subscriptionInfo) {
            return NextResponse.json({
              message: "no subscription found",
            });
          }

          const appointmentData: TNotificationContent = {
            flag: "single",
            fromUserId: "cron-system",
            toUserId: id,
            notification: {
              title: "预约通知",
              options: {
                body: "您好，距离预约时间还有30分钟，请及时参与。",
              },
            },
          };
          handleNotification(
            appointmentData,
            subscriptionInfo,
            {
              push: true,
              notify: true,
              mail: true,
            },
          );
        }),
      );
    });
  } catch (error) {
    return NextResponse.json({
      message: String(error),
    });
  }

  return NextResponse.json({
    message: "Cron job created!",
  });
}
