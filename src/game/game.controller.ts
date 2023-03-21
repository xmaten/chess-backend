import { Body, Controller, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dtos/createGame.dto';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}
  @Post('/create')
  async createGame(@Body() createGameDro: CreateGameDto) {
    return this.gameService.createGame(createGameDro);
  }
}
