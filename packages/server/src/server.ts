import { createServer } from "http";
import { Server, Socket } from "socket.io";
import app from "./app";
import { torrentQueue } from "./queues/torrentQueue";

const httpServer = createServer(app);
const io = new Server(httpServer, { transports: ["websocket"] });
io.on("connection", function (socket: Socket) {
  console.log("socket io connected");
  torrentQueue.on("progress", function (result) {
    socket.emit("log", result);
  });
});

httpServer.listen(5600, function () {
  console.log("server is running");
});
