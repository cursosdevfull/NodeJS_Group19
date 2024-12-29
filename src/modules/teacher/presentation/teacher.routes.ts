import { Router } from 'express';

import { TeacherAdapter } from '../adapters/teacher.adapter';
import { TeacherApplication } from '../application/teacher.application';
import { TeacherPort } from '../ports/teacher.port';
import { TeacherController } from './teacher.controller';

export class TeacherRoutes {
  readonly router = Router();

  constructor(private readonly controller: TeacherController) {
    this.mountRoutes();
  }

  mountRoutes() {
    // POST /teacher
    this.router.post('/', this.controller.create.bind(this.controller));

    // PUT /teacher/:teacherId
    this.router.put(
      '/:teacherId',
      this.controller.update.bind(this.controller),
    );

    // DELETE /teacher/:teacherId
    this.router.delete(
      '/:teacherId',
      this.controller.delete.bind(this.controller),
    );

    // GET /teacher/page?page=1&pageSize=10
    this.router.get('/page', this.controller.getByPage.bind(this.controller));

    // GET /teacher/:teacherId
    this.router.get(
      '/:teacherId',
      this.controller.getById.bind(this.controller),
    );

    // GET /teacher
    this.router.get('/', this.controller.list.bind(this.controller));
  }
}

const port: TeacherPort = new TeacherAdapter();
const application = new TeacherApplication(port);
const controller = new TeacherController(application);
export const teacherRouter = new TeacherRoutes(controller).router;
