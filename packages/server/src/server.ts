import { createServer } from "http";
import app from "./app";
import { torrentQueue } from "./queues/torrentQueue";
import { server } from "websocket";
import { setupConfig } from "./config";

const WebSocketServer = server;

const httpServer = createServer(app);

const wsServer = new WebSocketServer({
  httpServer,
  autoAcceptConnections: true,
});

httpServer.listen(5000, function () {
  console.log("server is running");
  setupConfig();
});

wsServer.on("connect", function (connection) {
  torrentQueue.on("progress", function (result) {
    connection.sendUTF(JSON.stringify(result));
  });
});
