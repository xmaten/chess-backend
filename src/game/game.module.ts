import { Module } from '@nestjs/common';

import { GameController } from './game.controller';
import { GameService } from './game.service';
import { GameGateway } from './game.gateway';
import { LobbyManager } from './lobby/lobby.manager';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [GameService, GameGateway, LobbyManager],
})
export class GameModule {}
