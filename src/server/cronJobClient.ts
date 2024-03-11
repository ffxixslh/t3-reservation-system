import { CronJob } from "cron";
import { DateTime } from "luxon";

const cronJobClient = () => {
  /**
   * Creates a job based on the provided time value.
   *
   * @param {DateTime | Date | string} timeValue - the value representing the time for the job
   * @return {CronJob} the created job
   */
  const createCronJob = (
    timeValue: string,
    onTickCallback: () => void | Promise<void>,
    timeOffset?: number,
    start = true,
  ): CronJob => {
    const parsedTime = convertTimeValueToDate(timeValue);

    if (timeOffset) {
      parsedTime.setHours(
        parsedTime.getHours() + timeOffset,
      );
    }

    const job = new CronJob(
      parsedTime,
      onTickCallback,
      null,
      start,
    );

    console.log(`
    -------- job --------
    type: ${typeof job}
    job: ${job}
    `);

    return job;
  };

  const convertTimeValueToDate = (
    timeValue: Date | string,
  ) => {
    const result = new Date(timeValue);

    return result;
  };

  return {
    createCronJob,
  };
};

declare global {
  var CronJobClient: ReturnType<typeof cronJobClient>;
}

let CronJobClient: ReturnType<typeof cronJobClient>;

if (process.env.NODE_ENV === "production") {
  CronJobClient = cronJobClient();
} else {
  if (!global.CronJobClient) {
    global.CronJobClient = cronJobClient();
  }
  CronJobClient = global.CronJobClient;
}

export default CronJobClient;
