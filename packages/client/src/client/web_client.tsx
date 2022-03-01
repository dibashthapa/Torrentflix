export default class WebSocketClient {
  public conn: WebSocket | null;
  private connectionUrl: string | null;
  private responseSequence: number;

  // serverSequence is the incrementing sequence number from the // server-sent event stream.
  private eventCallback: ((msg: any) => void) | null;

  constructor() {
    this.conn = null;
    this.connectionUrl = null;
    this.responseSequence = 1;
    this.eventCallback = null;
  }
  initialize(connectionUrl: string) {
    if (this.conn) {
      return;
    }

    if (connectionUrl === null) {
      console.log('websocket must have connection url');
      return;
    }

    this.conn = new WebSocket(`${connectionUrl}`);
    this.connectionUrl = connectionUrl;

    this.conn.onopen = () => {
      console.log('connection opened');
    };

    this.conn.onclose = () => {
      this.conn = null;
      this.responseSequence = 1;
    };

    this.conn.onerror = evt => {
      console.log('websocket error');
      console.log(evt);
    };
  }

  setEventCallback(callback: (msg: any) => void) {
    this.eventCallback = callback;
  }
}
