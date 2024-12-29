import { BaseAdapter } from '../../../core/adapter/base.adapter';
import { CourseDto } from '../dtos/course.dto';
import { CourseEntity } from '../entities/course.entity';
import { Course } from '../models/course';
import { CoursePort } from '../ports/course.port';

export class CourseAdapter
  extends BaseAdapter<CourseEntity, Course, CourseDto>
  implements CoursePort
{
  constructor() {
    super(CourseEntity, new CourseDto());
  }
}
