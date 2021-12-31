import { createServer } from "http";
import app from "./app";
import { torrentQueue } from "./queues/torrentQueue";
import { server } from "websocket";

const WebSocketServer = server;

const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  httpServer,
  autoAcceptConnections: true,
});

// const io = new Server(httpServer, { transports: ["websocket"] });
// io.on("connection", function (socket: Socket) {
//   console.log("socket io connected");
//   torrentQueue.on("progress", function (result) {
//     socket.to(result.data.userId).emit("log", result);
//   });
// });

httpServer.listen(5000, function () {
  console.log("server is running");
});

wsServer.on("connect", function (connection) {
  torrentQueue.on("progress", function (result) {
    connection.sendUTF(JSON.stringify(result));
  });
});
