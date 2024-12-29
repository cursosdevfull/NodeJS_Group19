import { DatabaseBootstrap } from '../../../bootstrap/database.bootstrap';
import { BaseAdapter } from '../../../core/adapter/base.adapter';
import { UserDto } from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';
import { User } from '../models/user';
import { UserPort } from '../ports/user.port';

export class UserAdapter
  extends BaseAdapter<UserEntity, User, UserDto>
  implements UserPort
{
  constructor() {
    super(UserEntity, new UserDto());
  }

  async findByEmail(email: string): Promise<User | null> {
    const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);

    const userEntityFound = await repository.findOne({
      where: { email, active: true },
      relations: ['roles'],
    });
    if (userEntityFound) {
      return new UserDto().fromDataToDomain(userEntityFound) as User;
    }

    return null;
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);

    const userEntityFound = await repository.findOne({
      where: { email, password, active: true },
    });
    if (userEntityFound) {
      return new UserDto().fromDataToDomain(userEntityFound) as User;
    }

    return null;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);

    const userEntityFound = await repository.findOne({
      where: { email, active: true },
    });

    return !!userEntityFound;
  }
}
