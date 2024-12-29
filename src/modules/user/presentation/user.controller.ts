import { Request, Response } from 'express';

import { RedisBootstrap } from '../../../bootstrap/redis.bootstrap';
import { IdValidator } from '../../../core/presentation/dtos/id-validator.dto';
import { PaginatorValidator } from '../../../core/presentation/dtos/paginator-validator.dto';
import { CypherService } from '../../../core/utils/cypher.service';
import {
  ValidatorBody,
  ValidatorParameters,
  ValidatorQuery,
} from '../../../core/utils/decorator.service';
import { TokenService } from '../../../core/utils/token.service';
import { UserApplication } from '../application/user.application';
import { UserCreateValidator } from './dtos/user-create-validator.dto';
import { UserUpdateValidator } from './dtos/user-update-validator.dto';

export class UserController {
  constructor(private readonly application: UserApplication) {}

  @ValidatorBody(UserCreateValidator)
  async create(request: Request, response: Response) {
    const { firstname, lastname, email, password, roles } = request.body;

    try {
      await this.application.save({
        firstname,
        lastname,
        email,
        password: await CypherService.hash(password, 10),
        active: true,
        roles,
        refreshToken: TokenService.generateRefreshToken(),
      });
      response.status(204).send();
    } catch (error: any) {
      response
        .status(error.status)
        .json({ message: error.message, stack: error.stack });
    }
  }

  @ValidatorBody(UserUpdateValidator)
  @ValidatorParameters(IdValidator)
  async update(request: Request, response: Response) {
    const { id } = request.params;
    const { firstname, lastname, email, password, active, roles } =
      request.body;
    await this.application.save({
      id: +id,
      firstname,
      lastname,
      email,
      password: await CypherService.hash(password, 10),
      roles,
      active,
    });
    response.status(204).send();
  }

  @ValidatorParameters(IdValidator)
  async delete(request: Request, response: Response) {
    const { id } = request.params;
    await this.application.delete(+id);
    response.status(204).send();
  }

  @ValidatorParameters(IdValidator)
  async getById(request: Request, response: Response) {
    const { id } = request.params;
    const user = await this.application.get(+id);
    if (!user) {
      response.status(404).send();
      return;
    }
    response.json(user);
  }

  async list(request: Request, response: Response) {
    const users = await this.application.list();

    const key = response.locals.cacheKey;
    await RedisBootstrap.set(key, JSON.stringify(users));

    response.json(users);
  }

  @ValidatorQuery(PaginatorValidator)
  async getByPage(request: Request, response: Response) {
    const { page = 1, pageSize = 10 } = request.query;
    const result = await this.application.getByPage(+page, +pageSize);
    response.json(result);
  }
}
