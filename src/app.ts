import express from 'express';

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.mountMiddlewares();
    this.mountRoutes();
  }

  private mountMiddlewares() {}

  private mountRoutes() {
    this.app.get('/', (req, res) => {
      res.send('¡Bienvenidos a Cursos Dev!');
    });
  }

  getApp() {
    return this.app;
  }
}

const app = new App().getApp();
export { app };
