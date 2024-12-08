import { DatabaseBootstrap } from '../../../bootstrap/database.bootstrap';
import { PageResult } from '../../../core/interfaces/page-result';
import { UserDto } from '../dtos/user.dto';
import { UserEntity } from '../entities/user.entity';
import { User } from '../models/user';
import { UserPort } from '../ports/user.port';

export class UserAdapter implements UserPort {
  async save(user: User): Promise<User> {
    const userEntity = UserDto.fromDomainToData(user);
    const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);
    await repository.save(userEntity);
    return user;
  }

  async delete(userId: number): Promise<void> {
    const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);

    const userFound = await repository.findOne({ where: { userId } });
    if (userFound) {
      userFound.active = false;
      await repository.save(userFound);
    }
  }

  async get(userId: number): Promise<User | null> {
    const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);

    const userEntityFound = await repository.findOne({
      where: { userId, active: true },
    });
    if (userEntityFound) {
      return UserDto.fromDataToDomain(userEntityFound) as User;
    }

    return null;
  }

  async list(): Promise<User[]> {
    const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);
    const usersEntity = await repository.find({ where: { active: true } });

    if (usersEntity.length > 0) {
      //return usersEntity.map(UserDto.fromDataToDomain);
      return UserDto.fromDataToDomain(usersEntity) as User[];
    }

    return [];
  }

  async findByEmail(email: string): Promise<User | null> {
    const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);

    const userEntityFound = await repository.findOne({
      where: { email, active: true },
    });
    if (userEntityFound) {
      return UserDto.fromDataToDomain(userEntityFound) as User;
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
      return UserDto.fromDataToDomain(userEntityFound) as User;
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

  async getByPage(page: number, pageSize: number): Promise<PageResult<User>> {
    const repository = DatabaseBootstrap.dataSource.getRepository(UserEntity);

    const [usersEntity, total] = await repository.findAndCount({
      where: { active: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    if (usersEntity.length > 0) {
      return {
        data: UserDto.fromDataToDomain(usersEntity) as User[],
        page,
        pageSize,
        total,
      };
    }

    return { data: [], page, pageSize, total: 0 };
  }
}
