import express, { NextFunction, Request, Response } from 'express';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';

import { DatabaseBootstrap } from './bootstrap/database.bootstrap';
import { RedisBootstrap } from './bootstrap/redis.bootstrap';
import { ResponseJson } from './core/interceptors/response-json.interceptor';
import InvalidateCache from './core/middlewares/cache.middleware';
import { RequestTimingMiddleware } from './core/middlewares/request-timing';
import { authRouter } from './modules/auth/presentation/auth.routes';
import { courseRouter } from './modules/course/presentation/course.routes';
import { roleRouter } from './modules/role/presentation/role.routes';
import { teacherRouter } from './modules/teacher/presentation/teacher.routes';
import { userRouter } from './modules/user/presentation/user.routes';

class App {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
    this.mountMiddlewares();
    this.mountInterceptors();
    this.mountRoutes();
    this.mountHealthCheck();
    this.mountClearCache();
  }

  private mountMiddlewares() {
    /* const allowedOrigins = [
      'https://dominio1.company.com',
      'https://dominio2.company.com',
    ]; */

    //this.app.use(cors());
    this.app.use(helmet());
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.setHeader(
        'Permissions-Policy',
        'geolocation=(self "https://example.com"), microphone=()',
      );
      next();
    });
    this.app.use(
      rateLimit({
        windowMs: 5 * 60 * 1000,
        max: 20,
      }),
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(RequestTimingMiddleware.execute);

    this.app.use((req: Request, res: Response, next: NextFunction) => {
      //const origin = req.headers.origin;

      //if (origin && allowedOrigins.includes(origin)) {
      //res.setHeader('Access-Control-Allow-Origin', origin);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      );
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization',
      );
      //}

      next();
    });
  }

  private mountInterceptors() {
    this.app.use(ResponseJson);
  }

  private mountRoutes() {
    this.app.get('/', (req, res) => {
      res.send('¡Bienvenidos a Cursos Dev!');
    });
    this.app.use('/v1/course', courseRouter);
    this.app.use('/v1/teacher', teacherRouter);
    this.app.use('/v1/user', userRouter);
    this.app.use('/v1/auth', authRouter);
    this.app.use('/v1/role', roleRouter);
  }

  private mountHealthCheck() {
    this.app.get(
      '/health',
      async (req: Request, res: Response): Promise<any> => {
        try {
          const [_, redisCheck] = await Promise.all([
            DatabaseBootstrap.dataSource.query('select 1+1 as result'),
            RedisBootstrap.isReady(),
          ]);

          if (!redisCheck) {
            return res.status(500).json({
              status: 'Error',
              services: {
                database: 'OK',
                redis: 'ERROR',
              },
            });
          }

          res.status(200).json({
            status: 'OK',
            services: {
              database: 'OK',
              redis: 'OK',
            },
          });
        } catch (error) {
          res.status(500).json({
            status: 'Error',
            services: {
              database: error instanceof Error ? 'ERROR' : 'OK',
              redis: (await RedisBootstrap.isReady()) ? 'OK' : 'ERROR',
            },
          });
        }
      },
    );
  }

  private mountClearCache() {
    this.app.get('/invalidate-cache', InvalidateCache);
  }

  getApp() {
    return this.app;
  }
}

const app = new App().getApp();
export { app };
