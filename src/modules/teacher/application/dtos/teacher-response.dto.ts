import { Expose, plainToInstance } from 'class-transformer';

import { IResponseDto } from '../../../course/application/dtos/course-response.dto';
import { Teacher } from '../../models/teacher';

export class TeacherResponse {
  @Expose()
  id!: number;

  @Expose()
  firstname!: string;

  @Expose()
  lastname!: string;

  @Expose()
  age!: number;

  @Expose()
  gender!: string;

  @Expose()
  email!: string;

  @Expose()
  urlProfile!: string;
}

export class TeacherResponseDto
  implements IResponseDto<Teacher, TeacherResponse>
{
  fromDomainToResponse(
    model: Teacher | Teacher[],
  ): TeacherResponse | TeacherResponse[] {
    if (Array.isArray(model)) {
      return model.map((teacher) =>
        this.fromDomainToResponse(teacher),
      ) as TeacherResponse[];
    }

    return plainToInstance(TeacherResponse, model, {
      excludeExtraneousValues: true,
    });
  }
}
