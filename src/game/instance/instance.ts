import { ServerPayloads } from '../events/ServerPayloads';
import { ServerEvents } from '../events/ServerEvents';
import { Lobby } from '../lobby/lobby';
import { AuthenticatedSocket } from '../types';

export class Instance {
  public hasStarted = false;
  public hasFinished = false;
  public board = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
  public players = [];

  constructor(private readonly lobby: Lobby) {
    this.initializeBoard();
  }

  public triggerStart(): void {
    if (this.hasStarted) {
      return;
    }

    this.hasStarted = true;

    this.lobby.dispatchToLobby<ServerPayloads[ServerEvents.GameMessage]>(
      ServerEvents.GameMessage,
      {
        board: this.board,
        message: 'Game started!',
      },
    );
  }

  public triggerFinish(): void {
    if (this.hasFinished || !this.hasStarted) {
      return;
    }

    this.hasFinished = true;

    this.lobby.dispatchToLobby<ServerPayloads[ServerEvents.GameMessage]>(
      ServerEvents.GameMessage,
      {
        board: this.board,
        message: 'Game finished!',
      },
    );
  }

  private initializeBoard(): void {
    this.board = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
    this.hasStarted = true;
    this.hasFinished = false;
  }

  public movePiece(board: string, client: AuthenticatedSocket): void {
    if (this.hasFinished || !this.hasStarted) {
      return;
    }
    // TODO: Add check if move is valid

    this.board = board;

    this.lobby.dispatchLobbyState();
  }
}
