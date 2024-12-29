import { BaseApplication } from '../../../core/application/base.application';
import { Role } from '../models/role';
import { RolePort } from '../ports/role.port';
import { RoleResponse, RoleResponseDto } from './dtos/role-response.dto';

export class RoleApplication extends BaseApplication<
  Role,
  RolePort,
  RoleResponse,
  RoleResponseDto
> {
  constructor(private readonly rolePort: RolePort) {
    super(rolePort, new RoleResponseDto());
  }
}
