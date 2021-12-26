import { DoneCallback, Job, ProcessCallbackFunction } from "bull";

export function wrapProcessor(processor: ProcessCallbackFunction<void>) {
  async function wrappedProcessor(job: Job, done: DoneCallback) {
    const exitHandler = (exitCode: number) => {
      console.log(
        `Received SIGTERM for job id '${job.id}' with exit code '${exitCode}' and PID '${process.pid}'`
      );
      job.discard();
      process.exit(exitCode);
    };
    process.on("SIGTERM", exitHandler);

    try {
      await job.update({ ...job.data, pid: process.pid });
      const result = processor(job, done);
      console.log(result);
      return result;
    } finally {
      process.removeListener("SIGTERM", exitHandler);
    }
  }
  return wrappedProcessor;
}
