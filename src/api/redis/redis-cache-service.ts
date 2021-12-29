import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import * as cacheManager from 'cache-manager';
import { Logger } from 'winston';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: cacheManager,
    @Inject('winston')
    private readonly logger: Logger,
  ) {}
  async getKeyValue(id: string): Promise<any> {
    const key = `test_${id}`;
    return await this.cache.get(key);
  }
  async setKeyValue(id: string, value: any): Promise<any> {
    const key = `test_${id}`;
    return await this.cache.set(key, value);
  }
  async deleteKeyValue(key: string): Promise<any> {
    return await this.cache.del(key);
  }
}
