import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
} from 'class-validator';

import { RoleValidator } from './role-validator.dto';

export class UserCreateValidator {
  @IsNotEmpty({ message: 'First name is required' })
  @MinLength(3, { message: 'First name must have at least 3 characters' })
  firstname!: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @MinLength(3, { message: 'Last name must have at least 3 characters' })
  lastname!: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email!: string;

  @IsNotEmpty({ message: 'Password is required' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i, {
    message:
      'Password must have at least 8 characters, one uppercase letter, one lowercase letter and one number',
  })
  password!: string;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one role is required' })
  @Type(() => RoleValidator)
  roles!: RoleValidator[];
}
