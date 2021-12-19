import { join } from "path";
import { config } from "../config";
import { spawn } from "child_process";
import { getDownloadProgress } from "../utils/download";
import { wrapProcessor } from "../utils/wrapProcessor";
const encodeMagnetToVideo = (job, done) => {
    const { magnetLink, fileName, hashedValue } = job.data;
    const videosPath = join(config.rootVideoPath, "encodedVideos", fileName);
    const filePath = join(videosPath, fileName);
    const args = `-s 10 -x 16 --show-console-readout=false --console-log-level=warn --summary-interval=5 --dir=${videosPath} --index-out=1=${fileName} --file-allocation=none --seed-time=0 ${magnetLink}`.split(" ");
    const aria2c = spawn("aria2c", args);
    aria2c.stdout.on("data", async function (data) {
        const progress = getDownloadProgress(data.toString());
        const percentage = progress.slice(progress.indexOf("(") + 1, progress.indexOf("/%"));
        console.log("percentage", percentage);
        job.progress(percentage);
        if (percentage.includes("99")) {
            done(null, { filePath, hashedValue });
        }
    });
    aria2c.on("error", function (err) {
        console.log(`Error Occured ${err}`);
    });
    aria2c.on("exit", function () {
        done(null, { filePath, hashedValue });
    });
};
export default wrapProcessor(encodeMagnetToVideo);
//# sourceMappingURL=aria2c.js.map