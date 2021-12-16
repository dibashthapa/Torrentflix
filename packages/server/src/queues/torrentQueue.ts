import { config } from "../config";
import Queue, { Job, QueueOptions } from "bull";
import path from "path";
import prismaClient from "../database/prisma";

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
  const video = await prismaClient.video.findFirst({
    where: {
      hash: result.hashedValue,
    },
  });
  if (video) {
    await prismaClient.video.update({
      where: {
        id: video.id,
      },
      data: {
        status: "Downloaded",
      },
    });
  }
});

export { torrentQueue };
