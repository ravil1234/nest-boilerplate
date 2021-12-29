import * as redisStore from 'cache-manager-redis-store';
import { env } from 'src/env';

export const redisConfig: any = {
  store: redisStore,
  host: env.redis.host,
  port: env.redis.port,
  ttl: env.redis.ttl,
};
