import { spawn } from "child_process";
import { createWriteStream } from "fs";
import { join } from "path";
const path = "/var/run/media/dibash/445C52040A1F6D48";
const magnetLink = "magnet:?xt=urn:btih:54E3AC6B0B7E04F4A5D5902117518B1855DED662&dn=Making+My+Stepmom+Feel+Better+%5BFilthy+Kings%5D+%282021%29+HD+1080p&tr=http%3A%2F%2F92.42.108.54%3A2710%2Fannounce&tr=udp%3A%2F%2Fopen.stealth.si%3A80%2Fannounce&tr=udp%3A%2F%2Fexodus.desync.com%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.torrent.eu.org%3A451%2Fannounce&tr=udp%3A%2F%2Fretracker.lanta-net.ru%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.internetwarriors.net%3A1337%2Fannounce&tr=udp%3A%2F%2Fp4p.arenabg.com%3A1337%2Fannounce&tr=udp%3A%2F%2Fopentor.org%3A2710%2Fannounce&tr=udp%3A%2F%2Ftracker.moeking.me%3A6969%2Fannounce&tr=http%3A%2F%2Ftracker.dler.org%3A6969%2Fannounce&tr=udp%3A%2F%2Ftracker.zer0day.to%3A1337%2Fannounce&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969%2Fannounce&tr=udp%3A%2F%2Fcoppersurfer.tk%3A6969%2Fannounce";
const aria2c = spawn("aria2c", [
    "--show-console-readout=false",
    "--console-log-level=warn",
    "--summary-interval=5",
    "--dir=" + path + "/videos",
    "--file-allocation=none",
    magnetLink,
]);
const logStream = createWriteStream(join(__dirname, "aria2c.logs"), {
    flags: "w",
});
const filterData = (data) => {
    const firstIndex = data.indexOf("[");
    const lastIndex = data.indexOf("]");
    const formattedStr = data.slice(firstIndex, lastIndex + 1);
    return formattedStr;
};
const getProgress = (data) => {
    const firstIndex = data.indexOf(" ");
    const lastIndex = data.indexOf(" ", firstIndex + 1);
    const size = data.slice(firstIndex, lastIndex);
    const progress = size.slice(size.indexOf("(") + 1, size.indexOf(")"));
    return { size, progress };
};
aria2c.stdout.on("data", function (data) {
    const filteredData = filterData(data.toString());
    const { size, progress } = getProgress(filteredData);
    console.log("file size is ", size, "and prorgess is ", progress);
    logStream.write(filteredData + "\n");
});
aria2c.on("error", function (err) {
    console.log(`Error Occured ${err}`);
    logStream.end();
});
aria2c.on("exit", function (code, signal) {
    console.log(`aria2c exited with code ${code} and signal ${signal}`);
    logStream.end();
});
//# sourceMappingURL=torrent.js.map