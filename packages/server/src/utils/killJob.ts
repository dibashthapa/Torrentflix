import { JobId, Queue } from "bull";
import kill from "tree-kill";
import { torrentQueue } from "../queues/torrentQueue";

export function killJob(queue: Queue, jobId?: JobId) {
  return new Promise(async (resolve, reject) => {
    try {
      const job = await queue.getJob(jobId as JobId);
      console.log(job?.data);

      if (!job) {
        return resolve(false);
      }
      if (!job.data.pid) return reject("No pid");
      kill(job.data.pid, "SIGTERM", (err) => {
        if (err) {
          console.log("error occured", err);
          reject(err);
        } else {
          console.log("killing job");
          resolve(true);
        }
      });
      job.discard();
      torrentQueue.resume();
    } catch (e) {
      reject(e);
    }
  });
}
