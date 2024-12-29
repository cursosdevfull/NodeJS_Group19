import { Request, Response } from 'express';

import { ValidatorBody } from '../../../core/utils/decorator.service';
import { TeacherApplication } from '../application/teacher.application';
import { TeacherCreateValidator } from './dtos/teacher-create-validator.dto';

export class TeacherController {
  constructor(private readonly application: TeacherApplication) {}

  @ValidatorBody(TeacherCreateValidator)
  async create(request: Request, response: Response) {
    try {
      const { firstname, lastname, age, gender, email, urlProfile } =
        request.body;
      await this.application.save({
        firstname,
        lastname,
        age: +age,
        gender,
        email,
        urlProfile,
        active: true,
      });
      response.status(204).send();
    } catch (error) {
      console.log('ERROR', error);
      response.status(500).json({ message: 'Internal server error' });
    }
  }

  async update(request: Request, response: Response) {
    const { teacherId } = request.params;
    const { firstname, lastname, age, gender, email, urlProfile, active } =
      request.body;
    await this.application.save({
      id: +teacherId,
      firstname,
      lastname,
      age,
      gender,
      email,
      urlProfile,
      active,
    });
    response.status(204).send();
  }

  async delete(request: Request, response: Response) {
    const { teacherId } = request.params;
    await this.application.delete(+teacherId);
    response.status(204).send();
  }

  async getById(request: Request, response: Response) {
    const { teacherId } = request.params;
    const teacher = await this.application.get(+teacherId);
    if (!teacher) {
      response.status(404).send();
      return;
    }
    response.json(teacher);
  }

  async list(request: Request, response: Response) {
    const teachers = await this.application.list();
    response.json(teachers);
  }

  async getByPage(request: Request, response: Response) {
    const { page = 1, pageSize = 10 } = request.query;
    const result = await this.application.getByPage(+page, +pageSize);
    response.json(result);
  }
}
