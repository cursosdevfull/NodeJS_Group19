import express from 'express';

import { courseRouter } from './modules/course/presentation/course.routes';

class App {
  private readonly app: express.Application;

  constructor() {
    this.app = express();
    this.mountMiddlewares();
    this.mountRoutes();
  }

  private mountMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private mountRoutes() {
    this.app.get('/', (req, res) => {
      res.send('¡Bienvenidos a Cursos Dev!');
    });
    this.app.use('/course', courseRouter);
  }

  getApp() {
    return this.app;
  }
}

const app = new App().getApp();
export { app };
