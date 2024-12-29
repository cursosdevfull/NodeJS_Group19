import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';

import { RoleValidator } from './role-validator.dto';

export class UserUpdateValidator {
  @IsOptional()
  @MinLength(3, { message: 'First name must have at least 3 characters' })
  firstname!: string;

  @IsOptional()
  @MinLength(3, { message: 'Last name must have at least 3 characters' })
  lastname!: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email' })
  email!: string;

  @IsOptional()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i, {
    message:
      'Password must have at least 8 characters, one uppercase letter, one lowercase letter and one number',
  })
  password!: string;

  @IsOptional()
  @IsBoolean({ message: 'Invalid active' })
  active!: boolean;

  @IsOptional()
  @IsArray({ each: true })
  @MinLength(1, { each: true })
  @Type(() => RoleValidator)
  roles!: RoleValidator[];
}
