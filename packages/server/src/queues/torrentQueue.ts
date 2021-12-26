import { config } from "../config";
import Queue, { Job, QueueOptions } from "bull";
import prismaClient from "../database/prisma";
import aria2c from "../encoders/aria2c";

interface TorrentQueueItem {
  magnetLink: string;
  fileName: string;
  hashedValue: string;
  userId: string;
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

torrentQueue.process(aria2c);

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
