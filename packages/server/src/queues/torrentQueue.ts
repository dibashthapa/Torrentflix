import { config } from "../config";
import Queue, { DoneCallback, Job, QueueOptions } from "bull";
import { encodeMagnetToVideo } from "../encoders/aria2c";
import { Video } from "../entity/Video";

interface TorrentQueueItem {
  magnetLink: string;
  fileName: string;
  hashedValue: string;
}

const redisConfig: QueueOptions = {
  redis: {
    host: config.redisHost,
    port: config.redisPort,
  },
};

const torrentQueue = new Queue<TorrentQueueItem>("torrent transform", {
  ...redisConfig,
});

torrentQueue.process((job: Job, done: DoneCallback) => {
  const { magnetLink, fileName, hashedValue } = job.data;
  console.log("has value in queueu is", hashedValue);

  encodeMagnetToVideo(magnetLink, fileName, job, done, hashedValue);
});

torrentQueue.on("completed", async function (_: Job, result) {
  console.log("completed", result);
  console.log("aria2c completed");
  const video = await Video.findOne({ hash: result.hashedValue });
  if (video) {
    video.status = "Downloaded";
    video.save();
  }
});

export { torrentQueue };
