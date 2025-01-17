import { Router } from 'express';
import { TransactionController} from './controller';
// import { AuthMiddleware } from '../middlewares/auth.middleware';
// import { CategoryService } from '../services/category.service';

export class TransactionsRoutes {

  static get routes(): Router {

    const router = Router();
    // const categoryService = new CategoryService();
    const controller = new TransactionController();
  
     router.get('/',controller.getTransactions);
     router.get('/:id',controller.getTransaction);

    return router;
  }


}

