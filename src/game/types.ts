import { Socket } from 'socket.io';
import { ServerEvents } from './events/ServerEvents';
import { Lobby } from './lobby/lobby';

export type AuthenticatedSocket = Socket & {
  data: {
    lobby: null | Lobby;
  };

  emit: <T>(ev: ServerEvents, data: T) => boolean;
};
