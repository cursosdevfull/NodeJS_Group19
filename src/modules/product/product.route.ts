import { Router } from 'express';

class ProductRoute {
  private router: Router;

  constructor() {
    this.router = Router();
    this.mountRoutes();
  }

  private mountRoutes() {
    this.router.get('/', (req, res) => {
      res.send('routes products');
    });
  }

  getRouter() {
    return this.router;
  }
}

const productRoutes = new ProductRoute().getRouter();
export default productRoutes;
