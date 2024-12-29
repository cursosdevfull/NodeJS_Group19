import { NextFunction, Request, Response } from 'express';

export class RequestTimingMiddleware {
  static execute(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    res.on('finish', () => {
      const elapsed = Date.now() - start;
      console.log(`Request to ${req.originalUrl} took ${elapsed}ms`);
    });
    next();
  }
}
