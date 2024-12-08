import { CourseEntity } from '../entities/course.entity';
import { Course } from '../models/course';

export class CourseDto {
  static fromDomainToData(course: Course): CourseEntity {
    const courseEntity = new CourseEntity();
    courseEntity.courseId = course.courseId;
    courseEntity.title = course.title;
    courseEntity.active = course.active;
    courseEntity.description = course.description;

    return courseEntity;
  }

  static fromDataToDomain(
    data: CourseEntity | CourseEntity[],
  ): Course | Course[] {
    if (Array.isArray(data)) {
      return data.map((item) => this.fromDataToDomain(item)) as CourseEntity[];
    }

    return {
      courseId: data.courseId,
      title: data.title,
      active: data.active,
      description: data.description,
    };
  }
}
