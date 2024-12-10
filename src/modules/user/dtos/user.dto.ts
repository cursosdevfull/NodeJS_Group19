import { BaseDtoImpl } from '../../../core/dtos/base.dto';
import { UserEntity } from '../entities/user.entity';
import { User } from '../models/user';

export class UserDto extends BaseDtoImpl<UserEntity, User> {
  static fromDomainToData(model: User | User[]): UserEntity | UserEntity[] {
    if (Array.isArray(model)) {
      return model.map((item) => this.fromDomainToData(item)) as UserEntity[];
    }

    const userEntity = new UserEntity();
    userEntity.id = model.userId;
    userEntity.firstname = model.firstname;
    userEntity.lastname = model.lastname;
    userEntity.email = model.email;
    userEntity.password = model.password;
    userEntity.active = model.active;

    return userEntity;
  }

  static fromDataToDomain(data: UserEntity | UserEntity[]): User | User[] {
    if (Array.isArray(data)) {
      return data.map((item) => this.fromDataToDomain(item)) as User[];
    }

    return {
      userId: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      active: data.active,
    };
  }
}
