import { ObjectLiteral, Repository } from 'typeorm';

import { DatabaseBootstrap } from '../../bootstrap/database.bootstrap';
import { BaseDtoImpl } from '../dtos/base.dto';
import { PageResult } from '../interfaces/page-result';

export class BaseAdapter<
  Entity extends ObjectLiteral,
  Model,
  Dto extends BaseDtoImpl<Entity, Model>,
> {
  constructor(
    private readonly entity: new () => Entity,
    private readonly dto: Dto,
  ) {}

  async save(model: Model): Promise<Model> {
    const repository: Repository<Entity> =
      DatabaseBootstrap.dataSource.getRepository(this.entity);
    const entity = this.dto.fromDomainToData(model) as Entity;
    await repository.save(entity);
    return model;
  }

  async delete(id: number): Promise<void> {
    const repository: Repository<Entity> =
      DatabaseBootstrap.dataSource.getRepository(this.entity);
    const entity = await repository.findOne({ where: { id } as any });
    if (entity) {
      (entity as any).active = false;
      await repository.save(entity);
    }
  }

  async get(id: number): Promise<Model | null> {
    const repository: Repository<Entity> =
      DatabaseBootstrap.dataSource.getRepository(this.entity);
    const entity = await repository.findOne({
      where: { id, active: true } as any,
    });
    if (entity) {
      return this.dto.fromDataToDomain(entity) as Model;
    }
    return null;
  }

  async list(): Promise<Model[]> {
    const repository: Repository<Entity> =
      DatabaseBootstrap.dataSource.getRepository(this.entity);
    const entities = await repository.find({
      where: { active: true } as any,
    });
    return this.dto.fromDataToDomain(entities) as Model[];
  }

  async getByPage(page: number, pageSize: number): Promise<PageResult<Model>> {
    const repository: Repository<Entity> =
      DatabaseBootstrap.dataSource.getRepository(this.entity);
    const [entities, total] = await repository.findAndCount({
      where: { active: true } as any,
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return {
      data: this.dto.fromDataToDomain(entities) as Model[],
      page,
      pageSize,
      total,
    };
  }
}
