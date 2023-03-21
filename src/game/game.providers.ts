import { DataSource } from 'typeorm';
import { Game } from './game.entity';
import { DATA_SOURCE, Repositories } from '../constants';

export const gameProviders = [
  {
    provide: Repositories.gameRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Game),
    inject: [DATA_SOURCE],
  },
];
