import { DatabaseBootstrap } from '../../../bootstrap/database.bootstrap';
import { PageResult } from '../../../core/interfaces/page-result';
import { CourseDto } from '../dtos/course.dto';
import { CourseEntity } from '../entities/course.entity';
import { Course } from '../models/course';
import { CoursePort } from '../ports/course.port';

export class CourseAdapter implements CoursePort {
  async save(course: Course): Promise<Course> {
    const courseEntity = CourseDto.fromDomainToData(course);
    const repository = DatabaseBootstrap.dataSource.getRepository(CourseEntity);
    await repository.save(courseEntity);
    return course;
  }

  async delete(courseId: number): Promise<void> {
    const repository = DatabaseBootstrap.dataSource.getRepository(CourseEntity);

    const courseFound = await repository.findOne({ where: { courseId } });
    if (courseFound) {
      courseFound.active = false;
      await repository.save(courseFound);
    }
  }

  async get(courseId: number): Promise<Course | null> {
    const repository = DatabaseBootstrap.dataSource.getRepository(CourseEntity);

    const courseEntityFound = await repository.findOne({
      where: { courseId, active: true },
    });
    if (courseEntityFound) {
      return CourseDto.fromDataToDomain(courseEntityFound) as Course;
    }

    return null;
  }

  async list(): Promise<Course[]> {
    const repository = DatabaseBootstrap.dataSource.getRepository(CourseEntity);
    const coursesEntity = await repository.find({ where: { active: true } });

    if (coursesEntity.length > 0) {
      return CourseDto.fromDataToDomain(coursesEntity) as Course[];
    }

    return [];
  }

  async getByPage(page: number, pageSize: number): Promise<PageResult<Course>> {
    const repository = DatabaseBootstrap.dataSource.getRepository(CourseEntity);

    const [coursesEntity, total] = await repository.findAndCount({
      where: { active: true },
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    if (coursesEntity.length > 0) {
      return {
        data: CourseDto.fromDataToDomain(coursesEntity) as Course[],
        page,
        pageSize,
        total,
      };
    }

    return { data: [], page, pageSize, total: 0 };
  }
}
