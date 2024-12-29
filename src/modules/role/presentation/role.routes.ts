import { Router } from 'express';

import { RoleAdapter } from '../adapters/role.adapter';
import { RoleApplication } from '../application/role.application';
import { RolePort } from '../ports/role.port';
import { RoleController } from './role.controller';

export class RoleRoutes {
  readonly router = Router();

  constructor(private readonly controller: RoleController) {
    this.mountRoutes();
  }

  mountRoutes() {
    // POST /role
    this.router.post('/', this.controller.create.bind(this.controller));

    // PUT /role/:roleId
    this.router.put('/:roleId', this.controller.update.bind(this.controller));

    // DELETE /role/:roleId
    this.router.delete(
      '/:roleId',
      this.controller.delete.bind(this.controller),
    );

    // GET /role/page?page=1&pageSize=10
    this.router.get('/page', this.controller.getByPage.bind(this.controller));

    // GET /role/:roleId
    this.router.get('/:roleId', this.controller.getById.bind(this.controller));

    // GET /role
    this.router.get('/', this.controller.list.bind(this.controller));
  }
}

const port: RolePort = new RoleAdapter();
const application = new RoleApplication(port);
const controller = new RoleController(application);
export const roleRouter = new RoleRoutes(controller).router;
