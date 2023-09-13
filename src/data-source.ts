import { DataSourceOptions } from 'typeorm';
import { Listing } from './listings/entities/listing.entity';
import { Task } from './tasks/entities/task.entity';

export const DataSource: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '12334',
  database: 'google_keep',
  entities: [Listing, Task],
  synchronize: true,
};
