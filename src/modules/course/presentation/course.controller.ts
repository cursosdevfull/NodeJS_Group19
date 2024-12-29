import { Request, Response } from 'express';

import { CourseApplication } from '../application/course.application';

export class CourseController {
  constructor(private readonly application: CourseApplication) {}

  async create(request: Request, response: Response) {
    const { title, description } = request.body;
    await this.application.save({ title, description, active: true });
    response.status(204).send();
  }

  async update(request: Request, response: Response) {
    const { courseId } = request.params;
    const { title, description, active } = request.body;
    await this.application.save({
      id: +courseId,
      title,
      description,
      active,
    });
    response.status(204).send();
  }

  async delete(request: Request, response: Response) {
    const { courseId } = request.params;
    await this.application.delete(+courseId);
    response.status(204).send();
  }

  async getById(request: Request, response: Response) {
    const { courseId } = request.params;
    const course = await this.application.get(+courseId);
    if (!course) {
      response.status(404).send();
      return;
    }
    response.json(course);
  }

  async list(request: Request, response: Response) {
    const courses = await this.application.list();
    response.json(courses);
  }

  async getByPage(request: Request, response: Response) {
    const { page = 1, pageSize = 10 } = request.query;
    const result = await this.application.getByPage(+page, +pageSize);
    response.json(result);
  }
}
