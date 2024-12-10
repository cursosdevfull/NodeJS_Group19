export interface BaseDto<Entity, Model> {
  fromDomainToData(model: Model | Model[]): Entity | Entity[];
  fromDataToDomain(data: Entity | Entity[]): Model | Model[];
}
