import { BaseApplication } from '../../../core/application/base.application';
import { Teacher } from '../models/teacher';
import { TeacherPort } from '../ports/teacher.port';

export class TeacherApplication extends BaseApplication<Teacher, TeacherPort> {
  constructor(private readonly teacherPort: TeacherPort) {
    super(teacherPort);
  }
}
