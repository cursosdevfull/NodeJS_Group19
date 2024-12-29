import { BaseDtoImpl } from '../../../core/dtos/base.dto';
import { CourseEntity } from '../entities/course.entity';
import { Course } from '../models/course';

export class CourseDto extends BaseDtoImpl<CourseEntity, Course> {
  constructor() {
    super(CourseEntity);
  }

  fromDomainToData(model: Course | Course[]): CourseEntity | CourseEntity[] {
    return super.fromDomainToData(model);
  }

  fromDataToDomain(data: CourseEntity | CourseEntity[]): Course | Course[] {
    return super.fromDataToDomain(data);
  }
}
