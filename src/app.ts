import express from 'express';

import productRoutes from './modules/product/product.route';

class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.mountMiddlewares();
    this.mountRoutes();
  }

  private mountMiddlewares() {
    this.app.use('/product', productRoutes);
  }

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
