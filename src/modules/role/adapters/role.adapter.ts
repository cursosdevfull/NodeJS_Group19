import { BaseAdapter } from '../../../core/adapter/base.adapter';
import { RoleDto } from '../dtos/role.dto';
import { RoleEntity } from '../entities/role.entity';
import { Role } from '../models/role';
import { RolePort } from '../ports/role.port';

export class RoleAdapter
  extends BaseAdapter<RoleEntity, Role, RoleDto>
  implements RolePort
{
  constructor() {
    super(RoleEntity, new RoleDto());
  }
}
