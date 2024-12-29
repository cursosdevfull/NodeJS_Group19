import { Expose, plainToInstance } from 'class-transformer';

import { IResponseDto } from '../../../course/application/dtos/course-response.dto';
import { User } from '../../models/user';

export class UserResponse {
  @Expose()
  id!: number;

  @Expose({ groups: ['admin', 'operator'] })
  //@Exclude({ toPlainOnly: false })
  firstname!: string;

  @Expose({ groups: ['admin', 'operator'] })
  lastname!: string;

  @Expose({ groups: ['admin'] })
  email!: string;
}

export class UserResponseDto implements IResponseDto<User, UserResponse> {
  fromDomainToResponse(model: User | User[]): UserResponse | UserResponse[] {
    if (Array.isArray(model)) {
      return model.map((user) =>
        this.fromDomainToResponse(user),
      ) as UserResponse[];
    }

    return plainToInstance(UserResponse, model, {
      excludeExtraneousValues: true,
      groups: ['admin'],
    });
  }
}
