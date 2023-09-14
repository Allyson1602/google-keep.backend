import { DataSourceOptions } from 'typeorm';
import { Listing } from './listings/entities/listing.entity';
import { Task } from './tasks/entities/task.entity';
require('dotenv/config');

export const DataSource: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Listing, Task],
  synchronize: true,
};
