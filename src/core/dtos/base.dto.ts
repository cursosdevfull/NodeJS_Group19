import { BaseDto } from '../interfaces/base-dto.interface';

export abstract class BaseDtoImpl<Entity, Model>
  implements BaseDto<Entity, Model>
{
  fromDomainToData(model: Model | Model[]): Entity | Entity[] {
    throw new Error('Method not implemented.');
  }
  fromDataToDomain(data: Entity | Entity[]): Model | Model[] {
    throw new Error('Method not implemented.');
  }
  /*   static fromDomainToData(model: any): any {
    throw new Error('Method not implemented.');
  }

  static fromDataToDomain(data: any | any[]): any | any[] {
    if (Array.isArray(data)) {
      return data.map((item) => this.fromDataToDomain(item));
    }

    return this.fromDataToDomainSingle(data);
  }

  protected static fromDataToDomainSingle(data: any): any {
    throw new Error('Method not implemented.');
  } */
}
