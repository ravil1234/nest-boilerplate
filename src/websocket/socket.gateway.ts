import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  handleDisconnect(client: any) {
    console.log('Disconnect', client);
  }
  @WebSocketServer()
  public server;

  handleConnection(socket: Socket): void {
    const socketId = socket.id;
    console.log(`New connecting... socket id:`, socketId);
  }
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log('message', message);
    this.server.emit('message', message);
  }
}
