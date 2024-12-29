import IORedis, { Redis } from 'ioredis';

import { envs } from '../config/environment-vars';
import { Bootstrap } from './bootstrap';

export class RedisBootstrap implements Bootstrap {
  private static client: IORedis;

  initialize(): Promise<any> {
    return new Promise((resolve, reject) => {
      const client = new IORedis(envs.redis);

      client
        .on('connect', () => {
          console.log('Redis connected');
          resolve(true);
        })
        .on('error', (error) => {
          console.error('Redis error', error);
          reject(error);
        });

      RedisBootstrap.client = client;
    });
  }

  static get redisClient(): Redis {
    return RedisBootstrap.client;
  }

  static async set(key: string, value: string) {
    return RedisBootstrap.client.set(key, value, 'PX', envs.redisExpiresIn);
  }

  static async get(key: string) {
    return RedisBootstrap.client.get(key);
  }

  static async clear(prefix: string = '') {
    const keys = await RedisBootstrap.client.keys(`${prefix}*`);
    const pipeline = RedisBootstrap.client.pipeline();

    keys.forEach((key) => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }

  static async isReady(): Promise<boolean> {
    try {
      await RedisBootstrap.client.ping();
      return true;
    } catch (error) {
      return false;
    }
  }
}
