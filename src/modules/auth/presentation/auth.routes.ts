import { Router } from 'express';

import { UserAdapter } from '../../user/adapters/user.adapter';
import { UserPort } from '../../user/ports/user.port';
import { AuthApplication } from '../application/auth.application';
import { AuthController } from './auth.controller';

export class AuthRoutes {
  readonly router = Router();

  constructor(private readonly controller: AuthController) {
    this.mountRoutes();
  }

  mountRoutes() {
    // POST /login
    this.router.post('/', this.controller.login.bind(this.controller));
  }
}

const port: UserPort = new UserAdapter();
const application = new AuthApplication(port);
const controller = new AuthController(application);
export const authRouter = new AuthRoutes(controller).router;
