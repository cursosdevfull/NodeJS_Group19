import { Expose, plainToInstance } from 'class-transformer';

import { Course } from '../../models/course';

export class CourseResponse {
  @Expose()
  id!: number;

  @Expose()
  title!: string;

  @Expose()
  description!: string;
}

export interface IResponseDto<Model, Response> {
  fromDomainToResponse(model: Model | Model[]): Response | Response[];
}

export class CourseResponseDto implements IResponseDto<Course, CourseResponse> {
  fromDomainToResponse(
    model: Course | Course[],
  ): CourseResponse | CourseResponse[] {
    if (Array.isArray(model)) {
      return model.map((course) =>
        this.fromDomainToResponse(course),
      ) as CourseResponse[];
    }

    return plainToInstance(CourseResponse, model, {
      excludeExtraneousValues: true,
    });
  }
}
