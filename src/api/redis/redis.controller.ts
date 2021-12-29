import { Controller, Delete, Get, Inject, Param, Post } from '@nestjs/common';
import { Logger } from 'winston';
import { RedisCacheService } from './redis-cache-service';

@Controller('redis')
export class RedisController {
  constructor(
    @Inject('winston')
    private readonly logger: Logger,
    private redisCacheService: RedisCacheService,
  ) {}

  @Delete('/:key')
  deleteRedisKeyValue(@Param('key') key: string): any {
    return this.redisCacheService.deleteKeyValue(key);
  }
  @Get('/:key')
  getRedisKeyValue(@Param('key') key: string): any {
    return this.redisCacheService.getKeyValue(key);
  }
  @Post('/:key')
  saveRedisKeyValue(@Param('key') key: string): any {
    return this.redisCacheService.setKeyValue(key, 'test-data');
  }
}
