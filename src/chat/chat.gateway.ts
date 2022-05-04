import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from "@nestjs/websockets";

import { Logger } from "@nestjs/common";
import { Server, Socket } from "socket.io";

require("dotenv").config();

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: [process.env.API_DOMAIN]
  }
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  private logger: Logger = new Logger("ChatGateway");

  @SubscribeMessage("message")
  handleMessage(@MessageBody() message: string): void {
    this.server.emit("message", message);
  }

  afterInit(server: Server) {
    this.logger.log("Init");
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
