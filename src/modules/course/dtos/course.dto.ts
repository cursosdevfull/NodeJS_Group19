import { BaseDtoImpl } from '../../../core/dtos/base.dto';
import { CourseEntity } from '../entities/course.entity';
import { Course } from '../models/course';

export class CourseDto extends BaseDtoImpl<CourseEntity, Course> {
  static fromDomainToData(
    model: Course | Course[],
  ): CourseEntity | CourseEntity[] {
    if (Array.isArray(model)) {
      return model.map((item) => this.fromDomainToData(item)) as CourseEntity[];
    }

    const courseEntity = new CourseEntity();
    if (model.courseId) courseEntity.id = model.courseId;
    courseEntity.title = model.title;
    courseEntity.active = model.active;
    courseEntity.description = model.description;

    return courseEntity;
  }

  static fromDataToDomain(
    data: CourseEntity | CourseEntity[],
  ): Course | Course[] {
    if (Array.isArray(data)) {
      return data.map((item) => this.fromDataToDomain(item)) as CourseEntity[];
    }

    return {
      courseId: data.id,
      title: data.title,
      active: data.active,
      description: data.description,
    };
  }
}
