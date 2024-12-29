import { Expose, plainToInstance } from 'class-transformer';

import { Role } from '../../models/role';

export class RoleResponse {
  @Expose()
  id!: number;

  @Expose()
  name!: string;
}

export interface IResponseDto<Model, Response> {
  fromDomainToResponse(model: Model | Model[]): Response | Response[];
}

export class RoleResponseDto implements IResponseDto<Role, RoleResponse> {
  fromDomainToResponse(model: Role | Role[]): RoleResponse | RoleResponse[] {
    if (Array.isArray(model)) {
      return model.map((role) =>
        this.fromDomainToResponse(role),
      ) as RoleResponse[];
    }

    return plainToInstance(RoleResponse, model, {
      excludeExtraneousValues: true,
    });
  }
}
