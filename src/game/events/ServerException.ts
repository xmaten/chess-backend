import { WsException } from '@nestjs/websockets';
import { SocketExceptions } from './SocketExceptions';
import { ServerExceptionResponse } from './ServerExceptionResponse';

export class ServerException extends WsException {
  constructor(type: SocketExceptions, message?: string | object) {
    const serverExceptionResponse: ServerExceptionResponse = {
      exception: type,
      message: message,
    };

    super(serverExceptionResponse);
  }
}
