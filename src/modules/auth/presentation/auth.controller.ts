import { Request, Response } from 'express';

import { ValidatorBody } from '../../../core/utils/decorator.service';
import { AuthApplication } from '../application/auth.application';
import { Auth } from '../models/auth';
import { AuthLoginValidator } from '../presentation/dtos/auth-login.validator';

export class AuthController {
  constructor(private readonly application: AuthApplication) {}

  @ValidatorBody(AuthLoginValidator)
  async login(request: Request, response: Response) {
    const { email, password } = request.body;

    const auth = new Auth();
    auth.email = email;
    auth.password = password;

    const tokens = await this.application.login(auth);

    if (!tokens) {
      response.status(401).send();
    } else {
      response.json(tokens);
    }
  }
}
