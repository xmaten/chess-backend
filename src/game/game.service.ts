import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateGameDto } from './dtos/createGame.dto';
import { Repositories } from '../constants';
import { Repository } from 'typeorm';
import { Game } from './game.entity';
import { JoinGameDto } from './dtos/joinGame.dto';

@Injectable()
export class GameService {
  constructor(
    @Inject(Repositories.gameRepository)
    private gameRepository: Repository<Game>,
  ) {}

  createGame(createGameDto: CreateGameDto) {
    const gamePayload = {
      gameId: uuidv4(),
      playerOne: createGameDto.username,
    };

    const game = this.gameRepository.create(gamePayload);

    return this.gameRepository.save(game);
  }

  async joinGame(joinGameDto: JoinGameDto) {
    const game = await this.gameRepository.findOne({
      where: { gameId: joinGameDto.gameId },
    });

    if (!game) {
      throw new NotFoundException('Game not found');
    }

    game.playerTwo = joinGameDto.username;

    return this.gameRepository.save(game);
  }
}
