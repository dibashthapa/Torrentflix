import { spawn } from "child_process";
const path = "/var/run/media/dibash/445C52040A1F6D48/encodedVideos/Star.Trek.Discovery.S04E01.WEB.x264-PHOENiX/Star.Trek.Discovery.S04E01.WEB.x264-PHOENiX";
const args = `-i ${path} -sn -start_number 0 -hls_time 10 -hls_list_size 0 -f hls -progress pipe:1 playlist.m3u8`;
const ffmpeg = spawn("ffmpeg", args.split(" "));
ffmpeg.stdout.on("data", function (data) {
    console.log(data.toString());
});
ffmpeg.on("error", function (err) {
    console.log("error occured", err);
});
ffmpeg.on("exit", function (code, signal) {
    console.log("child process exited with " + `code ${code} and signal ${signal}`);
});
//# sourceMappingURL=encode.js.map