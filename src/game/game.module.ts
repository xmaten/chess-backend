import { Module } from '@nestjs/common';

import { GameController } from './game.controller';
import { GameService } from './game.service';
import { DatabaseModule } from '../database.module';
import { gameProviders } from './game.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [GameController],
  providers: [...gameProviders, GameService],
})
export class GameModule {}
