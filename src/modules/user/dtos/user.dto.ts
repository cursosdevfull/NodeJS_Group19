import { UserEntity } from '../entities/user.entity';
import { User } from '../models/user';

export class UserDto {
  static fromDomainToData(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity.userId = user.userId;
    userEntity.firstname = user.firstname;
    userEntity.lastname = user.lastname;
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.active = user.active;

    return userEntity;
  }

  static fromDataToDomain(data: UserEntity | UserEntity[]): User | User[] {
    if (Array.isArray(data)) {
      return data.map((item) => this.fromDataToDomain(item)) as UserEntity[];
    }

    return {
      userId: data.userId,
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      active: data.active,
    };
  }
}
