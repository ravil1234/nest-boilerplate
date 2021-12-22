import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { env } from '../env';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: env.db.type as any,
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.database,
  synchronize: Boolean(env.db.synchronize) || false,
  entities: [join(__dirname, '..', '**', '**', '*.entity.{js,ts}')],
};
