import { DataSource } from 'typeorm';
import {PostgresConnectionOptions} from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '123456',
  database: 'auth',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  logging: true,
  synchronize: false,
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/src/migrations/**/*.ts']
}

const appDataSource = new DataSource(config)

export { appDataSource }

export default config;