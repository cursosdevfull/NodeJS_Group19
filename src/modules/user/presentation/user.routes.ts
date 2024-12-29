import { Router } from 'express';

import { AuthenticationGuard } from '../../../core/guards/authentication.guard';
import { AuthorizationGuard } from '../../../core/guards/authorization.guard';
import { CacheMiddleware } from '../../../core/middlewares/cache.middleware';
import { UserAdapter } from '../adapters/user.adapter';
import { UserApplication } from '../application/user.application';
import { UserPort } from '../ports/user.port';
import { USER_CACHE_PREFIX } from './config/prefix-cache';
import { UserController } from './user.controller';

export class UserRoutes {
  readonly router = Router();

  constructor(private readonly controller: UserController) {
    this.mountRoutes();
  }

  mountRoutes() {
    // POST /user
    this.router.post('/', this.controller.create.bind(this.controller));

    // PUT /user/:userId
    this.router.put('/:id', this.controller.update.bind(this.controller));

    // DELETE /user/:userId
    this.router.delete('/:id', this.controller.delete.bind(this.controller));

    // GET /user/page?page=1&pageSize=10
    this.router.get('/page', this.controller.getByPage.bind(this.controller));

    // GET /user/:userId
    this.router.get('/:id', this.controller.getById.bind(this.controller));

    // GET /user
    this.router.get(
      '/',
      AuthenticationGuard.execute,
      AuthorizationGuard.execute('ADMIN', 'OPERATOR'),
      CacheMiddleware.build(USER_CACHE_PREFIX.LIST),
      this.controller.list.bind(this.controller),
    );
  }
}

const port: UserPort = new UserAdapter();
const application = new UserApplication(port);
const controller = new UserController(application);
export const userRouter = new UserRoutes(controller).router;
