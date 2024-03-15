import { CronJob } from "cron";
import { DateTime } from "luxon";

const cronJobClient = () => {
  /**
   * Creates a job based on the provided time value.
   *
   * @param {DateTime | Date | string} timeValue - the value representing the time for the job
   * @param {() => void | Promise<void>} onTickCallback - the callback to be called when the job is triggered
   * @param {number} timeOffset - the offset in hours to be added to the time value, default to -30 minutes.
   * @param {boolean} start - whether the job should be started
   * @return {CronJob} the created job
   */
  const createCronJob = (
    timeValue: string,
    onTickCallback: () => void | Promise<void>,
    timeOffset: number = -30,
    start: boolean = true,
  ): CronJob => {
    const parsedTime = convertTimeValueToDateTime(
      timeValue,
      timeOffset,
    );

    const job = new CronJob(
      parsedTime,
      onTickCallback,
      null,
      start,
    );
    return job;
  };

  const convertTimeValueToDateTime = (
    timeValue: string,
    timeOffset: number,
  ) => {
    const result = DateTime.fromISO(timeValue)
      .plus({
        minutes: timeOffset,
      })
      .toJSDate();

    return result;
  };

  return {
    createCronJob,
  };
};

declare global {
  var _CronJobClient: ReturnType<typeof cronJobClient>;
}

let CronJobClient: ReturnType<typeof cronJobClient>;

if (process.env.NODE_ENV === "production") {
  CronJobClient = cronJobClient();
} else {
  if (!global._CronJobClient) {
    global._CronJobClient = cronJobClient();
  }
  CronJobClient = global._CronJobClient;
}

export default CronJobClient;
