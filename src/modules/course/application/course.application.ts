import { BaseApplication } from '../../../core/application/base.application';
import { Course } from '../models/course';
import { CoursePort } from '../ports/course.port';
import { CourseResponse, CourseResponseDto } from './dtos/course-response.dto';

export class CourseApplication extends BaseApplication<
  Course,
  CoursePort,
  CourseResponse,
  CourseResponseDto
> {
  constructor(private readonly coursePort: CoursePort) {
    super(coursePort, new CourseResponseDto());
  }
}
