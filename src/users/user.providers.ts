import { DataSource } from 'typeorm';
import { DATA_SOURCE, Repositories } from '../constants';
import { User } from './user.entity';

export const userProviders = [
  {
    provide: Repositories.userRepository,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE],
  },
];
