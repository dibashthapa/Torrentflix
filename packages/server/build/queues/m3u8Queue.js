import { config } from "../config";
import Queue from "bull";
import { encodeVideo } from "../encoders/ffmpeg";
const redisConfig = {
    redis: {
        host: config.redisHost,
        port: config.redisPort,
    },
};
const m3u8Queue = new Queue("ffmpeg transform", { ...redisConfig });
m3u8Queue.process((job, done) => {
    const { filePath } = job.data;
    encodeVideo(filePath, done);
});
export { m3u8Queue };
//# sourceMappingURL=m3u8Queue.js.map