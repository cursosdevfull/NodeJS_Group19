import { PageResult } from '../../../core/interfaces/page-result';
import { Course } from '../models/course';

export type CoursePort = {
  save(course: Course): Promise<Course>;
  delete(courseId: number): Promise<void>;
  get(courseId: number): Promise<Course | null>;
  list(): Promise<Course[]>;
  getByPage(page: number, pageSize: number): Promise<PageResult<Course>>;
};
