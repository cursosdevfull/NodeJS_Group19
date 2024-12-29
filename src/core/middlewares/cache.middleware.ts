import { NextFunction, Request, Response } from 'express';

import { RedisBootstrap } from '../../bootstrap/redis.bootstrap';

export class CacheMiddleware {
  private static getParameters(params: Record<string, any>) {
    return Object.values(params).join('_');
  }

  static build(prefix: string) {
    return async (
      req: Request,
      res: Response,
      next: NextFunction,
    ): Promise<any> => {
      const parameters = {
        query: this.getParameters(req.query),
        params: this.getParameters(req.params),
        body: this.getParameters(req.body),
      };

      const key = prefix + '_' + Object.values(parameters).join('_');

      const clientRedis = RedisBootstrap.redisClient;
      const cached = await clientRedis.get(key);

      if (cached) {
        console.log('Cache hit');
        return res.json(JSON.parse(cached));
      }

      res.locals.cacheKey = key;
      return next();
    };
  }
}

export default function InvalidateCache(req: Request, res: Response) {
  RedisBootstrap.clear();
  console.log('Cache invalidated');
  res.status(204).send();
}
