import { ObjectLiteral, Repository } from 'typeorm';

import { DatabaseBootstrap } from '../../bootstrap/database.bootstrap';
import { BaseDtoImpl } from '../dtos/base.dto';
import { DatabaseException } from '../exceptions/database.exception';
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
    try {
      const repository: Repository<Entity> =
        DatabaseBootstrap.dataSource.getRepository(this.entity);
      const entity = this.dto.fromDomainToData(model) as Entity;
      await repository.save(entity);
      return model;
    } catch (error) {
      const exception = new DatabaseException(
        'Error saving entity: ' + this.entity.name,
      );
      exception.stack = error ? (error as string) : '';
      exception.status = 500;
      throw exception;
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const repository: Repository<Entity> =
        DatabaseBootstrap.dataSource.getRepository(this.entity);
      const entity = await repository.findOne({ where: { id } as any });
      if (entity) {
        (entity as any).active = false;
        await repository.save(entity);
      }
    } catch (error) {
      const exception = new DatabaseException(
        'Error deleting entity: ' + this.entity.name,
      );
      exception.stack = error ? (error as string) : '';
      exception.status = 500;
      throw exception;
    }
  }

  async get(id: number): Promise<Model | null> {
    try {
      const repository: Repository<Entity> =
        DatabaseBootstrap.dataSource.getRepository(this.entity);
      const entity = await repository.findOne({
        where: { id, active: true } as any,
      });
      if (entity) {
        return this.dto.fromDataToDomain(entity) as Model;
      }
      return null;
    } catch (error) {
      const exception = new DatabaseException(
        'Error getting entity: ' + this.entity.name,
      );
      exception.stack = error ? (error as string) : '';
      exception.status = 500;
      throw exception;
    }
  }

  async list(): Promise<Model[]> {
    try {
      const repository: Repository<Entity> =
        DatabaseBootstrap.dataSource.getRepository(this.entity);
      const entities = await repository.find({
        where: { active: true } as any,
      });
      return this.dto.fromDataToDomain(entities) as Model[];
    } catch (error) {
      const exception = new DatabaseException(
        'Error listing entities: ' + this.entity.name,
      );
      exception.stack = error ? (error as string) : '';
      exception.status = 500;
      throw exception;
    }
  }

  async getByPage(page: number, pageSize: number): Promise<PageResult<Model>> {
    try {
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
    } catch (error) {
      const exception = new DatabaseException(
        'Error getting entities by page: ' + this.entity.name,
      );
      exception.stack = error ? (error as string) : '';
      exception.status = 500;
      throw exception;
    }
  }
}
