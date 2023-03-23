import { ServerEvents } from './ServerEvents';

export type ServerPayloads = {
  [ServerEvents.LobbyState]: {
    lobbyId: string;
    hasStarted: boolean;
    hasFinished: boolean;
    board: string;
  };

  [ServerEvents.GameMessage]: {
    message: string;
    board?: string;
  };
};
