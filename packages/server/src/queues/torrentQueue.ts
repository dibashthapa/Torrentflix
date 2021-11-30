import { config } from "../config";
import Queue, { DoneCallback, Job, QueueOptions } from "bull";
import encodeMagnetToVideo from "../encoders/aria2c";
import { Video } from "../entity/Video";
import path from "path";
import { dir } from "console";

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

torrentQueue.process(path.join(process.cwd(), "src/encoders/aria2c.ts"));

torrentQueue.on("completed", async function (_: Job, result) {
  console.log("completed", result);
  // const video = await Video.findOne({ hash: result.hashedValue });
  // if (video) {
  //   video.status = "Downloaded";
  //   video.save();
  // }
});

export { torrentQueue };
