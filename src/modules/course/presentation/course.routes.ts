import { Router } from 'express';

import { CourseAdapter } from '../adapters/course.adapter';
import { CourseApplication } from '../application/course.application';
import { CoursePort } from '../ports/course.port';
import { CourseController } from './course.controller';

export class CourseRoutes {
  readonly router = Router();

  constructor(private readonly controller: CourseController) {
    this.mountRoutes();
  }

  mountRoutes() {
    // POST /course
    this.router.post('/', this.controller.create.bind(this.controller));

    // PUT /course/:courseId
    this.router.put('/:courseId', this.controller.update.bind(this.controller));

    // DELETE /course/:courseId
    this.router.delete(
      '/:courseId',
      this.controller.delete.bind(this.controller),
    );

    // GET /course/page?page=1&pageSize=10
    this.router.get('/page', this.controller.getByPage.bind(this.controller));

    // GET /course/:courseId
    this.router.get(
      '/:courseId',
      this.controller.getById.bind(this.controller),
    );

    // GET /course
    this.router.get('/', this.controller.list.bind(this.controller));
  }
}

const port: CoursePort = new CourseAdapter();
const application = new CourseApplication(port);
const controller = new CourseController(application);
export const courseRouter = new CourseRoutes(controller).router;
