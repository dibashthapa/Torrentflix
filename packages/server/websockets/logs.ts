import { Socket } from "dgram";
import { createReadStream, readFileSync } from "fs";
import { join } from "path";
import { Server } from "ws";

const logSocket = new Server({
  host: "localhost",
  port: 4600,
  path: "/logs",
});
logSocket.on("connection", function (socket: Socket) {
  socket.on("message", function (msg) {
    const file = createReadStream(join(__dirname, "..", "src", "aria2c.logs"));
    file.on("data", function (data) {
      socket.send(data.toString());
    });

    file.on("end", function () {
      socket.close();
    });
  });
});
