import { DataSourceOptions } from 'typeorm';

export const DataSource: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12334',
  database: 'google_keep',
  entities: [],
  synchronize: true,
};