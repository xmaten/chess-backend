import { Body, Controller, Param, Post } from '@nestjs/common';
import { GameService } from './game.service';
import { CreateGameDto } from './dtos/createGame.dto';
import { JoinGameDto } from './dtos/joinGame.dto';

@Controller('game')
export class GameController {
  constructor(private gameService: GameService) {}
  @Post('/create')
  async createGame(@Body() createGameDro: CreateGameDto) {
    return this.gameService.createGame(createGameDro);
  }

  @Post('/join')
  async joinGame(@Body() joinGameDto: JoinGameDto) {
    return this.gameService.joinGame(joinGameDto);
  }

  @Post('/:gameId/start')
  async startGame(@Param('gameId') gameId: string) {
    console.log('starting ', gameId);
  }
}
