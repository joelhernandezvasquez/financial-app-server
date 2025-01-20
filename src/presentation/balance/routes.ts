import { Router } from 'express';
import { BalanceController} from './controller';

export class BalanceRoutes {

  static get routes(): Router {

    const router = Router();
    // const categoryService = new CategoryService();
    const controller = new BalanceController();
  
     router.get('/',controller.getBalance);

    return router;
  }
}

