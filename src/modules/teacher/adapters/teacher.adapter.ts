import { BaseAdapter } from '../../../core/adapter/base.adapter';
import { TeacherDto } from '../dtos/teacher.dto';
import { TeacherEntity } from '../entities/teacher.entity';
import { Teacher } from '../models/teacher';
import { TeacherPort } from '../ports/teacher.port';

export class TeacherAdapter
  extends BaseAdapter<TeacherEntity, Teacher, typeof TeacherDto>
  implements TeacherPort
{
  constructor() {
    super(TeacherEntity, TeacherDto);
  }
}
