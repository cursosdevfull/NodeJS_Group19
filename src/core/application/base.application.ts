import { PageResult } from '../interfaces/page-result';
import { BasePort } from '../port/base.port';

export abstract class BaseApplication<Model, Port extends BasePort<Model>> {
  constructor(private readonly port: Port) {}

  async save(model: Model): Promise<Model> {
    return this.port.save(model);
  }

  async delete(id: number): Promise<void> {
    return this.port.delete(id);
  }

  async get(id: number): Promise<Model | null> {
    return this.port.get(id);
  }

  async list(): Promise<Model[]> {
    return this.port.list();
  }

  async getByPage(page: number, pageSize: number): Promise<PageResult<Model>> {
    return this.port.getByPage(page, pageSize);
  }
}
