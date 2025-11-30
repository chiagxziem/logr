import { type Job, Worker } from "bullmq";

import env from "@/lib/env";

const logEventsWorker = new Worker(
  "log-events",
  async (job: Job) => {
    console.log("Processing job:", job.data);
  },
  {
    autorun: false,
    connection: {
      url: env.REDIS_URL,
    },
  },
);

console.log("Starting log events worker...");

logEventsWorker.run();
