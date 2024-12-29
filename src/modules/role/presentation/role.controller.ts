import { Request, Response } from 'express';

import { RoleApplication } from '../application/role.application';

export class RoleController {
  constructor(private readonly application: RoleApplication) {}

  async create(request: Request, response: Response) {
    const { name } = request.body;
    await this.application.save({ name, active: true });
    response.status(204).send();
  }

  async update(request: Request, response: Response) {
    const { roleId } = request.params;
    const { name, active } = request.body;
    await this.application.save({
      id: +roleId,
      name,
      active,
    });
    response.status(204).send();
  }

  async delete(request: Request, response: Response) {
    const { roleId } = request.params;
    await this.application.delete(+roleId);
    response.status(204).send();
  }

  async getById(request: Request, response: Response) {
    const { roleId } = request.params;
    const role = await this.application.get(+roleId);
    if (!role) {
      response.status(404).send();
      return;
    }
    response.json(role);
  }

  async list(request: Request, response: Response) {
    const roles = await this.application.list();
    response.json(roles);
  }

  async getByPage(request: Request, response: Response) {
    const { page = 1, pageSize = 10 } = request.query;
    const result = await this.application.getByPage(+page, +pageSize);
    response.json(result);
  }
}
