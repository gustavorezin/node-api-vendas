import { cacheConfig } from '@config/cache';
import { Redis } from 'ioredis';

export class RedisCache {
  private client: Redis;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async save(key: string, value: any) {
    await this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string) {
    const data = await this.client.get(key);
    if (!data) {
      return null;
    }
    return JSON.parse(data) as T;
  }

  public async invalidate(key: string) {
    await this.client.del(key);
  }
}
