import { Router } from 'express';
import { BudgetController} from './controller';
// import { AuthMiddleware } from '../middlewares/auth.middleware';
// import { CategoryService } from '../services/category.service';

export class BudgetRoutes {

  static get routes(): Router {

    const router = Router();
    // const categoryService = new CategoryService();
    const controller = new BudgetController();
  
     router.get('/',controller.getBudgets);
     router.post('/',controller.createBudget);
     router.put('/:id',controller.updateBudget);
     router.delete('/:id',controller.deleteBudget);

    return router;
  }


}

