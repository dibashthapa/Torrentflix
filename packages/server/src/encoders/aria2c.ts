import { join } from "path";
import { config } from "../config";
import { createWriteStream, existsSync, mkdirSync } from "fs";
import { spawn } from "child_process";
import { getDownloadProgress } from "../utils/download";
import { DoneCallback, Job } from "bull";

export const encodeMagnetToVideo = (
  magnetLink: string,
  fileName: string,
  job: Job,
  done: DoneCallback,
  hashedValue: string
) => {
  const videosPath = join(
    config.rootVideoPath as string,
    "encodedVideos",
    fileName
  );
  const args =
    `--show-console-readout=false --console-log-level=warn --summary-interval=5 --dir=${videosPath} --index-out=1=${fileName} --file-allocation=none --seed-time=0 ${magnetLink}`.split(
      " "
    );
  const logsPath = join(config.rootVideoPath as string, "logs");
  if (!existsSync(logsPath)) {
    mkdirSync(logsPath);
  }

  const logStream = createWriteStream(
    join(logsPath, new Date().getTime().toString())
  );

  const aria2c = spawn("aria2c", args);
  aria2c.stdout.on("data", function (data) {
    const progress = getDownloadProgress(data.toString());
    const percentage = progress.slice(
      progress.indexOf("(") + 1,
      progress.indexOf("/%")
    );
    console.log("percentage", percentage);
    job.progress(percentage);
    logStream.write(progress + "\n");
  });

  aria2c.stdout.on("end", function () {
    logStream.end();
  });

  aria2c.on("error", function (err) {
    console.log(`Error Occured ${err}`);
    logStream.end();
  });
  aria2c.on("exit", function () {
    logStream.end();
    const filePath = join(videosPath, fileName);
    done(null, { filePath, hashedValue });
  });
};
