import { CacheModule, Module } from '@nestjs/common';
import { redisConfig } from '../../database/redis.config';
import { RedisCacheService } from './redis-cache-service';
import { RedisController } from './redis.controller';

@Module({
  imports: [CacheModule.register(redisConfig)],
  controllers: [RedisController],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
