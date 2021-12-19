import { spawn } from "child_process";
import { dirname } from "path";
export const encodeVideo = (path, done) => {
    const folder = dirname(path);
    const args = `-i ${path} -loglevel error -sn -start_number 0 -hls_time 10 -hls_list_size 0 -f hls -progress pipe:1 ${folder}/playlist.m3u8`;
    const ffmpeg = spawn("ffmpeg", args.split(" "));
    ffmpeg.stdout.on("data", function (data) {
        console.log(data.toString());
    });
    ffmpeg.on("disconnect", function () {
        console.log("disconnected");
    });
    ffmpeg.on("error", function (err) {
        console.log("error occured", err);
    });
    ffmpeg.on("exit", function (code, signal) {
        console.log("ffmpeg " + `code ${code} and signal ${signal}`);
        done();
    });
};
//# sourceMappingURL=ffmpeg.js.map