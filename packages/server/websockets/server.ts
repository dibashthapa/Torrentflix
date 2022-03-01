import { Server } from "http";
import { server as WebsocketServer } from "websocket";
const createWebsocketServer = (server: Server) => {
  const wsConnection = new WebsocketServer({
    httpServer: server,
    autoAcceptConnections: true,
  });

  server.on("upgrade", function (socket) {
    socket.emit("connection", "hello");
  });

  wsConnection.on("connect", function (connection) {});

  wsConnection.on("close", function (connection) {
    console.log(`websocket connection is closed`);
  });
};
