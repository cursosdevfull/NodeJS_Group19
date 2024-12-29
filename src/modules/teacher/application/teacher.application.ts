import { BaseApplication } from '../../../core/application/base.application';
import { Teacher } from '../models/teacher';
import { TeacherPort } from '../ports/teacher.port';
import {
  TeacherResponse,
  TeacherResponseDto,
} from './dtos/teacher-response.dto';

export class TeacherApplication extends BaseApplication<
  Teacher,
  TeacherPort,
  TeacherResponse,
  TeacherResponseDto
> {
  constructor(private readonly teacherPort: TeacherPort) {
    super(teacherPort, new TeacherResponseDto());
  }
}
