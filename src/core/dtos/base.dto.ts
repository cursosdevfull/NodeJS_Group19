import { instanceToPlain, plainToInstance } from 'class-transformer';

import { BaseDto } from '../interfaces/base-dto.interface';

export abstract class BaseDtoImpl<Entity, Model>
  implements BaseDto<Entity, Model>
{
  fromDomainToData(model: Model | Model[]): Entity | Entity[] {
    if (Array.isArray(model)) {
      return model.map((item) => this.fromDomainToData(item)) as Entity[];
    }

    return plainToInstance(this.entityClass, model);
  }

  fromDataToDomain(data: Entity | Entity[]): Model | Model[] {
    if (Array.isArray(data)) {
      return data.map((item) => this.fromDataToDomain(item)) as Model[];
    }
    return instanceToPlain(data) as Model;
  }

  constructor(private readonly entityClass: new () => Entity) {}
}
