import { EventEmitter } from "events";
import { connection, request } from "websocket";
export interface Socket extends EventEmitter {
  on(event: "request", cb: (request: request) => void): this;
  on(event: "connect", cb: (connection: connection) => void): this;
  on(
    event: "close",
    cb: (connection: connection, reason: number, desc: string) => void
  ): this;
  on(event: "connection", cb: (message: string) => void): this;
}

export default class SocketImpl extends EventEmitter implements Socket {
  constructor(private socket: connection) {
    super();
    this.socket.on("message", (msg) => {
      this.emit("message", msg.toString());
    });

    this.socket.on("close", function () {
      this.emit("close");
    });

    this.socket.on("error", function (e: Error) {
      this.emit("error", e);
    });
  }

  close(code?: number): void {
    this.socket.close(code);
  }
}
