import { BaseDtoImpl } from '../../../core/dtos/base.dto';
import { UserEntity } from '../entities/user.entity';
import { User } from '../models/user';

export class UserDto extends BaseDtoImpl<UserEntity, User> {
  constructor() {
    super(UserEntity);
  }

  fromDomainToData(model: User | User[]): UserEntity | UserEntity[] {
    return super.fromDomainToData(model);
  }

  fromDataToDomain(data: UserEntity | UserEntity[]): User | User[] {
    return super.fromDataToDomain(data);
  }
}
