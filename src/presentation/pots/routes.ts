import { Router } from 'express';
import { PotsController } from './controller';
// import { AuthMiddleware } from '../middlewares/auth.middleware';
// import { CategoryService } from '../services/category.service';

export class PotRoutes {

  static get routes(): Router {

    const router = Router();
    // const categoryService = new CategoryService();
    const controller = new PotsController();
  
     router.get('/',controller.getPots);
     router.post('/',controller.createPot);
     router.put('/:id',controller.updatePot);
     router.delete('/:id',controller.deletePot);
     router.post('/add-money',controller.addMoney);
     router.post('/withdraw-money',controller.withdrawMoney);

    return router;
  }
}

