import { BaseDtoImpl } from '../../../core/dtos/base.dto';
import { RoleEntity } from '../entities/role.entity';
import { Role } from '../models/role';

export class RoleDto extends BaseDtoImpl<RoleEntity, Role> {
  constructor() {
    super(RoleEntity);
  }

  fromDomainToData(model: Role | Role[]): RoleEntity | RoleEntity[] {
    return super.fromDomainToData(model);
  }

  fromDataToDomain(data: RoleEntity | RoleEntity[]): Role | Role[] {
    return super.fromDataToDomain(data);
  }
}
