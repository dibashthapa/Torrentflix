import kill from "tree-kill";
import { torrentQueue } from "../queues/torrentQueue";
export function killJob(queue, jobId) {
    return new Promise(async (resolve, reject) => {
        try {
            const job = await queue.getJob(jobId);
            console.log(job?.data);
            if (!job) {
                return resolve(false);
            }
            if (!job.data.pid)
                return reject("No pid");
            kill(job.data.pid, "SIGTERM", (err) => {
                if (err) {
                    console.log("error occured", err);
                    reject(err);
                }
                else {
                    console.log("killing job");
                    resolve(true);
                }
            });
            job.discard();
            torrentQueue.resume();
        }
        catch (e) {
            reject(e);
        }
    });
}
//# sourceMappingURL=killJob.js.map