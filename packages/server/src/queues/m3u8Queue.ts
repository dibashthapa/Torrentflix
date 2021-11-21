import { config } from "../config";
import Queue, { DoneCallback, Job, QueueOptions } from "bull";
import { encodeVideo } from "../encoders/ffmpeg";

const redisConfig: QueueOptions = {
  redis: {
    host: config.redisHost,
    port: config.redisPort,
  },
};

const m3u8Queue = new Queue("ffmpeg transform", { ...redisConfig });

m3u8Queue.process((job: Job, done: DoneCallback) => {
  const { filePath } = job.data;
  encodeVideo(filePath, done);
});

export { m3u8Queue };
