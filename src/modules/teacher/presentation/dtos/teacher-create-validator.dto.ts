import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsUrl,
  Min,
  MinLength,
} from 'class-validator';

export class TeacherCreateValidator {
  @IsNotEmpty({ message: 'First name is required' })
  @MinLength(3, { message: 'First name must have at least 3 characters' })
  firstname!: string;

  @IsNotEmpty({ message: 'Last name is required' })
  @MinLength(3, { message: 'Last name must have at least 3 characters' })
  lastname!: string;

  @IsNotEmpty({ message: 'Age is required' })
  @Min(18, { message: 'Age must be at least 18 years old' })
  @IsNumber({}, { message: 'Age must be a number' })
  @Type(() => Number)
  age!: number;

  @IsNotEmpty({ message: 'Gender is required' })
  @MinLength(4, { message: 'Gender must have at least 4 characters' })
  gender!: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email' })
  email!: string;

  @IsNotEmpty({ message: 'urlProfile is required' })
  @MinLength(3, { message: 'urlProfile must have at least 3 characters' })
  @IsUrl({}, { message: 'Invalid urlProfile' })
  urlProfile!: string;
}
