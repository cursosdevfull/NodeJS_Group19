import { BaseApplication } from '../../../core/application/base.application';
import { User } from '../models/user';
import { UserPort } from '../ports/user.port';
import { UserResponse, UserResponseDto } from './dtos/user-response.dto';

export class UserApplication extends BaseApplication<
  User,
  UserPort,
  UserResponse,
  UserResponseDto
> {
  constructor(private readonly userPort: UserPort) {
    super(userPort, new UserResponseDto());
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userPort.findByEmail(email);
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    return this.userPort.findByEmailAndPassword(email, password);
  }

  async existsByEmail(email: string): Promise<boolean> {
    return this.userPort.existsByEmail(email);
  }
}
