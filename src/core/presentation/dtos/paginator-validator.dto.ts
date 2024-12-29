import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class PaginatorValidator {
  @IsNotEmpty({ message: 'Page is required' })
  @IsNumber({}, { message: 'Page must be a number' })
  @Min(1, { message: 'Page must be greater than 0' })
  @Type(() => Number)
  page!: number;

  @IsNotEmpty({ message: 'Page size is required' })
  @IsNumber({}, { message: 'Page size must be a number' })
  @Min(1, { message: 'Page size must be greater than 0' })
  @Type(() => Number)
  pageSize!: string;
}
