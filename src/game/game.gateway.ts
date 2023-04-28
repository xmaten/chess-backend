import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WsResponse,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { LobbyManager } from './lobby/lobby.manager';
import { ServerEvents } from './events/ServerEvents';
import { ServerException } from './events/ServerException';
import { ServerPayloads } from './events/ServerPayloads';
import { SocketExceptions } from './events/SocketExceptions';
import { AuthenticatedSocket } from './types';
import { ClientEvents } from './events/ClientEvents';

@WebSocketGateway()
export class GameGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger: Logger = new Logger(GameGateway.name);
  constructor(private readonly lobbyManager: LobbyManager) {}

  afterInit(server: Server): any {
    this.lobbyManager.server = server;

    this.logger.log('Game server initialized !');
  }

  async handleConnection(client: Socket, ...args: any[]): Promise<void> {
    this.lobbyManager.initializeSocket(client as AuthenticatedSocket);
  }

  async handleDisconnect(client: AuthenticatedSocket): Promise<void> {
    this.lobbyManager.terminateSocket(client);
  }

  @SubscribeMessage(ClientEvents.LobbyCreate)
  onLobbyCreate(
    client: AuthenticatedSocket,
    data: any,
  ): WsResponse<ServerPayloads[ServerEvents.GameMessage]> {
    const lobby = this.lobbyManager.createLobby();
    client.data.color = 'white';
    client.data.playerId = data.playerId;
    client.data.username = data.username;

    lobby.addClient(client);

    return {
      event: ServerEvents.GameMessage,
      data: {
        message: 'Lobby created',
        color: client.data.color,
      } as any,
    };
  }

  @SubscribeMessage(ClientEvents.LobbyJoin)
  onLobbyJoin(
    client: AuthenticatedSocket,
    data: any,
  ): WsResponse<ServerPayloads[ServerEvents.GameMessage]> {
    if (!client.data.color) {
      client.data.color = 'black';
    }

    if (!client.data.playerId) {
      client.data.playerId = data.playerId;
    }

    this.lobbyManager.joinLobby(data.lobbyId, client);

    return {
      event: ServerEvents.GameMessage,
      data: {
        message: 'Lobby joined',
        color: client.data.color,
      } as any,
    };
  }

  @SubscribeMessage(ClientEvents.LobbyLeave)
  onLobbyLeave(client: AuthenticatedSocket): void {
    client.data.lobby?.removeClient(client);
  }

  @SubscribeMessage(ClientEvents.MovePiece)
  onMovePiece(client: AuthenticatedSocket, board: string): void {
    if (!client.data.lobby) {
      throw new ServerException(
        SocketExceptions.LobbyError,
        'You are not in a lobby',
      );
    }

    client.data.lobby.instance.movePiece(board, client);
  }
}
