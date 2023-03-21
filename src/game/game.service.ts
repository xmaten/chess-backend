import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateGameDto } from './createGame.dto';

@Injectable()
export class GameService {
  createGame(createGameDto: CreateGameDto) {
    const gamePayload = {
      gameId: uuidv4(),
      playerOne: createGameDto.username,
    };

    return gamePayload;
  }
}
