import { BaseApplication } from '../../../core/application/base.application';
import { Course } from '../models/course';
import { CoursePort } from '../ports/course.port';

export class CourseApplication extends BaseApplication<Course, CoursePort> {
  constructor(private readonly coursePort: CoursePort) {
    super(coursePort);
  }
}
