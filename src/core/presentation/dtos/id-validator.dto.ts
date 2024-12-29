import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class IdValidator {
  @Type(() => Number)
  @IsNotEmpty({ message: 'Id is required' })
  @IsNumber({}, { message: 'Id must be a number' })
  @Min(1, { message: 'Id must be greater than 0' })
  id!: number;
}
