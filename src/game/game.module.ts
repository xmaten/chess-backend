import { Module } from '@nestjs/common';

import { GameController } from './game.controller';
import { GameService } from './game.service';
import { DatabaseModule } from '../database.module';
import { gameProviders } from './game.providers';
import { GameGateway } from './game.gateway';
import { LobbyManager } from './lobby/lobby.manager';

@Module({
  imports: [DatabaseModule],
  controllers: [GameController],
  providers: [...gameProviders, GameService, GameGateway, LobbyManager],
})
export class GameModule {}
