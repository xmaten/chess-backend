import { Server } from 'socket.io';
import { Lobby } from './lobby';
import { AuthenticatedSocket } from '../types';
import { ServerException } from '../events/ServerException';
import { SocketExceptions } from '../events/SocketExceptions';

export class LobbyManager {
  public server: Server;

  private readonly lobbies: Map<Lobby['id'], Lobby> = new Map<
    Lobby['id'],
    Lobby
  >();

  public initializeSocket(client: AuthenticatedSocket): void {
    client.data.lobby = null;
  }

  public terminateSocket(client: AuthenticatedSocket): void {
    client.data.lobby?.removeClient(client);
  }

  public createLobby(): Lobby {
    const lobby = new Lobby(this.server);

    this.lobbies.set(lobby.id, lobby);

    return lobby;
  }

  public joinLobby(lobbyId: string, client: AuthenticatedSocket): void {
    const lobby = this.lobbies.get(lobbyId);

    if (!lobby) {
      throw new ServerException(SocketExceptions.LobbyError, 'Lobby not found');
    }

    if (lobby.clients.size >= 2) {
      throw new ServerException(
        SocketExceptions.LobbyError,
        'Lobby already full',
      );
    }

    lobby.dispatchLobbyState();

    lobby.addClient(client);
  }

  // @Cron('*/5 * * * *')
  // private lobbiesCleaner(): void {
  //   for (const [lobbyId, lobby] of this.lobbies) {
  //     const now = new Date().getTime();
  //     const lobbyCreatedAt = lobby.createdAt.getTime();
  //     const lobbyLifetime = now - lobbyCreatedAt;
  //
  //     if (lobbyLifetime > LOBBY_MAX_LIFETIME) {
  //       lobby.dispatchToLobby<ServerPayloads[ServerEvents.GameMessage]>(
  //         ServerEvents.GameMessage,
  //         {
  //           board: '',
  //           message: 'Game timed out',
  //         },
  //       );
  //
  //       lobby.instance.triggerFinish();
  //
  //       this.lobbies.delete(lobby.id);
  //     }
  //   }
  // }
}
