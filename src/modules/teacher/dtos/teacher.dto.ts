import { BaseDtoImpl } from '../../../core/dtos/base.dto';
import { TeacherEntity } from '../entities/teacher.entity';
import { Teacher } from '../models/teacher';

export class TeacherDto extends BaseDtoImpl<TeacherEntity, Teacher> {
  constructor() {
    super(TeacherEntity);
  }

  fromDomainToData(
    model: Teacher | Teacher[],
  ): TeacherEntity | TeacherEntity[] {
    return super.fromDomainToData(model);
  }

  fromDataToDomain(data: TeacherEntity | TeacherEntity[]): Teacher | Teacher[] {
    return super.fromDataToDomain(data);
  }
}
