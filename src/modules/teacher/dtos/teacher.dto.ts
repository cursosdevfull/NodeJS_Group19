import { BaseDtoImpl } from '../../../core/dtos/base.dto';
import { TeacherEntity } from '../entities/teacher.entity';
import { Teacher } from '../models/teacher';

export class TeacherDto extends BaseDtoImpl<TeacherEntity, Teacher> {
  static fromDomainToData(
    model: Teacher | Teacher[],
  ): TeacherEntity | TeacherEntity[] {
    if (Array.isArray(model)) {
      return model.map((item) =>
        this.fromDomainToData(item),
      ) as TeacherEntity[];
    }

    const teacherEntity = new TeacherEntity();
    teacherEntity.id = model.teacherId;
    teacherEntity.firstname = model.firstname;
    teacherEntity.lastname = model.lastname;
    teacherEntity.age = model.age;
    teacherEntity.gender = model.gender;
    teacherEntity.email = model.email;
    teacherEntity.urlProfile = model.urlProfile;
    teacherEntity.active = model.active;

    return teacherEntity;
  }

  static fromDataToDomain(
    data: TeacherEntity | TeacherEntity[],
  ): Teacher | Teacher[] {
    if (Array.isArray(data)) {
      return data.map((item) => this.fromDataToDomain(item)) as Teacher[];
    }

    return {
      teacherId: data.id,
      firstname: data.firstname,
      lastname: data.lastname,
      age: data.age,
      gender: data.gender,
      email: data.email,
      urlProfile: data.urlProfile,
      active: data.active,
    };
  }
}
