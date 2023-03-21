import { DataSource } from 'typeorm';
import { DATA_SOURCE } from './constants';

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: 'db',
        entities: ['dist/**/*.entity.js'],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
