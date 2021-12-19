import { config } from "../config";
import Queue from "bull";
import path from "path";
import prismaClient from "../database/prisma";
const redisConfig = {
    redis: {
        host: config.redisHost,
        port: config.redisPort,
    },
};
const torrentQueue = new Queue("torrent transform", {
    ...redisConfig,
});
torrentQueue.process(path.join(process.cwd(), "src/encoders/aria2c.ts"));
torrentQueue.on("completed", async function (_, result) {
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
//# sourceMappingURL=torrentQueue.js.map