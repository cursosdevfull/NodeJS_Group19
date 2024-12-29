import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthLoginValidator {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  password!: string;
}
